import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { withRouter } from "react-router-dom"

import styles from "./Dashboard.scss"




/**
 * Dashboard
 */
export class Dashboard extends Component {
  constructor() {
    super()
    this.state = {}
  }



  static propTypes = {
    // TODO


    // Router Props
    history: PropTypes.shape({
      go: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired,
      goForward: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired,
    }).isRequired,

    match: PropTypes.shape({
      isExact: PropTypes.bool.isRequired,
      params: PropTypes.shape({}).isRequired,
      path: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,

    location: PropTypes.shape({
      hash: PropTypes.string.isRequired,
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired,
      state: PropTypes.any,
    }).isRequired,
  }

  static defaultProps = {}


  render() {
    const props = {
      className: styles.container,
    }

    return (
      <div {...props}>
        {/* TODO */}
      </div>
    )
  }
}



const mapStateToProps = (state, props) => {
  return {
    ...props,
  }
}


const mapDispatchToProps = (dispatch /*, props */ ) => {
  return bindActionCreators({
    // TODO
  }, dispatch)
}


const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
  }
}


export const DashboardContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Dashboard)

export default withRouter(DashboardContainer)
