import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import styles from "./DistributeBy.scss"



/**
 * DistributeBy
 */
export class DistributeBy extends Component {
  constructor() {
    super()
    this.state = {}
  }

  static propTypes = {
    className: PropTypes.string,
    // data: PropTypes.object.isRequired,
    distributionfield: PropTypes.string.isRequired,
    nodes: PropTypes.array,
    links: PropTypes.array,

    children: PropTypes.func.isRequired,
  }

  static defaultProps = {
    className: "",
  }



  _distributeby = (nodes, distributionfield) => {
    const distributions = {}
    for (const node of nodes) {
      if (node.hasOwnProperty(distributionfield)) {
        distributions[distributionfield] = distributions[distributionfield] || []
        distributions[distributionfield].push(node)
      }
    }

    const result = []
    for (const key in distributions) {
      result.push({
        id: key,
        accounts: distributions[key],
      })
    }

    return result
  }


  _makeDistributionNodes = (distributions) => {
    const result = []
    for (const { id } of distributions) {
      result.push({
        id,
        className: styles.cnode,
        data: {},
      })
    }
    return result
  }


  _makeDistributionLinks = (distributions) => {
    const result = []
    for (const distribution of distributions) {
      for (const account of distribution.accounts) {
        result.push({
          id: `${distribution.id}-${account.id}`,
          source: distribution,
          target: account,
        })
      }
    }
    return result
  }


  render() {
    const { nodes, links, distributionfield } = this.props
    const distributions = this._distributeby(nodes, distributionfield)
    const distributionNodes = this._makeDistributionNodes(distributions)
    const distributionLinks = this._makeDistributionLinks(distributions)
    const allNodes = nodes.concat(distributionNodes)
    const allLinks = links.concat(distributionLinks)

    // debugger // eslint-disable-line
    // return React.cloneElement(this.props.children, {
    //   nodes: allNodes,
    //   links: allLinks,
    // })

    const props = {
      nodes: allNodes,
      links: allLinks,
    }

    return this.props.children(props)

  }
}



const mapStateToProps = (state, props) => {
  const distributionfield = ""
  return {
    ...props,
    distributionfield,
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


export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(DistributeBy)
