import React, { Component } from "react"
// import PropTypes from "prop-types"
import styles from "./BoardEditor.scss"



export class BoardEditor extends Component {
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


export default BoardEditor
