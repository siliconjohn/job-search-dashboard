import { Table, Tag } from 'antd'; 
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
    App: 'green',
    Note: 'blue',
    Contact: 'gray',
    Other: 'red',
}; 

const getTagColor = (kind: EntryKind['kind']): string => {
  return kindToColor[kind] ?? 'default';  
};

const columns: TableProps<EntryListTableType>['columns'] = [
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
    },
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
    }
];

const ActivityList: React.FC = () => {
    const entries = useEntriesStore( ( state ) => state.entries );

    return (
        <Table<EntryListTableType> 
            columns={columns} 
            dataSource={entries} 
            rowKey="key" 
        /> 
    )
}  

export default ActivityList;
