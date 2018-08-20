import React, { Component } from 'react'
import ColumnLabel from './ColumnLabel'

// ColumnLabels maps each visible column label onto the page.
const ColumnLabels = props => (
  <div>
    {
      props.labels.map((label, key) => (
        <ColumnLabel
          key={label}
          index={key + props.colBegin}
          label={label}
          left={props.left}
        />
      ))
    }
  </div>
)

export default ColumnLabels
