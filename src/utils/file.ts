import { readFileSync, writeFileSync } from 'fs'
import { IRecord, Relationship } from '../types/record'

export const readFile = (fileName: string): string[] => {
    return readFileSync(fileName).toString('utf-8').split('\n')
}

export const objToJSONFile = (records: IRecord[]) => {
    const stringReadyRecords = records.map(record => ({
        firstName: record.firstName,
        lastName: record.lastName,
        birthday: record.birthday.toISOString().slice(0, 10),
        age: record.age,
        relatives: record.relatives.map(relative => ({
            ...relative,
            relationship: Relationship[relative.relationship]
        }))
    }))

    // Convert the records array to a JSON string
    const jsonString = JSON.stringify(stringReadyRecords, null, 2)

    // Write the JSON string to a file
    writeFileSync('data/Output.json', jsonString, 'utf8')
    console.log('File written: Output.json')
}
