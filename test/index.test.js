import { beforeEach, afterEach, describe } from "mocha"


if (typeof document === "undefined") {
  const jsdom = require("jsdom")
  //Setup the jsdom environment
  global.document = jsdom.jsdom("<!doctype html><html><body></body></html>")
  global.window = document.defaultView
  global.navigator = global.window.navigator
  global.Node = window.Node
  global.fetch = () => {}
  console.debug = () => {} // eslint-disable-line
}

var Promise = require("bluebird")
Promise.config({
  longStackTraces: false,
  warnings: false
})

const deepFreeze = require("deep-freeze")
const reducerUtils = require("common/utils/createReducer")
// this override needs to be at the very top!
reducerUtils.createReducer_orig = reducerUtils.createReducer
reducerUtils.createReducer = (initialState, reducerMap) => {
  return (state = initialState, action) => {

    if (typeof reducerMap[undefined] === "function") { // eslint-disable-line
      throw new Error("REDUCER CREATED WTIH UNDEFINED ACTION!")
    }

    const reducer = reducerMap[action.type]
    return reducer ?
      reducer(deepFreeze(state), action.payload) :
      deepFreeze(state)
  }
}
if (typeof btoa === "undefined") {
  let Buffer = require("buffer").Buffer
  global.btoa = function (str) {
    return new Buffer(str).toString("base64")
  }
}

if (typeof atob === "undefined") {
  let Buffer = require("buffer").Buffer
  global.atob = function (b64Encoded) {
    return new Buffer(b64Encoded, "base64").toString()
  }
}

const testUtils = require("./test/testUtils")
const context = require.context("./src", true, /.+\.spec\.js$/)

let map = { key: "", files: [], sub: {} }

context.keys().forEach(function (key) {
  var components = key.split("/")
  components.shift() // knock off the first . directory
  components.unshift("src")
  var m = map
  for (let i = 0; i < components.length - 1; i++) {
    var k = components[i]
    if (!m.sub[k]) {
      m.sub[k] = { key: k, files: [], sub: {} }
    }
    m = m.sub[k]
  }
  m.files.push(key)
})

if (typeof document !== "undefined") {
  document.body.className = "inTest"
}

beforeEach(function () {
  testUtils.globalBeforeEach()
})

afterEach(function () {
  testUtils.globalAfterEach()
})

let recurseAddFiles = function (m) {
  if (m.key) {
    describe(m.key, function () {
      m.files.forEach(function (include) {
        describe(include.match(/([^/]+)\.spec\.js$/i)[1] + ".js", function () {
          context(include)
        })
      })
      Object.values(m.sub).forEach(recurseAddFiles)
    })

  } else {
    m.files.forEach(function (include) {
      describe(include.match(/([^/]+)\.spec\.js$/i)[1] + ".js", function () {
        context(include)
      })
    })
    Object.values(m.sub).forEach(recurseAddFiles)
  }
}

recurseAddFiles(map)

try {
  const sourceContext = require.context("./src", true, /^((?!\.spec\.).)*\.js$/i)
  sourceContext.keys().forEach((file) => {
    // require all source so we get true code coverage metrics
    if (file.indexOf("index.js") === -1) {
      try {
        sourceContext(file)
      } catch (e) {
        /* ... */
      }
    }
  })
} catch (e) {
  /* ... */
}

module.exports = context
