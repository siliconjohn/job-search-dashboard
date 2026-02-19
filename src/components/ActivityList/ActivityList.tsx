import { Table, Input, Tag, Card } from 'antd'; 
import { useState } from 'react';
import type { EntryListTableType, EntryKind } from '../../types';
import type { TableProps } from 'antd';
import { useEntriesStore } from '../../stores/entriesStore';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
});

const hrefStyle: React.CSSProperties = { 
    maxWidth: 180,
    display: 'inline-block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' 
}
 
const kindToColor: Record<EntryKind['kind'], string> = {
    Application: 'green',
    Note: 'blue',
    Contact: 'gray',
    Other: 'red',
}; 

const getTagColor = (kind: EntryKind['kind']): string => {
  return kindToColor[kind] ?? 'default';  
};

const columns: TableProps<EntryListTableType>['columns'] = [
    {
        title: 'Created',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 70,
        render: (createdAt) => 
            dateFormatter.format( new Date( createdAt )),
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
        render: (kind: EntryKind['kind']) => (  
            <Tag color={ getTagColor(kind) } variant="solid">{kind}</Tag>
        ),
    },
    {
        title: 'Company',
        dataIndex: 'company',
        key: 'company',  
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
            <a style={ hrefStyle } 
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

    // Filter entries based on search input
    const filteredEntries = entries.filter((entry) => {
        if (!searchText) return true;
        const lowerSearch = searchText.toLowerCase();

        return (
        (entry.company?.toLowerCase().includes(lowerSearch) ?? false) ||
        (entry.position?.toLowerCase().includes(lowerSearch) ?? false) ||
        (entry.url?.toLowerCase().includes(lowerSearch) ?? false)
        );
    });
    
    return (
        <Card title="Log">
            <Input
                placeholder="Search by company, position or URL..."
                allowClear
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ marginBottom: 16 }}
            />
    
            <Table<EntryListTableType> 
                columns={columns} 
                dataSource={filteredEntries} 
                rowKey="key" 
            /> 
        </Card>
    )
}  

export default ActivityList;
