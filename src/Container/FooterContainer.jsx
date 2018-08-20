import React, { Component } from 'react'
import {connect} from 'react-redux'
import Footer from '../Footer'

class FooterContainer extends Component {
  /**
   * Determine whether Explore should be toggleable or not.
   *
   * @param {number} xPos the current column being chosen.
   * @param {Array<string>} columnTypes the type of the column selected.
   * @return {number} the mean of a given xPos column.
   */
  isInactive = (xPos, columnTypes) => {
    if (!xPos) {
      return true
    }
    if (!columnTypes.has(xPos)) {
      return true
    }
    return false
  }

  /**
   * Calculates dynamic CSS to toggle the Explore button on and off.
   *
   *
   * @param {number} xPos column position.
   * @param {Array<string>} columnTypes the type of the column selected.
   *
   * @return {Object} An object containing css for a given Cell.
   */
  getCSS = (xPos, columnTypes) => {
    if (this.isInactive(xPos, columnTypes)) {
      return {
        pointerEvents: 'none',
        color: '#7f7f7f'
      }
    }
    return {}
  }

  /**
   * Get information on the sort currently being used on the column.
   *
   *
   * @param {number} xPos column position.
   * @param {Array<string, number, string>} sortInfo Information regarding the
   * sort function being selected.
   * @param {Array<string>} columnLabels The labels for each column.
   *
   * @return {string} A string printing out info about the sort, if any.
   */
  getSortInfo = (xPos, sortInfo, columnLabels) => {
    if (sortInfo.length === 0) {
      return 'Sort: None'
    }
    if (xPos !== sortInfo[1]) {
      return 'Sort: None'
    }
    return `Sort: ${sortInfo[2]}, Column Sorted: ${columnLabels[sortInfo[1]]}.`
  }

  /**
   * Get information on the filters currently being used on the column.
   *
   *
   * @param {number} xPos column position.
   * @param {Array<Array<function, number, string, number|string>>} filterInfo
   * Information regarding the filter functions being selected.
   * @param {Array<string>} columnLabels The labels for each column.
   *
   * @return {Array<string>} An array of strings printing out info about the
   * filters, if any.
   */
  getFilterInfo = (xPos, filterInfo, columnLabels) => {
    if (filterInfo.length === 0) {
      return ['Filter: None']
    }
    else {
      const filtersUsed = filterInfo.filter(filter => (
        xPos === filter[1]
      ))
      if (filtersUsed.length === 0) {
        return ['Filter: None']
      }
      return filtersUsed.map((filter, index) => (
        `Filter ${index}: ${filter[2]}, Value: ${filter[3]}, Column Filtered: ${[columnLabels[filter[1]]]}.`
      ))
    }
  }

  render() {
    return (
      <Footer
        isInactive={this.isInactive}
        getCSS={this.getCSS}
        getSortInfo={this.getSortInfo}
        getFilterInfo={this.getFilterInfo}
        xPos={this.props.xPos}
        yPos={this.props.yPos}
        columnTypes={this.props.columnTypes}
        labels={this.props.labels}
        sortInfo={this.props.sortInfo}
        filterInfo={this.props.filterInfo}
        toggleExplore={this.props.toggleExplore}
      />
    )
  }
}

/**
 * xPos and yPos give information about the current position being selected.
 * ColumnTypes and labels gives more information about the columns.
 * sortInfo and filterInfo allow us to print information about the manipulations
 * being done on the table.
 * toggleExplore allow us to toggle the explore menu on and off.
 */
export default connect(
  state => ({
    xPos: state.xPos,
    yPos: state.yPos,
    columnTypes: state.columnTypes,
    labels: state.columnLabels,
    sortInfo: state.sortInfo,
    filterInfo: state.filterInfo
  }),
  dispatch => ({
    toggleExplore: () => {
      dispatch({ type: 'TOGGLE_EXPLORE' })
    },
  })
)(FooterContainer)
