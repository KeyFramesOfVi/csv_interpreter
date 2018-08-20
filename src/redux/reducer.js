import { combineReducers } from 'redux'
import table from './modules/table'
import columnTypes from './modules/columnTypes'
import columnLabels from './modules/columnLabels'
import yPos from './modules/yPos'
import xPos from './modules/xPos'
import height from './modules/height'
import length from './modules/length'
import explore from './modules/explore'
import filter from './modules/filter'
import currentTable from './modules/currentTable'
import sortInfo from './modules/sortInfo'
import filterInfo from './modules/filterInfo'

// We combine all of our modules into the reducer that redux checks and updates.
export default combineReducers({
  table,
  currentTable,
  columnTypes,
  columnLabels,
  yPos,
  xPos,
  height,
  length,
  explore,
  filter,
  sortInfo,
  filterInfo,
})
