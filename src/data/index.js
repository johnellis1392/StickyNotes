import _ from "underscore"

const context = require.context(".", true, /\.\/[^.]+\.json$/)

// TODO: Adapt this to nested folders?
const exports = _.chain(context.keys())
  .map((key) => {
    const fileData = context(key)
    const name = key.match(/^\.\/(.+)\.json$/i)[1]
    return [
      name,
      fileData
    ]
  })
  .object()
  .value()

export default exports
