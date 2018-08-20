import React from 'react'
import './css/Cell.css'

/**
 * Calculates dynamic CSS for our Column Label for positioning and coloring.
 *
 * If
 *
 * @param {number} index column position.
 * @param {number} left the horizontal position of the column on the page.
 *
 * @return {Object} An object containing css for a given Cell.
 */
const calculateCss = (index, left) => {
  let css = {
    textAlign : 'center',
    fontWeight : 'bold',
    backgroundColor : '#f0f0f0',
    left
  }
  if (index === 0) {
    css.backgroundColor = '#000000'
  }

  return css
}

// ColumnLabel represents one given column label at the top of the table.
const ColumnLabel = props => (
  <span
    className="Cell"
    style={calculateCss(props.index, props.left)}
  >
    {props.label}
  </span>
)

export default ColumnLabel
