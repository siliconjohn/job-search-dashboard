import { useState, useMemo, useRef } from 'react';
import { type TableProps, Table, Input, Tag, Card, Button, Typography } from 'antd'; 
import { useEntriesStore } from '../../stores/entriesStore';
import { type Entry, type EntryKind, getEntryKindColor } from '../../types/entryTypes';
import { formatDateShort } from '../../utils/dates';
import { getLogHtml } from '../../utils/logDownloadHtml';
import { parseCsvToEntries } from '../../utils/parseCsvEntries';
import { tableSortActions } from '../../contexts/tableSort/TableSortTypes';
import { useTableSortContext } from '../../contexts/tableSort/useTableSort';

const columns: TableProps<Entry>['columns'] = [
    {
        title: 'Created',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 70,
        render: (createdAt) => 
            formatDateShort.format( new Date( createdAt )),
        sorter: (a, b) => { 
            const timeA = new Date(a.createdAt).getTime();
            const timeB = new Date(b.createdAt).getTime();
            return (isNaN(timeA) ? 0 : timeA) - (isNaN(timeB) ? 0 : timeB);
        },
        defaultSortOrder: 'descend',    
        sortDirections: ['ascend', 'descend'],
    },
    {
        title: 'Kind',
        dataIndex: 'kind',
        key: 'kind',
        width: 50,
        render: (kind: EntryKind) => (
            <Tag color={getEntryKindColor(kind)} variant="solid">
                {kind}
            </Tag>
        ),
        sorter: (a, b) => a.kind.localeCompare(b.kind)
    },
    {
        title: 'Company',
        dataIndex: 'company',
        key: 'company', 
        sorter: (a, b) => a.kind.localeCompare(b.company) 
    },
    {
        title: 'Position',
        dataIndex: 'position',
        key: 'position',  
    },
    {
        title: 'Note',
        dataIndex: 'note',
        key: 'note',
        render: (note: string) => (
            <Typography.Text>
                {note != null && note.length > 60 ? `${note.slice(0, 60)}…` : (note ?? '')}
            </Typography.Text>
        ),
    },
    {
        title: 'URL',
        dataIndex: 'url',
        key: 'url',
        render: (url) => 
            <a 
                style={{ 
                    maxWidth: 180,
                    display: 'inline-block',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap' 
                }} 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
            >
                {url}
            </a> 
    }
];

