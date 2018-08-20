import React, { Component } from 'react'
import {connect} from 'react-redux'
import App from '../App'

class AppContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterLabels: [],
      filterValues: [],
      filterPositions: []
    }
  }

  // Resets the state for filters. Used when a new CSV file is loaded.
  reset = () => {
    this.setState({
      filterLabels: [],
      filterValues: [],
      filterPositions: []
    })
  }

  /**
   * Creates an Array of values to render as FilterOptions.
   *
   *
   * @return {Array<string, string, int} an array that contains
   * the default filter option, the defualt value, and the default
   * position for a new FilterOptions.
   */
  createFilter = () => {
    this.setState({
      filterLabels: [...this.state.filterLabels,
        this.props.columnTypes.get(this.props.xPos) === 'number' ?
          'Greater than or equal' : 'Text contains'],
      filterValues: [...this.state.filterValues, ''],
      filterPositions: [...this.state.filterPositions, this.props.xPos]
    })
  }

  /**
   * Generates an array from the filter options to pass to Redux
   * and update the table with the new filters.
   *
   * @return {Array<Array<string, int, string|number>} an array containing
   * the filter function name, the column position to filter from, and
   * the value converted to either a string or a number depending on a row.
   */
  addFilters = () => {
    const result = this.state.filterLabels.map((filter, key) => (
      [filter, this.state.filterPositions[key], this.convertValue(key)]
    ))
    this.props.handleFilter(result)
  }

  /**
   * Deletes a filter from the array, and then updates the table
   * to display it's contents without that filter.
   */
  deleteFilter = (deletedIndex) => {
    this.setState({
      filterLabels: this.state.filterLabels.filter((value, key) => (
        key !== deletedIndex
      )),
      filterValues: this.state.filterValues.filter((value, key) => (
        key !== deletedIndex
      )),
      filterPositions: this.state.filterPositions.filter((value, key) => (
        key !== deletedIndex
      ))
    }, () => {
      this.addFilters()
    })
  }

  /**
   * Converts a value depending on if the column is holding numbers
   * or strings.
   *
   * @param {number} index the column index currently being filtered on.
   *
   * @return {string|number} Returns a number if the value holds numbers,
   * a string if the value holds strings.
   */
  convertValue = index => {
    const columnType = this.props.columnTypes.get(
      this.state.filterPositions[index]
    )
    return columnType === 'number' ? +this.state.filterValues[index] :
      this.state.filterValues[index]
  }


  /**
   * Updates the filter choice with the given event value from FilterOptions
   * with a new value.
   */
  updateFilter = (value, index) => {
    this.setState({
      filterLabels: this.state.filterLabels.map((currentValue, key) => (
        key === index ? value : currentValue
      ))
    })
  }

  /**
   * Updates the columnPos choice with the given event value from FilterOptions
   * with a new value.
   */
  updateColumnPos = (value, index) => {
    const oldType = this.props.columnTypes.get(this.state.columnPos)
    this.setState({
      filterPositions: this.state.filterPositions.map((currentValue, key) => (
        key === index ? this.props.columnLabels.indexOf(value) : currentValue
      ))
    /**
     * If the column has a different value than the old column, you have to
     * update the value for that filter with the default value of the new
     * type.
     */
    }, () => {
      const currType = this.props.columnTypes.get(this.state.columnPos)
      if (oldType !== this.props.columnTypes.get(this.state.columnPos)) {
        if (currType === 'number') {
          this.defaultNumberFilter(index)
        } else {
          this.defaultStringFilter(index)
        }
      }
    })

  }

  /**
   * Updates the filterLabels of a given index with the default string value,
   * which is the first value of stringChoices in this case.
   */
  defaultStringFilter = index => {
    this.setState({
      filterLabels: this.state.filterLabels.map((currentValue, key) => (
        key === index ? this.state.stringChoices[0] : currentValue
      ))
    })
  }

  /**
   * Updates the filterLabels of a given index with the default string value,
   * which is the first value of numberChoices in this case.
   */
  defaultNumberFilter = index  => {
    this.setState({
      filterLabels: this.state.filterLabels.map((currentValue, key) => (
        key === index ? this.state.numberChoices[0] : currentValue
      ))
    })
  }

  /**
   * Updates the filterValue of a given index with a value. If the columnType
   * is a number, it also ensures you do not add string characters to the
   * filterValue.
   */
  updateValue = (value, index) => {
    if (this.props.columnTypes.get(this.state.columnPos) === 'number') {
      if (isNaN(value)) {
        return
      }
    }
    this.setState({
      filterValues : this.state.filterValues.map((currentValue, key) => (
        key === index ? value : currentValue
      ))
    })

  }
  render() {
    return (
      <App
        filterLabels={this.state.filterLabels}
        filterValues={this.state.filterValues}
        filterPositions={this.state.filterPositions}
        reset={this.reset}
        createFilter={this.createFilter}
        addFilters={this.addFilters}
        deleteFilter={this.deleteFilter}
        updateFilter={this.updateFilter}
        updateColumnPos={this.updateColumnPos}
        updateValue={this.updateValue}
        xPos={this.props.xPos}
        columnTypes={this.props.columnTypes}
        columnLabels={this.props.columnLabels}
        display={this.props.display}
        toggleFilter={this.props.toggleFilter}
        handleFilter={this.props.handleFilter}
      />
    )
  }
}


export default connect(
  state => ({
    xPos: state.xPos,
    columnTypes: state.columnTypes,
    columnLabels: state.columnLabels,
    display: state.filter
  }),
  dispatch => ({
    toggleFilter: () => {
      dispatch({ type: 'TOGGLE_FILTER' })
    },
    handleFilter: filterInfo => {
      dispatch((dispatch, getState) => {
        dispatch({ type: 'HANDLE_FILTER', filterInfo })
        let state = getState()
        dispatch({
          type: 'HANDLE_DATA',
          table: state.table,
          compare: state.sortInfo[0],
          filterInfo: state.filterInfo,
        })
        state = getState()
        dispatch({ type: 'SET_HEIGHT', table: state.currentTable  })
        dispatch({ type: 'SET_LENGTH', table: state.currentTable  })
      })
    }
  })
)(AppContainer)
