import * as enzyme from "enzyme"
import * as chai from "chai"
import configureStore from "store"
import * as router from "react-router"
import deepFreeze from "deep-freeze"
import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import deepCopy from "deepcopy"

const middlewares = [
  thunk
]


const mockStoreCreator = configureMockStore(middlewares)

let sinonCore
let inBrowser = false
try {
  sinonCore = require("sinon/pkg/sinon")
  inBrowser = true
} catch (e) {
  sinonCore = require("sinon")
  global.localStorage = {
    setItem: () => {},
    getItem: () => {},
    clear: () => {},
    removeItem: () => {},
  }
}


const sinonChai = require("sinon-chai")
chai.use(sinonChai)


let sinon = sinonCore.sandbox.create()
let store

const globalBeforeEach = () => {
  store = null
  router.browserHistory = {
    push: () => {},
    goBack: () => {},
    replace: () => {},
    go: () => {},
  }

  let originalErr = console.error // eslint-disable-line
  console.error = console.warn = function (arg) { // eslint-disable-line
    if ((/Failed\sprop\stype/i).test(arg)) {
      throw new Error(arg)
    } else if (inBrowser) {
      originalErr(arg)
    }
  }
}


const globalAfterEach = () => {
  sinon.restore()
}

const getMockStore = (initialState = {}) => {
  return mockStoreCreator(initialState)
}

const getStore = () => {
  if (!store) {
    store = configureStore(null, {}).store
  }
  return store
}


const testUtils = {
  ...enzyme,
  ...chai,
  sinon,
  getStore,
  globalBeforeEach,
  globalAfterEach,
  deepFreeze,
  deepCopy,
  getMockStore,
}

module.exports = testUtils
