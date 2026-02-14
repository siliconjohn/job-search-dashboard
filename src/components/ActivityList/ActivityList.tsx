import { Table } from 'antd'; 
import type { EntrieType, ActivityListType, ActivityListTableType } from '../../types';
import type { TableProps } from 'antd';

const ActivityList: React.FC<ActivityListType> = ({ entries }) => {

    const columns: TableProps<ActivityListTableType>['columns'] = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'at',
            render: (date) => 
                new Intl.DateTimeFormat('en-US', {
                    month: 'short',
                    day: 'numeric'
                }).format(date),
            sorter: (a, b) => { 
                const timeA = new Date(a.createdAt).getTime();
                const timeB = new Date(b.createdAt).getTime();
                return (isNaN(timeA) ? 0 : timeA) - (isNaN(timeB) ? 0 : timeB);
            },
            defaultSortOrder: 'descend',    
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',  
        },
        {
            title: 'URL',
            dataIndex: 'url',
            key: 'url',
            render: (text) => <a href={text}>{text}</a> 
        }
    ];

    return (
        <Table<ActivityListTableType> columns={columns} dataSource={entries} /> 
    )
}  

export default ActivityList;
