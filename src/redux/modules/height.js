// Keeps track of the current height of our table.
export default (state = 10000, action) => {
  if (action.type === 'SET_HEIGHT') {
    return action.table.length
  }
  return state
}
