import React, { Component } from "react";
import JoinGameForm from "./JoinGameForm/JoinGameForm";
import NicknameForm from "./NicknameForm/NicknameForm";

import { databaseRef } from "../../config/firebase";

class JoinGame extends Component {
  constructor() {
    super();
    this.state = {
      pin: 0,
      nickname: "",
      players: []
    };
    this._submitPin = this._submitPin.bind(this);
    this._submitNickname = this._submitNickname.bind(this);
  }

  _submitPin(pin) {
    databaseRef.child(`games/${pin}`).on("value", snapshot => {
      if (snapshot.val() === null) return;
      this.setState({ pin, players: snapshot.val().players });
    });
  }

  _submitNickname(nickname) {
    this.setState({ nickname });
    databaseRef.child(`games/${this.state.pin}`).update({
      players: [...this.state.players, nickname]
    });
  }

  render() {
    let currentUI = "";

    if (this.state.pin) {
      currentUI = (
        <NicknameForm
          submitNickname={nickname => {
            this._submitNickname(nickname);
          }}
          gamePin={this.state.pin}
        />
      );
    } else {
      currentUI = (
        <JoinGameForm
          click={pin => {
            this._submitPin(pin);
          }}
        />
      );
    }

    return <>{currentUI}</>;
  }
}

export default JoinGame;
