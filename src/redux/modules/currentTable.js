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
 * Creates an updated table that we can modify whenever our user filters or
 * sorts the given table.
 */
export default (state = createTable(), action) => {
  if (action.type === 'MATCH_TABLE') {
    return action.table
  } else if (action.type === 'HANDLE_DATA') {
    const canSort = action.compare !== undefined
    const canFilter = action.filterInfo.length > 0
    if (canSort && canFilter) {
      return action.table.slice(0, 1).concat(
        action.table.slice(1).filter(value => (
          action.filterInfo.every(filter => (
            filter[0](value, filter[1], filter[3])
          ))
        )).sort(action.compare)
      )
    } else if (canSort) {
      return action.table.slice(0, 1).concat(
        action.table.slice(1).sort(action.compare)
      )
    } else if (canFilter) {
      return action.table.slice(0, 1).concat(
        action.table.slice(1).filter(value => (
          action.filterInfo.every(filter => (
            filter[0](value, filter[1], filter[3])
          ))
        ))
      )
    } else {
      return action.table
    }
  }
  return state
}
