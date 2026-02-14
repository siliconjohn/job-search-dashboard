import { Table } from 'antd'; 
import type { ActivityListType, ActivityListTableType } from '../../types';
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
                }).format(date) 
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
