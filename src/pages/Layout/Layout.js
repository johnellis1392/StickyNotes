import React, { Component } from "react"
import PropTypes from "prop-types"
import { FormattedMessage } from "react-intl"
import { withRouter } from "react-router-dom"
import styles from "./Layout.scss"


export class Layout extends Component {
  constructor() {
    super()
  }

  static propTypes = {
    history: PropTypes.object.isRequired,
  }


  _renderTopbar() {
    const props = {
      className: styles.topbar,
    }

    return (
      <div {...props}>
        <div className={styles.sidebarItem}><FormattedMessage id="layout.home" /></div>
        <div className={styles.sidebarItem}></div>
        <div className={styles.sidebarItem}></div>
        <div className={styles.sidebarItem}></div>
      </div>
    )
  }


  render() {
    const props = {
      className: styles.container,
    }

    return (
      <div {...props}>
        {this._renderTopbar()}
        <div className={styles.body}>
          {this.props.children}
        </div>
      </div>
    )
  }
}


export default withRouter(Layout)
