import {connect} from 'react-redux'
import FilterSidebar from '../FilterSidebar'
/**
 * Redux passes xPos to get the default columnPos to start with.
 * Redux passes columnTypes and columnLabels for information about the columns
 * and to properly label them.
 * Redux passes the filter boolean value to determine whether the sidebar
 * should currently be opened, and uses toggleFilter in order to toggle this.
 * Redux uses handleFilter to run the filter functions once they are submitted.
 */
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
)(FilterSidebar)
