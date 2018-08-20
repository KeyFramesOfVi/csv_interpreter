import React, { Component } from 'react'
import './css/Options.css'

/**
 * Renders the input for options that open files. This is used to open csv
 * files.
 */
const FileInputOption = props => (
  <label
    className="active"
    onClick={props.hideDropdownMenu}
  >
    <input
      type="file"
      id="file"
      className="hidden"
      onClick={ event =>  event.target.value = null }
      onChange={props.optionFunction}
      accept=".csv"
    />
    {props.option}
  </label>
)

export default FileInputOption
