import React, { Component } from 'react'
import Data from '../Data'
import ToggleInputOptionContainer from './ToggleInputOptionContainer'

// Generates the params needed to generate the 'Data' Menu option.
class DataContainer extends Component {
  constructor(props) {
    super(props)
    // displayMenu is a toggle for menu options.
    this.state = {
      displayMenu: false
    }
  }

  // Sets the displayMenu to true and adds a click handler function.
  showDropdownMenu = () => {
    this.setState({ displayMenu: true }, () => {
      document.addEventListener('click', this.hideDropdownMenu)
    })
  }

  // Sets the displayMenu to false and adds a click handler function.
  hideDropdownMenu = () => {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu)
    })
  }

  /**
   * Creates an array of sort options to render.
   *
   * @param {Object} props The objects passed to the DataContainer class.
   * @param {Array<string>} options The array of options for the given menu.
   *
   * @return {Array<class>} an array of sort options to render.
   */
  getSortOptions = (props, options) => {
    const index = props.columnTypes.get(props.xPos) === 'number' ? 0 : 1
    return options[index].map(option => {
      return (
        <li
          key={option}
        >
          <ToggleInputOptionContainer
            option={option}
            hideDropdownMenu={this.hideDropdownMenu}
            optionFunction={props.optionFunctions[0]}
            xPos={this.props.xPos}
          />
        </li>
      )
    })
  }

  render() {
    return (
      <Data
        displayMenu={this.state.displayMenu}
        showDropdownMenu={this.showDropdownMenu}
        hideDropdownMenu={this.hideDropdownMenu}
        getSortOptions={this.getSortOptions}
        xPos={this.props.xPos}
        yPos={this.props.yPos}
        options={this.props.options}
        optionFunctions={this.props.optionFunctions}
        columnTypes={this.props.columnTypes}
      />
    )
  }
}

export default DataContainer
