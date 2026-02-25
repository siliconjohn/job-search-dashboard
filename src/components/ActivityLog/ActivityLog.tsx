import AGActivityList from '../AGActivityList/AGActivityList';
import AddEntry from '../AddEntry/AddEntry';

const ActivityLog: React.FC = () => {   
    return (
        <>
            <AddEntry/>
			<AGActivityList/>
        </>
    )
}  

export default ActivityLog;
