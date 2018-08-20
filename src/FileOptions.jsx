import React from 'react'
import FileInputOption from './FileInputOption'
import './css/Header.css'

// Renders the options under the 'File' menu tab. Used 
const FileOptions = props => (
  <ul style={{
    display: props.displayMenu ?
      'inline' : 'none'
  }}>
    {props.options.map((option, key) => (
      <li
        key={option}
      >
        <FileInputOption
          option={option}
          hideDropdownMenu={props.hideDropdownMenu}
          optionFunction={props.optionFunctions[key]}
        />
      </li>
    ))}
  </ul>
)

export default FileOptions
