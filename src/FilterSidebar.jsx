import React from 'react'
import './css/Filter.css'
import FilterOptionsContainer from './Container/FilterOptionsContainer'

// Creates a sidebar where you can manage and customize your filters.
const FilterSidebar = props => (
  <div
    className="filter"
    style={{
      display: props.display ? 'block' : 'none',
      fontSize: '2em'
    }}>
    <div
      className="close-thik"
      onClick={props.toggleFilter}
    >
    </div>
    {/*Render all of the filter options currently available*/}
    <div className="filter-options">
      {
        props.filterLabels.map((filter, key) => (
          <FilterOptionsContainer
            key={`filter${key}`}
            index={key}
            filter={filter}
            value={props.filterValues[key]}
            columnPos={props.filterPositions[key]}
            deleteFilter={props.deleteFilter}
            updateFilter={props.updateFilter}
            updateColumnPos={props.updateColumnPos}
            updateValue={props.updateValue}
            columnLabels={props.columnLabels}
            columnTypes={props.columnTypes}
          />
        ))
      }
    </div>
    {/*The menu for creating and submitting filters.*/}
    <div className="button-menu">
      <div style={{float: 'left'}}
        className="filter-button-left"
        onClick={props.createFilter}
      >
      Create Filter
      </div>
      <div style={{clear: 'left', float: 'right'}}
        className="filter-button-right"
        onClick={props.addFilters}
      >
      Submit Filters
      </div>
    </div>
  </div>
)

export default FilterSidebar
