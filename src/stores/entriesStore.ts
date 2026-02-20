import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Entry } from '../types/entryTypes';

interface EntriesState {
    entries: Entry[];
    addEntry: (entry: Entry) => void;
}

export const useEntriesStore = create<EntriesState>()(
    persist(
        (set) => ({
            entries: [],

            addEntry: (entry) =>
                set((state) => ({
                    entries: [...state.entries, entry],
                })),
        }),
        {
            name: 'entries',
        }
    )
);