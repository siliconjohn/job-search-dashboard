import { useState, } from 'react'; 
import type { LogType } from '../../types';
import type { EntrieType } from '../../types';
import ActivityList from '../ActivityList/ActivityList';
import AddEntry from '../AddEntry/AddEntry';

const ActivityLog: React.FC<LogType> = ( { name } ) => { 
    const [ entries, setEntries ] = useState<EntrieType[]>( () => {
    	const saved = localStorage.getItem('entries');  
			if (saved) {
				try {
					return( JSON.parse(saved) );
				} catch (e) {
					console.error('Failed to parse entries from localStorage', e);
		
				}
			}
			return [];
    } );  
  
    return (
        <>
            <AddEntry/>
			<ActivityList entries={ entries }/>
        </>
    )
}  

export default ActivityLog;
