import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as d3 from "d3"
import _ from "underscore"

import { Link, Node, DistributeBy } from "./components"
import { SVGCanvas } from "common/components"
import styles from "./Tree.scss"



const renderNodes = ({ nodes = [], links = [] }) => {
  return (
    <g>
      <g className={styles.links}>
        {_.map(links, (link) => <Link key={link.id} className={`${link.className || ""} ${styles.link}`} {...link} />)}
      </g>

      <g className={styles.nodes}>
        {_.map(nodes, (node) => <Node key={node.id} className={`${node.className || ""} ${styles.node}`} {...node} />)}
      </g>
    </g>
  )
}


// export class renderNodes extends Component {
//   static propTypes = {
//     nodes: PropTypes.array.isRequired,
//     links: PropTypes.array.isRequired,
//   }
//
//   static defaultProps = {
//     nodes: [],
//     links: [],
//   }
//
//
//   render() {
//     const { nodes, links } = this.props
//     debugger // eslint-disable-line
//     return (
//       <g>
//         <g className={styles.links}>
//           {_.map(links, (link) => <Link key={link.id} className={styles.link} {...link} />)}
//         </g>
//
//         <g className={styles.nodes}>
//           {_.map(nodes, (node) => <Node key={node.id} className={styles.node} {...node} />)}
//         </g>
//       </g>
//     )
//   }
// }



/**
 * Tree
 * TODO: Add Distributions
 */
export class Tree extends Component {
  constructor() {
    super()
    this.state = {
      nodeMap: {},
      nodes: [],
      links: [],
      simulation: null,
    }
  }

  static propTypes = {
    root: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      children: PropTypes.array,
    }),

    // distributionfield: PropTypes.string,
  }

  static defaultProps = {
    // distributionfield: null,
    // distributionfield: "currency",
  }


  componentWillMount = () => {
    const simulation = this._makeSimulation()
    this.setState({
      simulation,
    }, () => {
      simulation.on("tick", this._tick)
      this._update(this.props)
    })
  }


  componentWillReceiveProps = (newProps) => {
    this._update(newProps)
  }



  _update = ({ root } = this.props) => {
    const nodeMap = this._makeNodeMap(root)
    const nodes = Object.values(nodeMap)
    const links = this._makeLinks(root)

    const intermediates = this._makeIntermediates(links)
    const intermediateLinks = this._makeIntermediateLinks(intermediates)
    const simnodes = nodes.concat(intermediates)
    const simlinks = this._makeSimlinks(intermediates)


    this.setState({
      nodeMap,
      nodes,
      links: intermediateLinks,
      intermediates,
      intermediateLinks,
      simnodes,
      simlinks,
    }, () => {
      this._updateSimulation(simnodes, simlinks)
    })
  }


  _makeSimlinks = (intermediates) => {
    return _.chain(intermediates)
      .map((intermediate) => {
        const { source, target } = intermediate
        return [
          { id: `${source.id}-s-i-${target.id}`, source, target: intermediate },
          { id: `${source.id}-i-${target.id}`, source, target },
          { id: `${source.id}-i-t-${target.id}`, source: intermediate, target },
        ]
      })
      .flatten()
      .value()
  }


  _makeIntermediateLinks = (intermediates) => {
    return _.chain(intermediates)
      .map((intermediate) => {
        const { source, target } = intermediate
        return {
          id: `${source.id}-i-${target.id}`,
          source,
          target,
          intermediate,
        }
      })
      .value()
  }


  _makeIntermediates = (links) => {
    // Make an intermediate node for every link
    return _.map(links, ({ source, target }) => {
      return {
        id: `${source.id}-i-${target.id}`,
        source,
        target,
      }
    })
  }


  _tick = () => {
    this.forceUpdate()
  }


  _updateSimulation = (nodes, links) => {
    const { simulation } = this.state
    simulation.nodes(nodes)
    simulation.force("link").links(links)
    simulation.restart()
  }


  _makeSimulation = () => {
    const simulation = d3.forceSimulation()
    const alpha = 1
    const alphaDecay = 0.1
    const velocityDecay = 0.2
    const [width, height] = [1000, 1000]

    simulation
      .alpha(alpha)
      .alphaDecay(alphaDecay)
      .velocityDecay(velocityDecay)


    const chargeForce = d3.forceManyBody().strength(-150)
    const linkForce = d3.forceLink()
      .distance(60)
      .strength(0.15)
    const centerForce = d3.forceCenter(width / 2, height / 2)

    simulation
      .force("charge", chargeForce)
      .force("link", linkForce)
      .force("center", centerForce)

    return simulation
  }


  _makeLinks = (node) => {
    const links = []
    _.forEach(node.children, (child) => {
      links.push({
        id: `${node.id}-${child.id}`,
        source: node,
        target: child,
      })
    })

    const childLinks = _.chain(node.children)
      .map(this._makeLinks)
      .reduce((acc, a) => acc.concat(a), [])
      .value()
    return links.concat(childLinks)
  }


  _recursiveForEach = (node, callback) => {
    callback(node)
    _.forEach(node.children, _.partial(this._recursiveForEach, _, callback))
  }


  _makeNodeMap = (root = this.props.root) => {
    const nodeMap = {}
    this._recursiveForEach(root, (node) => nodeMap[node.id] = node)
    return nodeMap
  }



  render() {
    return (
      <SVGCanvas className={styles.container}>
        <DistributeBy nodes={this.state.nodes} links={this.state.links}>
          {renderNodes}
          {/* <renderNodes/> */}
        </DistributeBy>
      </SVGCanvas>
    )
  }


  // render() {
  //   const { nodes, links } = this.state
  //   return (
  //     <SVGCanvas className={styles.container}>
  //       <g className={styles.links}>
  //         {_.map(links, (link) => <Link key={link.id} className={styles.link} {...link} />)}
  //       </g>
  //
  //       <g className={styles.nodes}>
  //         {_.map(nodes, (node) => <Node key={node.id} className={styles.node} {...node} />)}
  //       </g>
  //     </SVGCanvas>
  //   )
  // }

}



const mapStateToProps = (state, props) => {
  const { root } = state.tree
  return {
    ...props,
    root,
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


export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Tree)
