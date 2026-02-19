
export type EntryKind = {
    kind: 'Application' | 'Note' | 'Contact' | 'Other'
}

export type EntrieType = { 
    url: string,
    company: string,
    note: string,
    position: string,
    createdAt: string,
    kind: EntryKind
    key: string
}

export type EntryListType = {
    entries: EntrieType[];
}

export interface EntryListTableType {
    key: string,  
    url: string,
    company: string,
    note: string,
    position: string,
    createdAt: string,
    kind: EntryKind
}