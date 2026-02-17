
export type EntryKind = {
    kind: 'App' | 'Note' | 'Contact' | 'Other'
}

export type EntrieType = {
    name: string,
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
    name: string,
    url: string,
    createdAt: string 
}