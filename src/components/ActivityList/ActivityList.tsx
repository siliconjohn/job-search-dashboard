import { useState, useMemo } from 'react';
import { type TableProps, Table, Input, Tag, Card, Button, Typography } from 'antd'; 
import { useEntriesStore } from '../../stores/entriesStore';
import { type Entry, type EntryKind, getEntryKindColor } from '../../types/entryTypes';
import { formatDateShort } from '../../utils/dates';
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
    const [searchText, setSearchText] = useState('');
    const [draftNotes, setDraftNotes] = useState<Record<string, string>>({});
    const { dispatch } = useTableSortContext();

    const saveNewNote = (entry: Entry, newNote: string) => {
        updateNote(entry.key, newNote);
        setDraftNotes((prev) => {
            const next = { ...prev };
            delete next[entry.key];
            return next;
        });
    };
 
    const handleChange = (pagination, filters, sorter) => {
        const payload = {
            order: sorter.order,
            field: sorter.field,
            columnKey: sorter.columnKey,
        }

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

    // For this line: ['expandable']
    // This is an indexed access type: you take a type and “look up” one of its 
    // properties. So TableProps<Entry>['expandable'] is “the type of the 
    // expandable prop onTableProps<Entry>
    const expandable: TableProps<Entry>['expandable'] = {
        expandedRowRender: (entry) => (
            <div style={{ padding: '8px 0 8px 24px' }}>
             
                {entry.url && (
                    <p style={{ margin: '0 0 8px' }}>
                        <strong>URL:</strong>{' '}
                        <a href={entry.url} target="_blank" rel="noopener noreferrer">
                            {entry.url}
                        </a>
                    </p>
                )}
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginTop: 8 }}>
                    <Input.TextArea
                        placeholder="Edit or add note..."
                        value={draftNotes[entry.key] ?? entry.note ?? ''}
                        onChange={(e) =>
                            setDraftNotes((prev) => ({ ...prev, [entry.key]: e.target.value }))
                        }
                        style={{ flex: 1, maxWidth: 400 }}
                        rows={3}
                    />
                    <Button type="primary" onClick={() => saveNewNote(entry, draftNotes[entry.key] ?? entry.note ?? '')}>
                        Save
                    </Button>
                </div>
                {!entry.note && !entry.url && (
                    <span style={{ color: 'var(--ant-color-text-tertiary)', display: 'block', marginBottom: 8 }}>
                        No additional details
                    </span>
                )}
            </div>
        ),
    };
    
    return (
        <Card title="Log">
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
                scroll={{ x: 'max-content' }}
                onChange={ handleChange }
                expandable={expandable}
            /> 
        </Card>
    )
}  

export default ActivityList;