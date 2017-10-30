import rootReducer from "./reducers"
import thunk from "redux-thunk"
import { createLogger } from "redux-logger"
import { createStore, applyMiddleware } from "redux"


const configureStore = (baseHistory, initialState = {}) => {
  console.log(something)
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk, createLogger()))

  if (!baseHistory) {
    // Test Environment
    return { store }
  } else if (process.env.NODE_ENV === "production") {
    // Production
    return store
  } else {
    if (module.hot) {
      module.hot.accept("./reducers", () => {
        const nextRootReducer = require("./reducers")
        store.replaceReducer(nextRootReducer)
      })
    }
    return store
  }
}


export default configureStore