const ActivityList: React.FC = () => {
    const entries = useEntriesStore( ( state ) => state.entries );
    const updateNote = useEntriesStore( ( state ) => state.updateNote );
    const setEntries = useEntriesStore( ( state ) => state.setEntries );
    const [searchText, setSearchText] = useState('');
    const [draftNotes, setDraftNotes] = useState<Record<string, string>>({});
    const textareaRefs = useRef<Record<string, HTMLTextAreaElement | null>>({});
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { dispatch } = useTableSortContext();

    const formatDateMmDdYy = () => {
        const d = new Date();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        const yy = String(d.getFullYear()).slice(-2);
        return `${mm}/${dd}/${yy}`;
    };

    const insertDateAtCursor = (entry: Entry) => {
        const textarea = textareaRefs.current[entry.key];
        if (!textarea) return;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = draftNotes[entry.key] ?? entry.note ?? '';
        const dateStr = ' ' + formatDateMmDdYy();
        const newValue = value.slice(0, start) + dateStr + value.slice(end);
        setDraftNotes((prev) => ({ ...prev, [entry.key]: newValue }));
        const newCursor = start + dateStr.length;
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(newCursor, newCursor);
        }, 0);
    };

    const saveNewNote = (entry: Entry, newNote: string) => {
        updateNote(entry.key, newNote);
        setDraftNotes((prev) => {
            const next = { ...prev };
            delete next[entry.key];
            return next;
        });
    };
 
    const handleChange: NonNullable<TableProps<Entry>['onChange']> = (
        _pagination,
        _filters,
        sorter
    ) => {
        const single = Array.isArray(sorter) ? sorter[0] : sorter;
        const field = single?.field;
        const columnKey = single?.columnKey;
        const payload = {
            order: single?.order === 'ascend' || single?.order === 'descend' ? single.order : undefined,
            field: field != null ? (Array.isArray(field) ? String(field[0]) : String(field)) : undefined,
            columnKey: columnKey != null ? String(columnKey) : undefined,
        };

        dispatch( { 
            type: tableSortActions.SORT, 
            payload  
        } );
    };
     
    const filteredEntries = useMemo(() => {
        if (!searchText) return entries;

        const lowerSearch = searchText.toLowerCase();

        return entries.filter(entry => {
            return (
                (entry.company?.toLowerCase().includes(lowerSearch) ?? false) ||
                (entry.position?.toLowerCase().includes(lowerSearch) ?? false) ||
                (entry.url?.toLowerCase().includes(lowerSearch) ?? false) ||
                (entry.note?.toLowerCase().includes(lowerSearch) ?? false)
            );
        });
    }, [ entries, searchText ]);

    const entriesToMarkdown = (list: Entry[]): string => {
        const escape = (s: string) => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
        const header = '| Created | Kind | Company | Position | Note | URL |';
        const separator = '| --- | --- | --- | --- | --- | --- |';
        const rows = list.map((e) => {
            const created = formatDateShort.format(new Date(e.createdAt));
            return `| ${escape(created)} | ${escape(e.kind)} | ${escape(e.company)} | ${escape(e.position)} | ${escape(e.note)} | ${escape(e.url)} |`;
        });
        return `# Job Search Log\n\n${header}\n${separator}\n${rows.join('\n')}`;
    };

    const handleDownload = () => {
        const markdown = entriesToMarkdown(entries);
        const html = getLogHtml(markdown);
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const entriesToCsv = (list: Entry[]): string => {
        const escape = (s: string) => {
            const str = String(s ?? '');
            if (/[",\n\r]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
            return str;
        };
        const header = 'Created,Kind,Company,Position,Note,URL';
        const rows = list.map((e) => {
            const created = formatDateShort.format(new Date(e.createdAt));
            return [created, e.kind, e.company, e.position, e.note, e.url].map(escape).join(',');
        });
        return [header, ...rows].join('\n');
    };

    const handleDownloadCsv = () => {
        const csv = entriesToCsv(entries);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'job-search-log.csv';
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleImportCsv = () => {
        fileInputRef.current?.click();
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            const text = typeof reader.result === 'string' ? reader.result : '';
            const parsed = parseCsvToEntries(text);
            if (parsed.length > 0 || text.trim() === '') {
                setEntries(parsed);
            }
        };
        reader.readAsText(file, 'UTF-8');
        e.target.value = '';
    };

    // For this line: ['expandable']
    // This is an indexed access type: you take a type and “look up” one of its 
    // properties. So TableProps<Entry>['expandable'] is “the type of the 
    // expandable prop onTableProps<Entry>
    const expandable: TableProps<Entry>['expandable'] = {
        expandedRowRender: (entry) => (
            <div style={{ padding: '8px 0 8px 24px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', gap: 24, alignItems: 'flex-start', marginTop: 8 }}>
                    <div style={{ flex: '0 1 240px', minWidth: 0 }}>
                        <strong style={{ display: 'block', marginBottom: 4 }}>Summary</strong>
                        <ul style={{ margin: 0, paddingLeft: 20 }}>
                            <li><Tag color={getEntryKindColor(entry.kind)} variant="solid">{entry.kind}</Tag></li>
                            <li><strong>Company:</strong> <Typography.Text title={entry.company || undefined}>{((entry.company || '—').length > 35) ? `${(entry.company || '—').slice(0, 35)}…` : (entry.company || '—')}</Typography.Text></li>
                            <li><strong>Position:</strong> <Typography.Text title={entry.position || undefined}>{((entry.position || '—').length > 35) ? `${(entry.position || '—').slice(0, 35)}…` : (entry.position || '—')}</Typography.Text></li>
                            <li><strong>Created:</strong> <Typography.Text>{formatDateShort.format(new Date(entry.createdAt))}</Typography.Text></li>
                            {entry.url ? <li><strong>URL:</strong> <Typography.Text title={entry.url}><a href={entry.url} target="_blank" rel="noopener noreferrer">{(entry.url.length > 35) ? `${entry.url.slice(0, 35)}…` : entry.url}</a></Typography.Text></li> : null}
                            {entry.note ? <li><strong>Note:</strong> <Typography.Text title={entry.note}>{(entry.note.length > 35) ? `${entry.note.slice(0, 35)}…` : entry.note}</Typography.Text></li> : null}
                        </ul>
                    </div>
                    <div style={{ flex: '1 1 300px', minWidth: 0, maxWidth: 800 }}>
                        <div
                            ref={(el) => {
                                textareaRefs.current[entry.key] = el?.querySelector('textarea') ?? null;
                            }}
                        >
                            <Input.TextArea
                                placeholder="Edit or add note..."
                                value={draftNotes[entry.key] ?? entry.note ?? ''}
                                onChange={(e) =>
                                    setDraftNotes((prev) => ({ ...prev, [entry.key]: e.target.value }))
                                }
                                style={{ minHeight: 150, width: '100%' }}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                            <Button type="primary" onClick={() => saveNewNote(entry, draftNotes[entry.key] ?? entry.note ?? '')} style={{ flex: 1 }}>
                                Save
                            </Button>
                            <Button onClick={() => insertDateAtCursor(entry)} style={{ flex: 1 }}>
                                Insert Date
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        ),
    };
    
    return (
        <Card
            title="Log"
            extra={
                <span style={{ display: 'flex', gap: 8 }}>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".csv"
                        style={{ display: 'none' }}
                        onChange={onFileChange}
                    />
                    <Button onClick={handleImportCsv}>Import CSV</Button>
                    <Button onClick={handleDownload}>Download</Button>
                    <Button onClick={handleDownloadCsv}>Download CSV</Button>
                </span>
            }
        >
            <Input
                placeholder="Search by company, position, note or URL..."
                allowClear
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ marginBottom: 16 }}
            />
    
            <Table<Entry>
                columns={columns}
                dataSource={filteredEntries}
                rowKey="key"
                pagination={false}
                scroll={{ x: 'max-content' }}
                onChange={ handleChange }
                expandable={expandable}
            />
        </Card>
    )
}  

export default ActivityList;