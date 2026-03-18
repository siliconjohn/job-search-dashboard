// Read only runtime array, the single source of truth
export const ENTRY_KINDS = ['Application', 'Note', 'Contact', 'Other'] as const;
export const APPLICATION_STATUS = ['Application', 'Interview', 'Rejection', 'Ghosted', 'Offer', 'Declined'] as const;

// Creates the TypeScript type from the array
export type EntryKind = typeof ENTRY_KINDS[number];
export type ApplicationStatus = typeof APPLICATION_STATUS[number];

export const entryKindToColor: Record<EntryKind, string> = {
    Application: 'green',
    Note: 'blue',
    Contact: 'gray',
    Other: 'red',
};

export const getEntryKindColor = (kind: EntryKind): string => {
    return entryKindToColor[kind] ?? 'default';
};

export const applicationStatusToColor: Record<ApplicationStatus, string> = {
    Application: 'green',
    Interview: 'blue',
    Rejection: 'red',
    Ghosted: 'gray',
    Offer: 'gold',
    Declined: 'volcano',
};

export const getApplicationStatusColor = (status: ApplicationStatus): string => {
    return applicationStatusToColor[status] ?? 'default';
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
    contact: string,
    dead: boolean,
    position: string,
    createdAt: string,
    kind: EntryKind,
    status: ApplicationStatus,
    key: string
}

export type EntryList = {
    entries: Entry[];
}
