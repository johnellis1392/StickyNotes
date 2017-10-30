import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Canvas, StickyNote } from 'common/components'
import styles from './App.scss'
import _ from 'underscore'


export default class App extends Component {
  constructor() {
    super()
  }

  static propTypes = {}


  render() {
    const props = {
      className: styles.container,
    }

    const stickyNotes = [{
        id: "1",
        name: "Sticky Note 1",
        content: "This is a first example sticky-note",
      },
      {
        id: "2",
        name: "Sticky Note 2",
        content: "This is a second example sticky-note",
      },
    ]

    return (
      <div {...props}>
        {_.map(stickyNotes, (note, index) => <StickyNote key={index} data={note} />)}
        <Canvas />
      </div>
    )
  }
}
