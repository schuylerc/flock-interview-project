import { calculateAge, humanFromName, rowToData, stringToDate } from './parser'
import { IHuman, IRecord, Relationship } from '../types/record'


describe('humanFromName', () => {
    it('returns a valid IHuman when name is provided', () => {
        const name = 'John Doe'
        const result = humanFromName(name)
        const expected: IHuman = {
            firstName: 'John',
            lastName: 'Doe'
        }
        expect(result).toEqual(expected)
    })

    it('returns a valid IHuman when name has multiple parts', () => {
        const name = 'John Middle Doe'
        const result = humanFromName(name)
        const expected: IHuman = {
            firstName: 'John',
            lastName: 'Doe'
        }
        expect(result).toEqual(expected)
    })

    it('returns a valid IHuman when name has only one part', () => {
        const name = 'John'
        const result = humanFromName(name)
        const expected: IHuman = {
            firstName: 'John',
            lastName: ''
        }
        expect(result).toEqual(expected)
    })
})

describe('stringToDate', () => {
    it('returns current date when input is null', () => {
        const date = 'null'
        const result = stringToDate(date)
        const expected = new Date()
        expect(result.getFullYear()).toEqual(expected.getFullYear())
        expect(result.getMonth()).toEqual(expected.getMonth())
        expect(result.getDate()).toEqual(expected.getDate())
    })

    it('returns correct date when input is valid date string', () => {
        const date = '12/31/2000'
        const result = stringToDate(date)
        const expected = new Date(2000, 11, 31)
        expect(result).toEqual(expected)
    })

    it('throws error when input is invalid date string', () => {
        const date = 'invalid date'
        const result = stringToDate(date)
        expect(result.getFullYear()).toEqual(new Date().getFullYear())
        expect(result.getMonth()).toEqual(new Date().getMonth())
        expect(result.getDate()).toEqual(new Date().getDate())
    })
})

describe('calculateAge', () => {
    it('returns correct age when ageDate is after birthday', () => {
        const birthday = new Date(2000, 0, 1)
        const ageDate = new Date(2020, 0, 1)
        const result = calculateAge(birthday, ageDate)
        expect(result).toEqual(20)
    })

    it('returns correct age when ageDate is before birthday in the same year', () => {
        const birthday = new Date(2000, 11, 31)
        const ageDate = new Date(2000, 0, 1)
        const result = calculateAge(birthday, ageDate)
        expect(result).toEqual(-1)
    })

    it('returns correct age when ageDate is on the birthday', () => {
        const birthday = new Date(2000, 0, 1)
        const ageDate = new Date(2000, 0, 1)
        const result = calculateAge(birthday, ageDate)
        expect(result).toEqual(0)
    })
})

describe('rowToData', () => {
    it('returns a valid IRecord when all fields are provided', () => {
        const rowItems = [ 'John Doe', '01/01/2000', '01/01/2020', 'Father Doe', 'Mother Doe', 'Brother Doe', 'Sister Doe' ]
        const result = rowToData(rowItems)
        const expected: IRecord = {
            firstName: 'John',
            lastName: 'Doe',
            birthday: new Date(2000, 0, 1),
            age: 20,
            relatives: [
                {firstName: 'Father', lastName: 'Doe', relationship: Relationship.Father},
                {firstName: 'Mother', lastName: 'Doe', relationship: Relationship.Mother},
                {firstName: 'Brother', lastName: 'Doe', relationship: Relationship.Brother},
                {firstName: 'Sister', lastName: 'Doe', relationship: Relationship.Sister}
            ]
        }
        expect(result).toEqual(expected)
    })

    it('returns null when rowItems length is not 7', () => {
        const rowItems = [ 'John Doe', '01/01/2000', '01/01/2020', 'Father Doe', 'Mother Doe', 'Brother Doe' ]
        const result = rowToData(rowItems)
        expect(result).toBeNull()
    })

    it('handles null values in relatives fields', () => {
        const rowItems = [ 'John Doe', '01/01/2000', '01/01/2020', 'null', 'Mother Doe', 'null', 'Sister Doe' ]
        const result = rowToData(rowItems)
        const expected: IRecord = {
            firstName: 'John',
            lastName: 'Doe',
            birthday: new Date(2000, 0, 1),
            age: 20,
            relatives: [
                {firstName: 'Mother', lastName: 'Doe', relationship: Relationship.Mother},
                {firstName: 'Sister', lastName: 'Doe', relationship: Relationship.Sister}
            ]
        }
        expect(result).toEqual(expected)
    })
})

