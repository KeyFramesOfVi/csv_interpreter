import React from 'react'
import ClickInputOption from './ClickInputOption'
import './css/Header.css'

// Renders each Data option, which in this case are the sorts and filter button.
const DataOptions = props => (
  <ul style={{
    display: props.displayMenu ?
      'inline' : 'none'
  }}>
    {
      props.xPos === null || !props.columnTypes.has(props.xPos) ? null :
        props.options.reduce((list, option, key) => {
          if (key === 0) {
            return props.getSortOptions(props, option)
          }
          list.push((
            <li
              key={option}
            >
              <ClickInputOption
                option={option}
                hideDropdownMenu={props.hideDropdownMenu}
                optionFunction={props.optionFunctions[key]}
              />
            </li>
          ))
          return list
        }, [])
    }
  </ul>
)

export default DataOptions
