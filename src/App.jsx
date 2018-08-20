import React from 'react'
import MenuContainer from './Container/MenuContainer'
import TableContainer from './Container/TableContainer'
import FooterContainer from './Container/FooterContainer'
import ExploreMenuContainer from './Container/ExploreMenuContainer'
import FilterSidebar from './FilterSidebar'
import './css/App.css'

/**
 * App represents the layout of the Application.
 */
const App = props => (
  <div
    id="app"
    className="app"
    // onMouseDown={props.onAppClick}
  >
    <MenuContainer
      reset={props.reset}
    />
    <TableContainer />
    <FooterContainer />
    <ExploreMenuContainer />
    <FilterSidebar
      filterLabels={props.filterLabels}
      filterValues={props.filterValues}
      filterPositions={props.filterPositions}
      createFilter={props.createFilter}
      addFilters={props.addFilters}
      deleteFilter={props.deleteFilter}
      updateFilter={props.updateFilter}
      updateColumnPos={props.updateColumnPos}
      updateValue={props.updateValue}
      xPos={props.xPos}
      columnTypes={props.columnTypes}
      columnLabels={props.columnLabels}
      display={props.display}
      toggleFilter={props.toggleFilter}
      handleFilter={props.handleFilter}
    />
  </div>
)

export default App
