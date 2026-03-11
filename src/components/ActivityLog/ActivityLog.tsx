// import AGActivityList from '../AGActivityList/AGActivityList';
import ActivityList from '../ActivityList/ActivityList';
import AddEntry from '../AddEntry/AddEntry';
import TableSortProvider from '../../contexts/tableSort/TableSortProvider';

const ActivityLog: React.FC = () => {   
    return (
        <>
            <div className="mb-6">
                <AddEntry/>
            </div>
            <TableSortProvider>
			    <ActivityList/>
            </TableSortProvider>
        </>
    )
}  

export default ActivityLog;
