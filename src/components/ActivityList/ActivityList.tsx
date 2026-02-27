import { useState, useMemo } from 'react';
import { type TableProps, Table, Input, Tag, Card } from 'antd'; 
import { useEntriesStore } from '../../stores/entriesStore';
import { type Entry, type EntryKind, getEntryKindColor } from '../../types/entryTypes';
import { formatDateShort } from '../../utils/dates';
import { tableSortActions, useTableSortContext } from '../../contexts/TableSortContext';

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
    const [searchText, setSearchText] = useState('');
    const { dispatch } = useTableSortContext();
 
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
                (entry.url?.toLowerCase().includes(lowerSearch) ?? false)
            );
        });
    }, [ entries, searchText ]);
    
    return (
        <Card title="Log">
            <Input
                placeholder="Search by company, position or URL..."
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
            /> 
        </Card>
    )
}  

export default ActivityList;