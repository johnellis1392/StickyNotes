import React, { Component } from "react"
import PropTypes from "prop-types"
import * as d3 from "d3"

import styles from "./Link.scss"




/**
 * Link
 */
export class Link extends Component {
  constructor() {
    super()
    this.state = {}
  }

  static propTypes = {
    source: PropTypes.shape({}),
    target: PropTypes.shape({}),
    intermediate: PropTypes.shape({}),
  }

  static defaultProps = {}



  _positionLink = ({ source, target, intermediate = null } = this.props) => {
    const transform = d3.zoomIdentity

    const src = transform.apply([source.x || 0, source.y || 0])
    const dst = transform.apply([target.x || 0, target.y || 0])
    const mid = intermediate ? transform.apply([intermediate.x || 0, intermediate.y || 0]) : null

    const m = `M ${src[0]}, ${src[1]}`
    const s = mid ? ` Q ${mid[0]}, ${mid[1]}` : ""
    const l = ` ${dst[0]}, ${dst[1]}`

    return m + s + l
  }


  render() {
    const props = {
      className: styles.container,
      d: this._positionLink(),
    }

    return (
      <path {...props} />
    )
  }
}


export default Link
