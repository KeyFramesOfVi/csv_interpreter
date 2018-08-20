import React from 'react'
import CellContainer from './Container/CellContainer'

// Render the set of visible Cells in a given Row.
const Row = props => (
  <div >
    {
      props.row.map((cell, x) => (
        <CellContainer
          cell={cell}
          key={`${props.y}-${x + props.colBegin}`}
          y={props.y}
          x={x + props.colBegin}
          left={props.left}
          top={props.top}
        />
      ))
    }
  </div>
)

export default Row
