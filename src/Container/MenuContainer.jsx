import React, { Component } from 'react'
import {connect} from 'react-redux'
import Menu from '../Menu'

class MenuContainer extends Component {
  constructor(props) {
    super(props)
  }

  // Loads the csv file chosen and opens it.
  getCSVFile = () => {
    const selectedFile = document.getElementById('file')
      .files[0]

    const reader = new FileReader()

    reader.onload = e => {
      this.props.openCSV(e.target.result)
    }
    reader.readAsBinaryString(selectedFile)
    this.props.reset()
  }

  // Sends to toggleSort to update the table through redux.
  getSort = event => {
    this.props.toggleSort(event.target.value, this.props.xPos)
  }

  render() {
    return (
      <Menu
        toggleFilter={this.props.toggleFilter}
        getCSVFile={this.getCSVFile}
        getSort={this.getSort}
        xPos={this.props.xPos}
        yPos={this.props.yPos}
        columnTypes={this.props.columnTypes}
      />
    )
  }
}

/**
 * xPos and yPos keep track of the current position selected.
 * columnTypes gives us info about the column.
 * openCSV opens the new table and updates info based on it.
 * toggleSort turns a sort on and off.
 * toggleFilter toggles the filter menu on and off.
 */
export default connect(
  state => ({
    xPos: state.xPos,
    yPos: state.yPos,
    columnTypes: state.columnTypes
  }),
  dispatch => ({
    openCSV: csvData =>
      dispatch((dispatch, getState) => {
        let state = getState()
        // Open the CSV file
        dispatch({ type: 'OPEN_CSV', csvData })
        state = getState()
        // Set the currentTable to our new Table, and set the new column Types.
        dispatch({ type: 'MATCH_TABLE', table: state.table })
        dispatch({ type: 'SET_CURRENT', csvData })
        dispatch({ type: 'SET_COLUMN_TYPES', table: state.table })
        state = getState()
        // Set the new height and length of our table to update the rendering.
        dispatch({ type: 'SET_HEIGHT', table: state.table  })
        dispatch({ type: 'SET_LENGTH', table: state.table })
        state = getState()
        // Set the Column Labels if the width of the table has increased.
        dispatch({ type: 'SET_LABELS', length: state.length })
        // Reset the xPos and yPos, and reset our explore and filter bools.
        dispatch({ type: 'RESET_POSITION' })
        dispatch({ type: 'RESET_TOGGLERS' })
      }),
    toggleSort: (sortKey, index) => {
      dispatch((dispatch, getState) => {
        dispatch({ type: 'HANDLE_SORT', label: sortKey, index })
        let state = getState()
        dispatch({
          type: 'HANDLE_DATA',
          table: state.table,
          compare: state.sortInfo[0],
          filterInfo: state.filterInfo
        })
      })
    },
    toggleFilter: () => {
      dispatch({ type: 'TOGGLE_FILTER' })
    },
  }),
)(MenuContainer)
