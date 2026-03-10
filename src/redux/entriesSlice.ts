import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    entries: []
}


export const entriesSlice = createSlice( {
    name: 'entries',
    initialState,

    reducers: {
        addEntry: ( state, action ) => {
            entries: [...state.entries, action.payload]
        }
    }
});

export const { addEntry } = entriesSlice.actions;

export const entries = (state) => state.entries.value;

export default entriesSlice.reducer;
