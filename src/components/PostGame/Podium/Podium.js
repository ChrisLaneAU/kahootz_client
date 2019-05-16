import React, { Component } from "react";
import { gamesRef } from "../../../config/firebase";
import "./Podium.scss";

class Podium extends Component {
  constructor() {
    super();

    this.state = {
      players: []
    };
  }

  componentDidMount() {
    gamesRef.child(`${this.props.gamePin}/players`).once("value", snapshot => {
      this.setState({
        players: Object.values(snapshot.val())
          .sort((a, b) => a.score - b.score)
          .reverse()
      });
    });
  }

  renderPodium() {
    const { players } = this.state;
    return (
      <div className="display">
        <div className="podium">
          <div className="podium__second">
            <div className="podium__second--player">
              {players[1].nickname} ({players[1].score} points)
            </div>
            <div className="podium__second--place">
              <p>2nd</p>
            </div>
          </div>
          <div className="podium__first">
            <div className="podium__first--player">
              {players[0].nickname} ({players[0].score} points)
            </div>
            <div className="podium__first--place">
              <p>1st</p>
            </div>
          </div>
          <div className="podium__third">
            <div className="podium__third--player">
              {players[2].nickname} ({players[2].score} points)
            </div>
            <div className="podium__third--place">
              <p>3rd</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return this.state.players.length > 0 ? this.renderPodium() : <></>;
  }
}

export default Podium;
