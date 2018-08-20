import getFilterFunction from '../../Utils/filter'

export default (state = [], action) => {
  /**
   * Maps each filter to it's appropriate function and returns an array of
   * filters.
   */
  if (action.type === 'HANDLE_FILTER') {
    return action.filterInfo.map(value => {
      const filterFunction = getFilterFunction(value[0])
      return [filterFunction, value[1], value[0], value[2]]
    })
  }
  return state
}
