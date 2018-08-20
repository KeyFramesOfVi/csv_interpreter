import React from 'react'
import './css/Footer.css'

/**
 * A footer that prints information about the Cell selected and/or sorts used
 * on a specific column.
 */
const Footer = props => (
  <div className="footer">
    <div>
      {`${props.yPos !== null ?  'y: ' + props.yPos : ''}
      ${props.xPos !== null ? 'x: ' + props.xPos : ''}`}</div>
    <div
      className="data-info sort-info"
    >
      {props.yPos === 0 ? props.getSortInfo(props.xPos, props.sortInfo, props.labels) : null}
    </div>
    <div
      className="data-info filter-info"
    >
      {props.yPos === 0 ?
        props.getFilterInfo(props.xPos, props.filterInfo, props.labels).map(text => (
          <div>{text}</div>
        ))
        : null
      }
    </div>
    {/* A button for toggling the explore menu.*/}
    <div
      className="footer-dropdown"
    >
      <div
        className="button footer-button"
        style={props.getCSS(props.xPos, props.columnTypes)}
        onClick={props.toggleExplore}
      >
        Explore
      </div>
    </div>
  </div>
)

export default Footer
