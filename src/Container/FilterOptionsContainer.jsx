import React, { Component } from 'react'
import { connect } from 'react-redux'
import FilterOptions from '../FilterOptions'

// Generates the params needed to generate options for a Filter.
class FilterOptionsContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      numberChoices: [
        'Greater than or equal',
        'Less than or equal',
        'Greater',
        'Less',
        'Is equal',
        'Is not equal',
        
      ],
      stringChoices: [
        'Text contains',
        'Text does not contain',
        'Text starts with',
        'Text ends with',
        'Text is exactly'
      ],
    }
  }

  /**
   * Passes the value and index for the updateFilter function in
   * Filter Sidebar Container.
   */
  handleFilter = event => {
    if (event) {
      this.props.updateFilter(event.target.value, this.props.index)
    }
  }

  /**
   * Passes the value and index for the updateColumnPos function in
   * FilterSidebarContainer.
   */
  handleColumnPos = event => {
    if (event) {
      this.props.updateColumnPos(event.target.value, this.props.index)
    }
  }

  /**
   * Passes the value and index for the updateValue function in
   * FilterSidebarContainer.
   */
  handleValue = event => {
    if (event) {
      this.props.updateValue(event.target.value, this.props.index)
    }
  }

  /**
   * Calls the deleteFilter function from FilterSidebarContainer with the index
   * to be deleted.
   */
  handleDeleteFilter = () => {
    this.props.deleteFilter(this.props.index)
  }
  render() {
    return (
      <FilterOptions
        handleFilter={this.handleFilter}
        handleValue={this.handleValue}
        handleColumnPos={this.handleColumnPos}
        handleDeleteFilter={this.handleDeleteFilter}
        numberChoices={this.state.numberChoices}
        stringChoices={this.state.stringChoices}
        filter={this.props.filter}
        value={this.props.value}
        columnPos={this.props.columnPos}
        columnTypes={this.props.columnTypes}
        columnLabels={this.props.columnLabels}
      />
    )
  }
}

export default FilterOptionsContainer
