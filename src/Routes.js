import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import JoinGame from "./components/JoinGame/JoinGame";
import WaitingRoom from "./components/WaitingRoom/WaitingRoom";
import PlayGame from "./components/PlayGame/PlayGame";
import PostGame from "./components/PostGame/PostGame";

const Routes = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={JoinGame} />
        <Route
          exact
          path="/waiting-room"
          render={props => <WaitingRoom {...props} />}
        />
        <Route
          exact
          path="/game/:id"
          render={props => <PlayGame {...props} />}
        />
        <Route
          exact
          path="/post-game"
          render={props => <PostGame {...props} />}
        />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </div>
  </Router>
);

export default Routes;
