import React, { Component } from 'react'
import { mapRecursive } from 'common/utils'
import styles from './Canvas.scss'



/**
 * Canvas for rendering D3 simulations
 *
 * Example of using HTML5 Canvas tag for rendering D3:
 * https://bl.ocks.org/mbostock/1276463
 */
export class Canvas extends Component {
  constructor() {
    super()
  }


  static propTypes = {}


  redraw = () => {
    // Iterate through D3 elements & redraw
    // (put here as an example)

    const root = d3.select('.root')
    for (let child = root.firstChild; child; child = child.nextSibling) {
      // Draw Child Element
    }
  }


  render() {
    const props = {
      className: styles.container,
    }

    return (
      <div {...props}>
        {this.props.children}
      </div>
    )
  }
}


export default Canvas
