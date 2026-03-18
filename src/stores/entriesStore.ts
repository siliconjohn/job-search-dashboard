import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Entry } from '../types/entryTypes';

interface EntriesState {
    entries: Entry[];
    addEntry: (entry: Entry) => void;
    updateNote: (key: string, note: string) => void;
    updateKind: (key: string, kind: Entry['kind']) => void;
    updateStatus: (key: string, status: Entry['status']) => void;
    removeEntry: (key: string) => void;
    setEntries: (entries: Entry[]) => void;
}

export const useEntriesStore = create<EntriesState>()(
    persist(
        (set) => ({
            entries: [],

            addEntry: (entry) =>
                set((state) => ({
                    entries: [...state.entries, entry],
                })),
            updateNote: (key, note) =>
                set((state) => ({
                    entries: state.entries.map((e) =>
                        e.key === key ? { ...e, note } : e
                    ),
                })),
            updateKind: (key, kind) =>
                set((state) => ({
                    entries: state.entries.map((e) =>
                        e.key === key ? { ...e, kind } : e
                    ),
                })),
            updateStatus: (key, status) =>
                set((state) => ({
                    entries: state.entries.map((e) =>
                        e.key === key ? { ...e, status } : e
                    ),
                })),
            removeEntry: (key) =>
                set((state) => ({
                    entries: state.entries.filter((e) => e.key !== key),
                })),
            setEntries: (entries) => set({ entries }),
        }),
        {
            name: 'entries',
        }
    )
);