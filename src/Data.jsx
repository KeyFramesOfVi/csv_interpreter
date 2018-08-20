import React from 'react'
import Header from './Header'
import DataOptions from './DataOptions'
import './css/Header.css'

// Renders the header and options for the 'Data' option in the Menu.
const Data = props => (
  <div className="dropdown">
    <Header
      type="Data"
      showDropdownMenu={props.showDropdownMenu}
      hideDropdownMenu={props.hideDropdownMenu}
      xPos={props.xPos}
      yPos={props.yPos}
      columnTypes={props.columnTypes}
    />
    <DataOptions
      xPos={props.xPos}
      yPos={props.yPos}
      displayMenu={props.displayMenu}
      hideDropdownMenu={props.hideDropdownMenu}
      options={props.options}
      optionFunctions={props.optionFunctions}
      columnTypes={props.columnTypes}
      getSortOptions={props.getSortOptions}
    />
  </div>
)

export default Data
