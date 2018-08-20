import React from 'react'
import './css/Cell.css'

/**
 * Calculates dynamic CSS for our Cell for positioning and coloring.
 *
 * If the cell is selected, this allows us to change the color of the Cell
 * to make it noticeable for the user. Furthermore, if the x posiition is 0,
 * it is the row number, which should also be colored. Left and Top are
 * calculated using the Virtualization algorithm in TableContainer in order
 * to position the Cells properly.
 *
 * @param {active} bool Bool to check if active.
 * @param {number} x the x position of the given cell.
 * @param {string} left the horizontal position of the cell on the page.
 * @param {string} top the vertical position of the cell on the page.
 *
 * @return {Object} An object containing css for a given Cell.
 */
const calculateCss = (active, x, left, top) => {
  let css = {}
  if (x === 0) {
    css = {
      textAlign: 'center',
      fontWeight: 'bold',
      backgroundColor: '#f0f0f0'
    }
  }
  if (active) {
    css.backgroundColor = '#dddddd'
  }

  css.left = left
  css.top = top
  return css
}

// Cell represents a given cell in our table, and displays the value of that
// cell's contents.
const Cell = props => (
  <span
    className="Cell"
    style={calculateCss(props.active, props.x, props.left, props.top)}
    onMouseDown={() => props.onCellClick(props.x, props.y)}>
    {props.cell}
  </span>
)

export default Cell
