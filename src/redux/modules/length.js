// Keeps track of the current width of our table.
export default (state = 27, action) => {
  if (action.type === 'SET_LENGTH') {
    return action.table[0].length
  }
  return state
}
