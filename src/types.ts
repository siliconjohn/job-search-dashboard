
export type LogType = { 
    name: string
}

export type EntrieType = {
    name: string,
    url: string,
    createdAt: Date,
    key: string
}

export type ActivityListType = {
    entries: EntrieType[];
}

export interface ActivityListTableType {
    key: string,
    name: string,
    url: string,
    createdAt: Date 
}