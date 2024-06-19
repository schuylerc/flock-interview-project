export enum Relationship {
    Mother,
    Father,
    Sister,
    Brother
}

export interface IHuman {
    firstName: string
    lastName: string
}

interface IRelative extends IHuman {
    relationship: Relationship
}

export interface IRecord extends IHuman {
    birthday: Date
    age: number
    relatives: IRelative[]
}
