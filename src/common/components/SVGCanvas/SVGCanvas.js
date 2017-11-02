import React, { Component } from "react"
import PropTypes from "prop-types"
import uuid from "uuid/v4"
import styles from "./SVGCanvas.scss"


export default class SVGCanvas extends Component {
  constructor() {
    super()
  }

  static propTypes = {
    elementId: PropTypes.string.isRequired,
    className: PropTypes.string,
    // children: PropTypes.arrayOf(
    //   PropTypes.oneOfType(
    //     /* ... */
    //   )
    // ),
  }


  static defaultProps = {
    elementId: uuid(),
    className: "",
  }


  injectParent = (children) => {
    return React.Children.map(children, (node) => {
      return React.cloneElement(node, {
        parent: this.props.elementId,
      })
    })
  }


  render() {
    const props = {
      id: this.props.elementId,
      className: `${this.props.className} ${styles.container}`,
    }

    return (
      <svg {...props}>
        {this.injectParent(this.props.children)}
      </svg>
    )
  }
}
