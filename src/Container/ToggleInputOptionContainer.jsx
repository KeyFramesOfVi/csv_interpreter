import {connect} from 'react-redux'
import ToggleInputOption from '../ToggleInputOption'

/**
 * SortInfo is passed to ToggleInputOption so that it can determine whether
 * or not the given column is the one that was sorted.
 */
export default connect(
  state => ({
    sortInfo: state.sortInfo,
  }),
  dispatch => ({
    onCellClick: (xPos, yPos) => {
      dispatch({type: 'ON_CELL_CLICK', xPos, yPos})
    },
  }),
)(ToggleInputOption)
