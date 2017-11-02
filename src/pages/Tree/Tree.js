import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as d3 from "d3"
import _ from "underscore"

import { SVGCanvas } from "common/components"
import styles from "./Tree.scss"



// Render tree node
const radius = 11
const [centerX, centerY] = [500, 500]
export const Node = ({ name, x = centerX, y = centerY }) => {
  const props = {
    className: styles.node,
    transform: `translate(${[x, y]})`,
  }

  return (
    <g {...props}>
      <circle r={radius}>
        <title>{name}</title>
      </circle>
      <text dy="17">{name}</text>
    </g>
  )
}


const positionLink = ({ source, target, intermediate = null }) => {
  const transform = d3.zoomIdentity

  const src = transform.apply([source.x, source.y])
  const dst = transform.apply([target.x, target.y])
  const mid = intermediate ? transform.apply([intermediate.x, intermediate.y]) : null

  const m = `M ${src[0]}, ${src[1]}`
  const s = mid ? ` Q ${mid[0]}, ${mid[1]}` : ""
  const l = ` ${dst[0]}, ${dst[1]}`

  return m + s + l
}

export const Link = (link) => {
  const props = {
    className: styles.link,
    d: positionLink(link),
  }

  return (
    <path {...props} />
  )
}



/**
 * Tree
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
  }

  static defaultProps = {}


  componentWillMount = () => {
    const { root } = this.props
    const nodeMap = this._makeNodeMap(root)
    const nodes = Object.values(nodeMap)
    const links = this._makeLinks(root)
    const simulation = this._makeSimulation()
    simulation.on("tick", this._tick)
    this.setState({
      nodeMap,
      nodes,
      links,
      simulation,
    }, () => {
      this._updateSimulation(nodes, links)
    })
  }


  componentWillReceiveProps = (newProps) => {
    const { root } = newProps
    const nodeMap = this._makeNodeMap(root)
    const nodes = Object.values(nodeMap)
    const links = this._makeLinks(root)
    this.setState({
      nodeMap,
      nodes,
      links,
    }, () => {
      this._updateSimulation(nodes, links)
    })
  }


  _tick = () => {
    // TODO: Update node positions
    // Is this necessary?

    // const { links, nodes } = this.state // eslint-disable-line
    // debugger // eslint-disable-line
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

    // const childLinks = _.map(node.children, this._makeLinks)
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
    const { nodes, links } = this.state
    return (
      <SVGCanvas className={styles.container}>
        {_.map(nodes, (node) => <Node key={node.id} {...node} />)}
        {_.map(links, (link) => <Link key={link.id} {...link} />)}
      </SVGCanvas>
    )
  }
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
