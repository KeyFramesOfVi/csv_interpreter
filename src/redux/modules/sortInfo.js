import getSortComparator from '../../Utils/sort'

// Keeps track of the sort function, it's label and the column sorted.
export default (state = [], action) => {
  // Updates or toggles the sort off.
  if (action.type === 'HANDLE_SORT') {
    if (state.length > 0 && state[2] === action.label
       && state[1] === action.index) {
      return []
    }
    const compare = getSortComparator(action.label, action.index)
    return  [compare, action.index, action.label]
  }
  return state
}
