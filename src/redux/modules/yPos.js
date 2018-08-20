// yPos keeps track of the current row selected in our table.
export default (state = null, action) => {
  if (action.type === 'ON_CELL_CLICK') {
    return action.yPos
  } else if (action.type === 'RESET_POSITION') {
    return null
  } else if (action.type === 'ON_APP_CLICK') {
    return null
  }
  return state
}
