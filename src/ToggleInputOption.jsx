// ✓
import React from 'react'
import { connect } from 'react-redux'
import './css/Options.css'


/**
 * Checks to see if the column is currently the column being sorted, if there
 * is a sort algorithm currently being used.
 *
 * @param {Array{string|number}} sortInfo an array containing information
 * about the sort algorithm chosen
 * @param {number} xPos the column position
 * @param {string} option the option name
 *
 *
 * @return {bool} a boolean representing whether the option has been clicked.
 */
const toggled = (sortInfo, xPos, option) => {
  if (sortInfo.length > 0) {
    if (xPos === sortInfo[1] && option === sortInfo[2]) {
      return true
    }
  }
  return false
}

// An input option that can be toggled on or off. Used for the sort option.
const ToggleInputOption = props => (
  <label
    className="active"
    onClick={props.hideDropdownMenu}
  >
    <input
      className="hidden"
      type="button"
      onClick={(event) => props.optionFunction(event)}
      value={props.option}
    />
    {
      toggled(props.sortInfo, props.xPos, props.option) ?
        `✓ ${[props.option]}` : props.option
    }
  </label>
)

export default ToggleInputOption
