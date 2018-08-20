import parser from 'csv-parse/lib/sync'

/**
 * Either sets the value to a given value or the row number.
 *
 * @param {number} x the x coordinate
 * @param {number} y the y coordinate
 * @param {string|number|null} value the value given
 * @return {number|string|null} Either the row number or the given value
 */
const getValue = (x, y, value) => {
  if (x === 0) {
    return y
  }
  return value
}

/**
 * Creates an empty table. Default size is set to 1000x27.
 *
 * @return {Array<Array<number|string|null>>} Returns an empty table.
 */
const createTable = () => {
  return Array(10000)
    .fill(null)
    .map((value, y) => (
      Array(27)
        .fill(null)
        .map((value, x) => (
          getValue(x, y, null)
        ))
    ))
}

/**
 * Converts a value to either a string or a number.
 *
 * If you are given a number with commas, like 10,000, JavaScript cannot
 * tell this is a number by default, even though it should be. Therefore,
 * I use a regular expression that parses out every number, and then tests
 * to see if every character in the string is a comma. If it is, then you
 * translate that value to a number.
 *
 * @param {string|number|string} value The value given
 * @param {number} row the row index
 * @return {number|string|null} the value untouched or changed to a number.
 */
const convertValue = (value, row) => {
  if (row === 0) {
    return value
  } else if (isNaN(value)) {
    let parsedString = value.replace(/[0-9]/g, '')
    let onlyCommas = new RegExp('^[,\,]+$').test(parsedString)
    if (onlyCommas) {
      return +value.replace(/\D/g,'')
    } else {
      return value
    }
  }
  return +value
}

/**
 * Converts a table grabbed from a csv file into a formatted table for our app.
 *
 * Our table is extended to 1000x27 if the contents of the csv file given is
 * smaller. Afterwards we create a multidimensional array where we either
 * convert a given value from the parsed table, or return null if the current
 * position is out of bounds from the csv parsed table.
 *
 * @param {Array<Array<string>>} table the csv parsed table
 * @return {number|string|null} the value untouched or changed to a number.
 */
const csvToTable = (table) => {
  const actualColLength = table.length
  const colLength = actualColLength < 1000 ? 1000 : actualColLength + 1
  const actualRowLength = table[0].length
  const rowLength = actualRowLength < 27 ? 27 : actualRowLength + 1

  return Array(colLength).fill(null).map((row, y) => (
    Array(rowLength).fill(null).map((cell, x) => {
      if (x === 0) {
        return y
      }
      let check = y >= actualColLength || x > actualRowLength
      if (!check) {
        return convertValue(table[y][x - 1], y)
      }
      return null
    })
  ))
}

const parseCSVFile = csv => {
  const lines = csv.split('\n')
  const table = lines.map(line => line.split(','))
  if (table[table.length - 1].length === 1) {
    return table.slice(0, table.length - 1)
  }
}

// The table that we interact and manage in our application.
export default (state = createTable(), action) => {
  if (action.type === 'OPEN_CSV') {

    // Use Node JS csv library to parse CSV file
    const table = parser(action.csvData)
    // const myTable = parseCSVFile(action.csvData)
    if (table.length > 0) {
      return csvToTable(table)
    }
  }
  return state
}
