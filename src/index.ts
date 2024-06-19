import { objToJSONFile, readFile } from './utils/file'
import { IRecord } from './types/record'
import { rowToData } from './utils/parser'

console.log('Starting CSV to JSON conversion')

const expectedHeader: string = 'Name,Birthday,Died,Father,Mother,Brother,Sister'


try {
    // Read in the file
    const lines: string[] = readFile('data/input.csv').filter(line => line.trim() !== '')
    // validate file line length
    if (lines.length < 2) {
        console.error('File format error: CSV must have a header and at least 1 line of data')
        process.exit()
    }
    const [ headerLine, ...tailLines ] = lines
    // validate file header columns
    if (headerLine !== expectedHeader) {
        console.error(`File format error: incorrect header columns. Format must be: ${expectedHeader}`)
        process.exit()
    }

    // process remaining rows into data objects, and filter out returned null values
    const humans: IRecord[] = tailLines.map(row => rowToData(row.split(',')))
        .filter(record => record !== null) as IRecord[]

    // output objects to JSON file
    try {
        objToJSONFile(humans)
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error writing data/Output.json file: ${error.message}.`)
        } else {
            console.error('An unknown error occurred')
        }
    }

} catch (error: unknown) {
    if (error instanceof Error) {
        console.error(`Error reading in file: ${error.message}.`)
    } else {
        console.error('An unknown error occurred')
    }
}

console.log('Conversion complete')
