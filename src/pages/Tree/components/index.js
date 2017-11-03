const _ = require("underscore")

const context = require.context(".", true, /^\.\/[^/]+\/index.js$/i)
const exports = _.chain(context.keys())
  .map((key) => {
    const fileData = context(key)
    const componentName = key.match(/^\.\/([^/]+)\/index.js$/i)[1]
    return [
      componentName,
      fileData.default,
    ]
  })
  .object()
  .value()

module.exports = exports
