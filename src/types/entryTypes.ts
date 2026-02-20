// Read only runtime array, the single source of truth
export const ENTRY_KINDS = ['Application', 'Note', 'Contact', 'Other'] as const;

// Creates the TypeScript type from the array
export type EntryKind = typeof ENTRY_KINDS[number];

export const entryKindToColor: Record<EntryKind, string> = {
    Application: 'green',
    Note: 'blue',
    Contact: 'gray',
    Other: 'red',
};

export const getEntryKindColor = (kind: EntryKind): string => {
    return entryKindToColor[kind] ?? 'default';
};

export const sanitizeKind = (value: string | undefined): EntryKind => {
    if (!value) return 'Other';
    const trimmed = value.trim();

    return ENTRY_KINDS.includes(trimmed as EntryKind)
        ? (trimmed as EntryKind)
        : 'Other';
};

export type Entry = { 
    url: string,
    company: string,
    note: string,
    position: string,
    createdAt: string,
    kind: EntryKind
    key: string
}

export type EntryList = {
    entries: Entry[];
}
