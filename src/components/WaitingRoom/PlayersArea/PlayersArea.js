import React, { Component } from "react";
import "./PlayersArea.scss";

class PlayersArea extends Component {
  renderPlayer() {
    const listPlayers = Object.keys(this.props.players || []).map(player => (
      <li key={player}>{player}</li>
    ));
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
