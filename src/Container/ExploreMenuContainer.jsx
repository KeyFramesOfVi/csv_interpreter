import React, { Component } from 'react'
import ExploreMenu from '../ExploreMenu'
import { connect } from 'react-redux'

// Generates the params needed to populate the Explore Menu.
class ExploreMenuContainer extends Component {
  constructor(props) {
    super(props)

  }

  /**
   * Gets the mean for a given column in the table.
   *
   * @param {Array<Array<number|string>>} table the table of values.
   *
   * @return {number} the mean of a given xPos column.
   */
  getMean = (table) => {
    let count = 0
    return table.reduce((sum, value, key) => {
      if (key === 0 || value[this.props.xPos] === null) {
        return sum
      }
      count += 1
      return sum + value[this.props.xPos]
    }, 0) / count
  }

  /**
   * Gets the median for a given column in the table.
   *
   *
   * @return {number} the median of a given xPos column.
   */
  getMedian = () => {
    const table = this.props.table.slice(1)
    const yPos = this.props.yPos
    const xPos = this.props.xPos
    table.sort((a, b) => {
      if (a[xPos] === null) {
        return 1
      }
      if (b[xPos] === null) {
        return -1
      }
      if (a[xPos] < b[xPos]) {
        return -1
      }
      if (a[xPos] > b[xPos]) {
        return 1
      }
      return 0
    })
    const valueCount = table.reduce((counter, value) => {
      return value[xPos] === null ? counter : counter + 1
    }, 0)
    const mid = Math.floor(valueCount / 2)
    if (valueCount % 2 === 0) {
      return (table[mid][xPos] + table[mid - 1][xPos]) / 2
    }
    return table[mid][xPos]
  }

  /**
   * Gets the count for each value in a given xPos column in the table.
   *
   * @param {Array<Array<number|string>>} table the table of values.
   *
   * @return {Array<string, number>} the count for each unique value in a col.
   */
  getCounts = table => {
    const xPos = this.props.xPos
    let countMap = table.reduce((map, value, key) => {
      if (key !== 0 && value[xPos] !== null) {
        if (!map.has(value[xPos])) {
          map.set(value[xPos], 1)
        } else {
          const newVal = map.get(value[xPos]) + 1
          map.set(value[xPos], newVal)
        }
      }
      return map
    }, new Map())
    return Array.from(countMap).sort((a, b) => {
      if (a[1] < b[1]) {
        return 1
      } else if (a[1] > b[1]) {
        return -1
      }
      return 0
    })
  }

  /**
   * Gets the standard deviation for a given column in the table.
   *
   * @param {Array<Array<number|string>>} table the table of values.
   *
   * @return {number} the stddev of a given xPos column.
   */
  getStandardDeviation = table => {
    const mean = this.getMean(table)
    const diffs = this.props.table.slice(1).filter(value => (
      value !== null
    )).map(value => {
      let diff = value[this.props.xPos] - mean
      let sqr = diff * diff
      return sqr
    })
    const avgSquareDiff = diffs.reduce((sum, value) => (
      sum + value
    ), 0) / diffs.length
    return Math.sqrt(avgSquareDiff)
  }

  // Creates and returns the array of counts.
  createCounter = () => (
    this.getCounts(this.props.table)
  )

  /**
   * Generates statistics for a column that contains numbers to display.
   *
   *
   * @return {Array<Array<string, number>>} the array of statistics to display.
   */
  createStatistics = () => {
    const statistics = []
    if (this.props.columnTypes.get(this.props.xPos) === 'number') {
      statistics.push(['Mean: ', this.getMean(this.props.table)])
      statistics.push(['Median: ', this.getMedian()])
      statistics.push(
        ['Standard Deviation: ', this.getStandardDeviation(this.props.table)]
      )
    }
    return statistics
  }

  // Generates and returns the div to display if necessary.
  getStatistics = () => (
    <div>
      <h4>Statistics:</h4>
      <ul>
        {
          this.createStatistics().map(pair => (
            <li>{pair[0] + pair[1]}</li>
          ))
        }
      </ul>
    </div>
  )

  render() {
    return (
      <ExploreMenu
        createCounter={this.createCounter}
        getStatistics={this.getStatistics}
        columnLabels={this.props.columnLabels}
        columnTypes={this.props.columnTypes}
        xPos={this.props.xPos}
        display={this.props.display}
        toggleExplore={this.props.toggleExplore}
      />
    )
  }


}

export default connect(
  state => ({
    table: state.table,
    xPos: state.xPos,
    yPos: state.yPos,
    columnTypes: state.columnTypes,
    columnLabels: state.columnLabels,
    display: state.explore
  }),
  dispatch => ({
    toggleExplore: () => {
      dispatch({ type: 'TOGGLE_EXPLORE' })
    },
  })
)(ExploreMenuContainer)
