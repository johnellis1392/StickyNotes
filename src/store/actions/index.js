const context = require.context(".", false, /^\.\/[^.]+(?!spec)\.js$/)
let exports = {}
context.keys().forEach((key) => {
  const incl = context(key)
  exports = Object.assign(exports, incl)
})
module.exports = exports
