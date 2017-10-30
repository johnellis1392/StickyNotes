import React from "react"
import { Route, Switch } from "react-router"
// import { PATH } from "common/const"
import components from "./pages"


export default ( /* store */ ) => {
  return (
    <Switch>
      <Route exact path="/" /*path={PATH.HOME()}*/ component={components.App} />
      <Route path="/data">
        <Switch>
          <Route exact path="/data" render={() => <div>Data Root</div>} />
          {/* <Route exact path="/data/pages" component={components.Pages} /> */}
          <Route exact path="/data/pages" render={() => <div>Pages Root</div>}/>
        </Switch>
      </Route>
    </Switch>
  )
}
