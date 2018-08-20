import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Table from '../Table'
import '../css/Table.css'

class TableContainer extends PureComponent {
  constructor(props) {
    super(props)
    this.state ={
      clientHeight: 0,
      clientWidth: 0,
      currX: 0,
      currY: 0
    }
  }

  /**
   * Updates the window dimensions and sets them, for when the viewport is
   * made smaller or bigger.
   */
  updateWindowDimensions = () => {
    // Create the measurement node
    const scrollDiv = document.createElement('div')
    scrollDiv.className = 'scrollbar-measure'
    document.body.appendChild(scrollDiv)

    // Get the scrollbar width
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    const scrollbarHeight = scrollDiv.offsetHeight - scrollDiv.clientHeight
    // Delete the DIV
    document.body.removeChild(scrollDiv)

    const clientHeight = Math.floor(
      document.getElementById('app').clientHeight * 0.82) - scrollbarHeight
    const clientWidth = document.getElementById('app').clientWidth -
      scrollbarWidth

    this.setState({
      clientWidth,
      clientHeight
    })
  }

  /**
  * Add The resize event listener when the component mounts.
  */
  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions.bind(this))
  }

  /**
  * Remove The resize event listener when the component unmounts.
  */
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions.bind(this))
  }

  /**
   * Set current positions whenever the user scrolls vertically or horizontally.
   */
  handleScroll = event => {
    this.setState({
      currX: event.target.scrollLeft,
      currY: event.target.scrollTop
    })
  }

  /**
   * Use Virtualization to slice the column labels that should appear
   * given the x and y position of the page.
   *
   * @param{number} CELL_WIDTH the cell's width
   * @param{number} colBegin the column to begin rendering.
   * @param{number} colEnd the column to stop rendering on.
   *
   * @return {Array<string>} the array of column labels to be rendered.
   */
  createVirtualLabels = (CELL_WIDTH, colBegin, colEnd) => {
    if (this.props.labels) {
      colEnd = Math.min(colEnd + 1, this.props.labels.length)
      return this.props.labels.slice(colBegin, colEnd)
    }
    return []
  }

  /**
   * Use Virtualization to slice the column labels that should appear
   * given the x and y position of the page.
   *
   * @param{number} CELL_HEIGHT the cell's height
   * @param{number} CELL_WIDTH the cell's width
   * @param{number} rowBegin the row to begin rendering.
   * @param{number} rowEnd the row to stop rendering on.
   * @param{number} colBegin the column to begin rendering.
   * @param{number} colEnd the column to stop rendering on.
   *
   * @return {Array<Array<number|string>} the range of cells to render in the
   * table.
   */
  createVirtualTable = (
    CELL_HEIGHT,
    CELL_WIDTH,
    rowBegin,
    rowEnd,
    colBegin,
    colEnd
  ) => {
    if (this.props.table) {
      colEnd = Math.min(colEnd + 1, this.props.table[0].length || 0)
      rowEnd = Math.min(rowEnd + 1, this.props.table.length)
      return this.props.table.slice(rowBegin, rowEnd).map(value => (
        value.slice(colBegin, colEnd)
      ))
    }
    return []
  }

  render() {
    /**
     * Get the positions that should be rendered given the cell's height and
     * width, as well as the position we have scrolled to in the app.
     */

    const CELL_WIDTH = 120
    const CELL_HEIGHT = 25

    const rowBegin = Math.max(0, Math.floor(this.state.currY / CELL_HEIGHT) - 1)
    const rowEnd = Math.floor((this.state.clientHeight) / CELL_HEIGHT) +
    rowBegin + 1
    const colBegin = Math.floor(this.state.currX / CELL_WIDTH)
    const colEnd = Math.floor(this.state.clientWidth / CELL_WIDTH) +
    colBegin + 1

    /**
     * Get a virtualized table and list of labels to render after figuring
     * out the range of cells to render.
     */
    const labels = this.createVirtualLabels(CELL_WIDTH, colBegin, colEnd)
    const table = this.createVirtualTable(
      CELL_HEIGHT,
      CELL_WIDTH,
      rowBegin,
      rowEnd,
      colBegin,
      colEnd,
    )

    return (
      <Table
        rowBegin={rowBegin}
        rowEnd={rowEnd}
        colBegin={colBegin}
        colEnd={colEnd}
        labels={labels}
        table={table}
        handleScroll={this.handleScroll}
        height={this.props.height}
        length={this.props.length}
        xPos={this.props.xPos}
        yPos={this.props.yPos}
      />
    )
  }
}

export default connect(
  state => ({
    labels: state.columnLabels,
    table: state.currentTable,
    height: state.height,
    length: state.length
  })
)(TableContainer)
