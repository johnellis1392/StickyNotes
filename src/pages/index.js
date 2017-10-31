import _ from "underscore"
const context = require.context(".", true, /\.\/[^/]+\/index.js$/)
const exports = _.chain(context.keys())
  .map((key) => {
    const componentName = key.match(/\.\/(.+)\/index.js$/i)[1]
    return [
      componentName,
      context(key).default
    ]
  })
  .object()
  .value()

module.exports = exports
