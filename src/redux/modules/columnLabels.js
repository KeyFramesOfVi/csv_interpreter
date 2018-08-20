/**
   * Translates a number to a given A-Z letter.
   *
   *  Uses UTF-16 coding in order to get the number that represents a letter,
   *  and then translates that number back to a UTF-16 letter. Starting from
   * "A", you can add up to get any letter from A-Z.
   * @param {number} number
   *
   *
   * @return {string} A letter from A-Z that represents the number.
   */
const defineLetter = number => {
  return String.fromCharCode('A'.charCodeAt(0) + number - 1)
}

/**
 *  Takes numbers and turns them into a given letter.
 *
 *  Given a number like 27, we translate it to a given column label for Excel,
 *  which in this case would be "AA" for example.
 *
 * @param {number} num the given number being turned into a column label.
 *
 *
 * @return {string} a column label for a given column in our spreadsheet.
 */
const numberToLetters = num => {
  if (num <= 26) {
    return defineLetter(num)
  }
  const remainder = num % 26
  const quotient = Math.floor(num / 26)
  if (remainder === 0) {
    return defineLetter(quotient - 1) + defineLetter(26)
  }
  return defineLetter(quotient) + defineLetter(remainder)
}


/**
 * Creates a label for every column in an excel sheet. The defeault number
 * of labels is 26.
 *
 * @param {number} size the number of columns in our spreadsheet.
 *
 * @return {Array<string>} an array of column labels for each column in our table.
 */
const createLabels = size => (
  // size + 1 is because position 0 of columnLabels is a blank space.
  Array(size).fill(null).map((value, key) => (
    key === 0 ? null : numberToLetters(key)
  ))
)

// columnLabels sets labels whenever we open a new CSV file.
export default (state = createLabels(27), action) => {
  if (action.type === 'SET_LABELS') {
    if (action.length > 27) {
      return createLabels(action.length)
    }
  }
  return state
}
