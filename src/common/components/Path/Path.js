import React, { Component } from "react"
import styles from "./Path.scss"


export class Path extends Component {
  constructor() {
    super()
  }


  static propTypes = {}


  render() {
    const props = {
      className: styles.container,
    }

    return (
      <div {...props}></div>
    )
  }
}


export default Path
