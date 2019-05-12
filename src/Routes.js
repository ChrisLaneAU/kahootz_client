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

import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateQuiz from "./components/CreateQuiz/CreateQuiz";
import Scoreboard from "./components/Scoreboard/Scoreboard";

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
          path="/game/:id/scoreboard"
          render={props => <Scoreboard {...props} />}
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
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route
          exact path="/dashboard"
          render={props => <Dashboard {...props} />}
        />
        <Route exact path="/create-quiz" component={CreateQuiz} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </div>
  </Router>
);

export default Routes;
