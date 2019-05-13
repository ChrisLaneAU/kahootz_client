import React, { Component } from "react";
import JoinGameForm from "./JoinGameForm/JoinGameForm";
import NicknameForm from "./NicknameForm/NicknameForm";

class JoinGame extends Component {
  constructor() {
    super();
    this.state = {
      pin: 0,
      nickname: ""
    };
    this._submitPin = this._submitPin.bind(this);
    this._submitNickname = this._submitNickname.bind(this);
  }

  _submitPin(pin) {
    this.setState({ pin });
  }

  _submitNickname(nickname) {
    this.setState({ nickname })
  }

  render() {
    let currentUI = "";

    if (this.state.pin) {
      currentUI = <NicknameForm submitNickname={nickname => {this._submitNickname(nickname)}} gamePin={this.state.pin} />;
    } else {
      currentUI = <JoinGameForm click={pin => {this._submitPin(pin)}} />;
    }

    return <>{currentUI}
    </>;
  }
}

export default JoinGame;
