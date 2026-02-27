// import AGActivityList from '../AGActivityList/AGActivityList';
import ActivityList from '../ActivityList/ActivityList';
import AddEntry from '../AddEntry/AddEntry';
import TableSortProvider from '../../contexts/TableSortContext';

const ActivityLog: React.FC = () => {   
    return (
        <>
            <AddEntry/>
            <TableSortProvider>
			    <ActivityList/>
            </TableSortProvider>
        </>
    )
}  

export default ActivityLog;
