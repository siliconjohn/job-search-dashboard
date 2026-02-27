/* eslint-disable react-refresh/only-export-components */
import { useContext, createContext, useReducer, useEffect } from 'react';

export const tableSortActions = {
    SORT: 'SORT',
    RESET: 'RESET'
};

const STORAGE_KEY = 'tableSortState'; // name of the key in localStorage

const initValues = { 
    order: 'descend',
    field: 'createdAt',
    columnKey: 'createdAt'
};

const loadSavedSort = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (err) {
        console.warn('Failed to load sort state from localStorage:', err);
    }
    return initValues;
};

// Create context
const TableSortContext = createContext(undefined);

// Create hook
export const useTableSortContext = () => useContext(TableSortContext);

// Create reducer
export const tableSortReducer = (state, action) => {
    switch (action.type) {
        case tableSortActions.SORT: return {
            ...state,
            order: action.payload.order,
            field: action.payload.field,
            columnKey: action.payload.columnKey
        };
        case tableSortActions.RESET: return {
            ...state,
            ...initValues
        };
        default: return state;
    }
};

// Provider
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
