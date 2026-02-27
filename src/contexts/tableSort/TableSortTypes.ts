import { createContext } from 'react';

export const tableSortActions = {
    SORT: 'SORT',
    RESET: 'RESET'
};

export const STORAGE_KEY = 'tableSortState'; // name of the key in localStorage

const initValues = { 
    order: 'descend',
    field: 'createdAt',
    columnKey: 'createdAt'
};

export const loadSavedSort = () => {
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
export const TableSortContext = createContext(undefined);
 
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
