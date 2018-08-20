import React from 'react'
import './css/Options.css'

/** ClickInputOption represents an option in our menu that is clicked to change
 *  the DOM dynamically. This is primarily used for the filter option in this
 *  app.
 */
const ClickInputOption = props => (
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
    {props.option}
  </label>
)

export default ClickInputOption
