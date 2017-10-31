import React from "react"
import { Route, Switch } from "react-router"
// import { PATH } from "common/const"
import components from "./pages"


// Need:
// * Dashbaord
// * Board list
// * Board editor
// * Settings

export default ( /* store */ ) => {
  return (
    <Switch>
      <Route exact path="/" /*path={PATH.HOME()}*/ component={components.App} />
      <Route path="/boards">
        <Switch>
          <Route exact path="/boards" component={components.Boards} />
          <Route exact path="/boards/:boardId" component={components.BoardEditor} />
        </Switch>
      </Route>

      {/* <Route path="/data">
        <Switch>
          <Route exact path="/data" render={() => <div>Data Root</div>} />
          <Route exact path="/data/pages" component={components.Pages} />
          <Route exact path="/data/pages" render={() => <div>Pages Root</div>}/>
        </Switch>
      </Route> */}
    </Switch>
  )
}
