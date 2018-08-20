import React from 'react'
import './css/Filter.css'

/**
 * Prints out the filter options available when you create a filter. This
 * will print out options for numbers if the column selected is a number, or
 * will print string options of the option presented is a string.
 */
const FilterOptions = props => (
  <div>
    <form className="filter-form">
      {/*Create a list of filter options*/}
      <div className="filter-row">
        <label htmlFor="choices"> Select Filter </label>
        <select
          id="choices"
          name="choices"
          onChange={props.handleFilter}
        >
          {
            props.columnTypes.get(props.columnPos) === 'number' ?
              props.numberChoices.map((value, key) => (
                <option
                  key={`number${key}`}
                  value={value}
                >
                  {value}
                </option>
              )) :
              props.stringChoices.map((value, key) => (
                <option
                  key={`number${key}`}
                  value={value}
                >
                  {value}
                </option>
              ))
          }
        </select>
      </div>
      {/*Create a list of columns to select from.*/}
      <div className="filter-row">
        <label htmlFor="filter"> Select Column </label>
        <select
          id="choices"
          name="choices"
          onChange={props.handleColumnPos}
        >
          {
            props.columnLabels.map((value, key) => (
              key === 0 ? null :
                <option
                  key={`columnOption${key}`}
                  value={value}
                  selected={value === props.columnLabels[props.columnPos]}>
                  {value}
                </option>
            ))
          }
        </select>
      </div>
      {/*Create an input for inserting values.*/}
      <div className="filter-row">
        <label htmlFor="value"> Insert Value </label>
        <input
          id='value'
          name='value'
          value={props.value}
          onChange={props.handleValue}
          type='text'
        />
      </div>
      {/*A button to delete the filter.*/}
      <div className="filter-row">
        <div className="button" onClick={props.handleDeleteFilter}>
          Delete Row
        </div>
      </div>
    </form>
  </div>
)

export default FilterOptions
