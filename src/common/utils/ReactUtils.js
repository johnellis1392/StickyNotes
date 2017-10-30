import React from 'react'
import _ from 'underscore'


/**
 * Recursively map over child components
 */
export const mapRecursive = (children, callback, { type = null } = {}) => {
  return React.Children.map(children, (node) => {
    let newNode

    // If type specified, only map over
    if (type) {
      if (node.type && node.type.displayName === type.displayName) {
        const nodeCopy = React.cloneElement(node)
        newNode = callback(nodeCopy)
      } else {
        newNode = node
      }
    }

    if (_.size(node.props.children) > 0) {
      return React.cloneElement(
        newNode, {},
        mapRecursive(node.props.children, callback, { type })
      )
    } else {
      return newNode
    }
  })
}


/**
 * Recursively iterate through all child components
 */
export const forEachRecursive = (children, callback, { type = null } = {}) => {
  React.Children.forEach(children, (node) => {
    if (type) {
      // If type specified, only run on given type
      if (node.type && node.type.displayName === type.displayName) {
        callback(node)
      }
    } else {
      // Run callback by default if no type specified
      callback(node)
    }

    if (_.size(node.props.children) > 0) {
      forEachRecursive(node.props.children, callback, { type })
    }
  })
}
