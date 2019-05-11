import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import JoinGame from "./components/JoinGame/JoinGame";
import WaitingRoom from "./components/WaitingRoom/WaitingRoom";
import AskQuestions from "./components/AskQuestions/AskQuestions";

const Routes = (
  <Router>
    <div>
      <Route exact path="/" component={JoinGame} />
      <Route exact path="/waiting-room" component={WaitingRoom} />
      <Route
        exact
        path="/game/:id"
        render={props => <AskQuestions {...props} />}
      />
    </div>
  </Router>
);

export default Routes;
