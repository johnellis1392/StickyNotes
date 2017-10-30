import { reducer as notifications } from "react-notification-system-redux"
import { combineReducers } from "redux"
import _ from "underscore"


const context = require.context(".", true, /^\.\/[^.]+(?!spec)\.js$/)
const reducers = {
  children: {},
  items: {
    notifications,
  },
}


_.forEach(context.keys(), (key) => {
  const incl = context(key)
  const pathParts = key.split("/").slice(1)
  let exportObj = reducers

  for (let i = 0; i < pathParts.length - 1; i++) {
    let child = exportObj.children[pathParts[i]]
    if (!child) {
      child = {
        name: pathParts[i],
        children: {},
        items: {},
      }

      exportObj.children[pathParts[i]] = child
    }

    exportObj = child
  }

  if (incl.default) {
    const componentName = key.match(/([^/]+)\.js$/i)[1]
    exportObj.items[componentName] = incl.default
  }
})



const buildReducer = (obj) => {
  const childReducers = _.chain(obj.children)
    .map((val, key) => [key, buildReducer(val)])
    .object()
    .value()
  return combineReducers({ ...obj.items, ...childReducers })
}


const rootReducer = buildReducer(reducers)
export default rootReducer
