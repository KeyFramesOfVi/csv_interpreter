/**
 * Gets the type for a given value in the table.
 *
 *  If the type is a number, return number, otherwise it is a string.
 *
 * @param {string|number} value Either a string or a number.
 *
 *
 * @return {string} Returns a string labelling the type of our given column.
 */
const getType = value => (
  isNaN(value) ? 'string' : 'number'
)

/**
 * ColumnLabels creates a Map that maps each index in our table to a given
 * label.
 */
export default (state = new Map(), action) => {
  if (action.type === 'SET_COLUMN_TYPES') {
    if (action.table.length > 1) {
      const columnTypes = action.table[1].reduce((columnTypes, cell, index) => {
        if (index !== 0) {
          if (cell !== null) {
            return columnTypes.set(index, getType(cell))
          }
        }
        return columnTypes
      }, new Map())
      return columnTypes
    }
  }
  return state
}
