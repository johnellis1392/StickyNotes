import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { createBrowserHistory } from "history"
import { IntlProvider } from "react-intl"
import { Layout } from "pages"

import configureStore from "store"
import getRoutes from "routes"
import * as i18n from "./i18n"
import "jquery"
import "bootstrap"
import "bootstrap/dist/css/bootstrap.css"
import "base.scss"


// Set initial redux state
import data from "./data"
window.__INITIAL_STATE__ = data


const browserHistoryConfig = {}
const store = configureStore(createBrowserHistory(browserHistoryConfig), window.__INITIAL_STATE__)


// import Piano from "./common/components/examples/Piano/Piano"
ReactDOM.render(
  <IntlProvider locale="en" messages={i18n.en_us}>
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          {getRoutes(store)}
          {/* <Piano /> */}
        </Layout>
      </BrowserRouter>
    </Provider>
  </IntlProvider>,
  document.getElementById("root")
  // document.getElementsByTagName("body")[0]
  // document.body
)
