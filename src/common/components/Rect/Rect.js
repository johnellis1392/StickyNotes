import React, { Component } from "react"
import styles from "./Rect.scss"


export class Rect extends Component {
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


export default Rect
