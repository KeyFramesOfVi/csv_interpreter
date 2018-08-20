import React, { Component } from 'react'
import File from '../File'

// Generates the params needed to generate the 'File' Menu option.
class FileContainer extends Component {
  constructor(props) {
    super(props)
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

  render() {
    return (
      <File
        displayMenu={this.state.displayMenu}
        showDropdownMenu={this.showDropdownMenu}
        hideDropdownMenu={this.hideDropdownMenu}
        xPos={this.props.xPos}
        yPos={this.props.yPos}
        options={this.props.options}
        optionFunctions={this.props.optionFunctions}
      />
    )
  }
}

export default FileContainer
