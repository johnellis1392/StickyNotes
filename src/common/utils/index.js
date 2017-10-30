var _ = require("underscore")

const context = require.context(__dirname, true, /\.js$/)
const data = {}
_.forEach(context.keys(), (key) => {
  const fileData = context(key)
  if (fileData.default) delete fileData.default
  for (const prop in fileData) {
    data[prop] = fileData[prop]
  }
})

module.exports = data
