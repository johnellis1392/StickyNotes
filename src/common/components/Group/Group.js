import React, { Component } from "react"
import PropTypes from "prop-types"
import styles from "./Group.scss"


export default class Group extends Component {
  constructor() {
    super()
  }

  static propTypes = {
    parent: PropTypes.string.isRequired,
  }



  render() {
    const props = {
      className: styles.container,
    }

    return (
      <g {...props}></g>
    )
  }
}
