import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Rect } from 'common/components'
import styles from './StickyNote.scss'


export class StickyNote extends Component {
  constructor() {
    super()
  }


  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      content: PropTypes.string,
    }).isRequired,

    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    vx: PropTypes.number.isRequired,
    vy: PropTypes.number.isRequired,
  }


  static defaultProps = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
  }


  render() {
    const { data } = this.props
    const props = {
      className: styles.container,
    }

    return (
      <div {...props}>
        <div>{data.name}</div>
        <div>{data.content}</div>
      </div>
    )
  }
}


export default StickyNote
