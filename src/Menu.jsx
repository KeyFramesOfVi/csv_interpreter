import React, { Component } from 'react'
import {connect} from 'react-redux'
import FileContainer from './Container/FileContainer'
import DataContainer from './Container/DataContainer'
import './css/Menu.css'

// Renders the Menu. For this app we only have a 'File' and 'Data' menu option.
const Menu = props => (
  <div className="menu">
    <FileContainer
      options={['Open CSV File']}
      optionFunctions={[props.getCSVFile]}
      xPos={props.xPos}
      yPos={props.yPos}
    />
    <DataContainer
      options={[
        [
          [
            'Sort Sheet By Less Than',
            'Sort Sheet By Greater Than'
          ],
          [
            'Sort Sheet By A-Z',
            'Sort Sheet By Z-A'
          ]
        ],
        [
          'Create a Filter'
        ]
      ]}
      optionFunctions={[props.getSort, props.toggleFilter]}
      xPos={props.xPos}
      yPos={props.yPos}
      columnTypes={props.columnTypes}
    />
  </div>
)

export default Menu
