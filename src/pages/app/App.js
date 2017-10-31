import React, { Component } from "react"
// import PropTypes from "prop-types"
// import { withRouter } from "react-router-dom"

// import { Canvas, StickyNote } from "common/components"
import styles from "./App.scss"
// import _ from "underscore"


// const Button = withRouter(({ history }) => (
//   <button type='button' onClick={() => history.push("/data")}>Click Me</button>
// ))


export class App extends Component {
  constructor() {
    super()
  }

  static propTypes = {}



  render() {
    const props = {
      className: styles.container,
    }

    return (
      <div {...props}>
        {/* <Button /> */}
        {/* {_.map(stickyNotes, (note, index) => <StickyNote key={index} data={note} />)} */}
        {/* <Canvas /> */}
      </div>
    )
  }
}


export default App
