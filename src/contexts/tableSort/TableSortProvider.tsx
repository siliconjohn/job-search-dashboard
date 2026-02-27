 
import { useEffect, useReducer } from "react";
import { tableSortReducer, loadSavedSort, STORAGE_KEY, TableSortContext} 
    from './TableSortTypes';

const TableSortProvider = ({ children }) => {
    const [state, dispatch] = useReducer(tableSortReducer, loadSavedSort());
    
    // Save to localStorage every time state changes
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (err) {
            console.warn('Failed to save sort state to localStorage:', err);
        }
    }, [state]);
    
    // Pass BOTH state and dispatch (standard pattern)
    const value = { state, dispatch };
    
    return (
        <TableSortContext.Provider value={value}>
            {children}
        </TableSortContext.Provider>
    );
};

export default TableSortProvider;
