import {connect} from 'react-redux'
import Cell from '../Cell'

/**
 * Redux State maps an active boolean, that keeps track of whether or not the
 * given cell is the cell currently being selected. Because this is handled at
 * the bottom of the application (The Cell), it only re-renders the relevant
 * Cells, instead of rendering the entire table.
 */
export default connect(
  (state, ownProps) => ({
    active: state.xPos === ownProps.x && state.yPos === ownProps.y,
  }),
  dispatch => ({
    onCellClick: (xPos, yPos) => {
      dispatch({type: 'ON_CELL_CLICK', xPos, yPos})
    },
  }),
)(Cell)
