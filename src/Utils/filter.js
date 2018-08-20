const getFilterFunction = filterKey => {
  const filterMap = new Map()
  filterMap.set('Greater than or equal', (value, i, input) => (
    value[i] === null || value[i] >= input
  ))
  filterMap.set('Less than or equal', (value, i, input) => (
    value[i] === null || value[i] <= input
  ))
  filterMap.set('Greater', (value, i, input) => (
    value[i] === null || value[i] > input
  ))
  filterMap.set('Less', (value, i, input) => (
    value[i] === null || value[i] < input
  ))
  filterMap.set('Is equal', (value, i, input) => (
    value[i] === null || value[i] === input
  ))
  filterMap.set('Is not equal', (value, i, input) => (
    value[i] === null || value[i] !== input
  ))
  filterMap.set('Text contains', (value, i, input) => (
    value[i] === null || value[i].includes(input)
  ))
  filterMap.set('Text does not contain', (value, i, input) => (
    value[i] === null || !value[i].includes(input)
  ))
  filterMap.set('Text starts with', (value, i, input) => (
    value[i] === null || value[i].startsWith(input)
  ))
  filterMap.set('Text ends with', (value, i, input) => (
    value[i] === null || value[i].endsWith(input)
  ))
  filterMap.set('Text is exactly', (value, i, input) => (
    value[i] === null || value[i] === input
  ))
  return filterMap.get(filterKey)
}

export default getFilterFunction
