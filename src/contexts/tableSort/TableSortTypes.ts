import { type Dispatch, createContext } from 'react';

export const tableSortActions = {
    SORT: 'SORT',
    RESET: 'RESET'
} as const;

export const STORAGE_KEY = 'tableSortState';

export type SortState = {
    order: 'ascend' | 'descend' | undefined;
    field: string | undefined;
    columnKey: string | undefined;
};

export const initValues: SortState = {
    order: 'descend',
    field: 'createdAt',
    columnKey: 'createdAt'
};

export const loadSavedSort = (): SortState => {
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

// Action type
export type SortAction =
    { type: typeof tableSortActions.SORT; payload: Partial<SortState> }
    | { type: typeof tableSortActions.RESET };

// Context value type
export type SortContextType = {
    state: SortState;
    dispatch: Dispatch<SortAction>;
} | undefined;

// Create context with proper type
export const TableSortContext = createContext<SortContextType>(undefined);

// Reducer with types
export const tableSortReducer = (state: SortState, action: SortAction): SortState => {
    switch (action.type) {
        case tableSortActions.SORT:
            return {
                ...state,
                order: action.payload.order ?? state.order,
                field: action.payload.field ?? state.field,
                columnKey: action.payload.columnKey ?? state.columnKey,
            };
        case tableSortActions.RESET:
            return {
                ...state,
                ...initValues,
            };
        default:
            return state;
    }
};