import React, { Component } from "react";
import NewPlayerForm from "../NewPlayerForm/NewPlayerForm";
import "./PlayersArea.scss";

class PlayersArea extends Component {
  renderPlayer() {
    const listPlayers = this.props.players.map(player => <li>{player}</li>);
    return listPlayers;
  }

  render() {
    return (
      <div className="playerArea">
        <ul>{this.renderPlayer()}</ul>
      </div>
    );
  }
}

export default PlayersArea;
