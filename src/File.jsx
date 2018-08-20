import React from 'react'
import Header from './Header'
import FileOptions from './FileOptions'
import './css/Header.css'

// Renders the header and options for the 'File' option in the Menu.
const File = props => (
  <div className="dropdown">
    <Header
      type="File"
      showDropdownMenu={props.showDropdownMenu}
      hideDropdownMenu={props.hideDropdownMenu}
      xPos={props.xPos}
      yPos={props.yPos}
    />
    <FileOptions
      displayMenu={props.displayMenu}
      hideDropdownMenu={props.hideDropdownMenu}
      options={props.options}
      optionFunctions={props.optionFunctions}
    />
  </div>
)

export default File
