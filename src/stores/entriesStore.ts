import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { EntryType } from '../types/entryTypes';

interface EntriesState {
    entries: EntryType[];
    addEntry: (entry: EntryType) => void;
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