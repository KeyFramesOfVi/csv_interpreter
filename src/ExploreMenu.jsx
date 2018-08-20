import React from 'react'
import './css/Explore.css'

// Posts the statistics regarding a column if the display is toggled.
const ExploreMenu = props => (
  <div
    className="explore"
    style={{
      display: props.display ? 'block' : 'none',
      fontSize: '2em'
    }}>
    <div
      className="close-thik"
      onClick={props.toggleExplore}
    >
    </div>
    {
      props.display ?

        <div className="statistics">
          <h3>{`Column ${props.columnLabels[props.xPos]}`}</h3>
          <h4>Count: </h4>
          <ul>
            {
              props.createCounter().map(pair => (
                <li>{`${pair[0]}: ${pair[1]}`}</li>
              ))
            }
          </ul>
          {
            <div>
              {
                props.columnTypes.get(props.xPos) === 'number' ?
                  props.getStatistics() : null
              }
            </div>
          }

        </div> : null
    }
  </div>
)

export default ExploreMenu
