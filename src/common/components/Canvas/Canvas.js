import React, { Component } from "react"
import d3 from "d3"
import styles from "./Canvas.scss"



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

    const root = d3.select(".root")
    const canvas = root.parentNode.appendChild(document.createElement("canvas"))
    const context = canvas.getContext("2d")

    for (let child = root.firstChild; child; child = child.nextSibling) {
      // Draw Child Element
      const element = child

      switch (element.tagName) {
      case "circle":
        context.strokeStyle = element.getAttribute("strokeStyle")
        context.beginPath()
        context.arc(element.getAttribute("x"), element.getAttribute("y"), element.getAttribute("radius"), 0, 2 * Math.PI)
        context.stroke()
      }
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
