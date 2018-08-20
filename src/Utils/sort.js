const sortByRowNumber = (a, b) => {
  if (a[0] < b[0]) {
    return -1
  }
  if (a[0] > b[0]) {
    return 1
  }
  return 0
}

const getSortComparator = (sortKey, i) => {
  const sortMap = new Map()
  sortMap.set('Sort Sheet By Less Than', (a, b) => {
    if (a[i] === null) {
      return 1
    }
    if (b[i] === null) {
      return -1
    }
    if (a[i] < b[i]) {
      return -1
    }
    if (a[i] > b[i]) {
      return 1
    }
    return sortByRowNumber(a, b)
  })
  sortMap.set('Sort Sheet By Greater Than', (a, b) => {
    if (a[i] === null) {
      return 1
    }
    if (b[i] === null) {
      return -1
    }
    if (a[i] < b[i]) {
      return 1
    }
    if (a[i] > b[i]) {
      return -1
    }
    return sortByRowNumber(a, b)
  })
  sortMap.set('Sort Sheet By A-Z', (a, b) => {
    if (a[i] === null) {
      return 1
    }
    if (b[i] === null) {
      return -1
    }
    const result = a[i].localeCompare(b[i])
    if (result === 0) {
      return sortByRowNumber(a, b)
    }
    return result
  })
  sortMap.set('Sort Sheet By Z-A', (a, b) => {
    if (a[i] === null) {
      return 1
    }
    if (b[i] === null) {
      return -1
    }
    const result = a[i].localeCompare(b[i])
    if (result === 1) {
      return -1
    } else if (result === -1) {
      return 1
    }
    return sortByRowNumber(a, b)
  })
  return sortMap.get(sortKey)
}

export default getSortComparator
