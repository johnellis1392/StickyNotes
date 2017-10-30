import React, { Component } from "react"
import styles from "./Circle.scss"


export class Circle extends Component {
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


export default Circle
