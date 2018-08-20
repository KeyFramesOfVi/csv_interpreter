import React, { PureComponent } from 'react'
import Row from './Row'
import ColumnLabels from './ColumnLabels'
import './css/Table.css'

/**
 * Render the visible ColumnLabels and Rows at a given position when scrolling.
 * Uses Virtualization in order to do this.
 */

const Table = props => (
  <div
    className="scrollmenu"
    onScroll={props.handleScroll}
  >
    <div
      id="table"
      className="table"
      style={{
        height: `${(props.height + 1) * 25}px`,
        width: `${props.length * 120}px`
      }}
      onScroll={props.handleScroll}
    >
      <ColumnLabels
        labels={props.labels}
        xPos={props.xPos}
        yPos={props.yPos}
        left={120 * props.colBegin}
        colBegin={props.colBegin}
      />
      {
        props.table.map((row, y) => (
          <Row
            key={y + props.rowBegin}
            row={row}
            y={y + props.rowBegin}
            top={25 * props.rowBegin}
            left={120 * props.colBegin}
            colBegin={props.colBegin}
          />
        ))
      }
    </div>
  </div>
)
export default Table
