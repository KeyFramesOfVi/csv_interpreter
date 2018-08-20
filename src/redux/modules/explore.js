/**
 * A boolean that keeps track of whether we should open or close our explore
 * panel.
 */
export default (state = false, action) => {
  if (action.type === 'TOGGLE_EXPLORE') {
    return !state
  } else if (action.type === 'TOGGLE_FILTER') {
    return false
  } else if (action.type === 'RESET_TOGGLERS') {
    return false
  }
  return state
}
