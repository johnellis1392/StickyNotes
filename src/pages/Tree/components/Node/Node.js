import React, { Component } from "react"
import PropTypes from "prop-types"
import uuid from "uuid/v4"
import * as d3 from "d3"


import styles from "./Node.scss"



/**
 * Node
 */
export class Node extends Component {
  constructor() {
    super()
    this.state = {
      elementId: null,
    }
  }

  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    radius: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }

  static defaultProps = {
    className: "",
    name: "",
    radius: 11,
    x: 0,
    y: 0,
  }


  componentWillMount = () => {
    const elementId = `node-${uuid()}`
    this.setState({ elementId })
  }


  componentDidMount = () => {
    const { elementId } = this.state
    const container = d3.select(`#${elementId}`)
    const text = container.select("text")
    const rect = container.select("rect")
    const { x, y, width, height } = text.node().getBBox()
    const hpadding = 10
    const vpadding = 3
    const borderRadius = 5
    rect
      .attr("rx", borderRadius)
      .attr("ry", borderRadius)
      .attr("x", x - hpadding)
      .attr("y", y - vpadding)
      .attr("width", width + 2 * hpadding)
      .attr("height", height + 2 * vpadding)
  }


  render() {
    const { name, radius, x, y } = this.props
    const { elementId } = this.state
    const props = {
      className: `${this.props.className} ${styles.container}`,
      transform: `translate(${[x, y]})`,
    }

    const textOffset = 25

    return (
      <g id={elementId} {...props}>
        <circle r={radius}>
          <title>{name}</title>
        </circle>
        <rect className={styles.textBackground} />
        <text dy={textOffset}>{name}</text>
      </g>
    )
  }
}


export default Node
