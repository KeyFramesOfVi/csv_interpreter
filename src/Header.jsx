import React, { Component }  from 'react'
import './css/Header.css'


/**
   * Checks to see if the header option should be disabled. Mostly used to
   * disable the 'Edit' button until a column with data is selected.
   *
   *
   * @param {number} xPos the column position.
   * @param {Array<string>} columnTypes An array containing the type of value
   * contained for each column.
   *
   *
   * @return {bool} a boolean representing whether the header should be active.
   */
const isInactive = (xPos, columnTypes) => {
  if (!xPos) {
    return true
  }
  if (!columnTypes.has(xPos)) {
    return true
  }
  return false
}

/**
 * Calculates dynamic CSS for our Column Label for positioning and coloring.
 *
 * If
 * @param {string} type The type of the header.
 * @param {number} xPos column position.
 * @param {Array<string>} columnTypes An array containing the type of value
 * contained for each column.
 * @return {Object} An object containing css for a given Cell.
 */
const getCSS = (type, xPos, columnTypes) => {
  if (type !== 'File') {
    if (isInactive(xPos, columnTypes)) {
      return {
        pointerEvents: 'none',
        color: '#7f7f7f'
      }
    }
  }

  return {}
}

// Renders a given header on the Menu in our application.
const Header = props => (
  <div
    className="button"
    onClick={props.showDropdownMenu}
    style={getCSS(props.type, props.xPos, props.columnTypes)}
  >
    {props.type}
  </div>
)

export default Header
