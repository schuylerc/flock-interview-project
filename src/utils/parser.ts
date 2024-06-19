import { IHuman, IRecord, Relationship } from '../types/record'


export const humanFromName = (name: string): IHuman => {
    // split name into first and other names
    const [ first, ...rest ] = name.trim().split(' ')
    const last = rest.pop()
    return {firstName: first, lastName: last || ''}
}

export const stringToDate = (date: string): Date => {
    // if date is null, return today's date
    if (date === 'null') return new Date()
    //  split date string into month, day, year
    const [ month, day, year ] = date.split('/').map(Number)
    if (!month || !day || !year) {
        console.log('Invalid date string in data: ', date, 'Returning current date.')
        return new Date()
    }
    return new Date(year, month - 1, day)
}


export const calculateAge = (birthday: Date, ageDate: Date): number => {
    let age = ageDate.getFullYear() - birthday.getFullYear()
    const isBirthdayPassed = (ageDate.getMonth() > birthday.getMonth()) ||
        (ageDate.getMonth() === birthday.getMonth() && ageDate.getDate() >= birthday.getDate())
    // if birthday has not passed, subtract one from age
    if (!isBirthdayPassed) {
        age--
    }
    return age
}

export const rowToData = (rowItems: string[]): IRecord | null => {
    // return null if row does not match header length
    if (rowItems.length !== 7) {
        console.log('Row does not match header length: skipping row.')
        return null
    }

    const [
        name,
        birthday,
        died,
        father,
        mother,
        brother,
        sister ] = rowItems
    
    return {
        ...humanFromName(name),
        birthday: stringToDate(birthday),
        age: calculateAge(stringToDate(birthday), stringToDate(died)),
        relatives: [
            ...(father !== 'null' ? [ {...humanFromName(father), relationship: Relationship.Father} ] : []),
            ...(mother !== 'null' ? [ {...humanFromName(mother), relationship: Relationship.Mother} ] : []),
            ...(brother !== 'null' ? [ {...humanFromName(brother), relationship: Relationship.Brother} ] : []),
            ...(sister !== 'null' ? [ {...humanFromName(sister), relationship: Relationship.Sister} ] : [])
        ],
    }
}
