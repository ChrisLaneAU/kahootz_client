import React, { Component } from "react";
import "./NicknameForm.scss";
import Button from "../../sharedUI/Button/Button";
import Input from "../../sharedUI/Input/Input";
import { Route } from "react-router-dom";

class NicknameForm extends Component {
  constructor() {
    super();
    this.state = {
      nickname: ""
    };
    this._handleNicknameInput = this._handleNicknameInput.bind(this);
    //this._handleNicknameSubmit = this._handleNicknameSubmit.bind(this);
  }

  _handleNicknameInput(event) {
    this.setState({ nickname: event.target.value });
    console.log(event.target.value);
  }

  // _handleNicknameSubmit(event) {
  //   event.preventDefault();
  //
  //   console.log(`Nickname Submitted - ${this.state.nickname} is JOINING GAME`);
  // }

  render() {
    return (
      <>
        <div className="nickname">
          <form className="nickname__form">
            <h1>Enter Your Nickname</h1>
            <Input
              type="text"
              class="input"
              onChange={this._handleNicknameInput}
              value={this.state.nickname}
            />
            <Route
              render={({ history }) => (
                <Button
                  type="button"
                  onClick={event => {
                    event.preventDefault();
                    this.props.submitNickname(this.state.nickname);
                    //history.push("/waiting-room", this.props.gamePin);
                    history.push({
                      pathname: "/waiting-room",
                      state: {
                        gamePin: this.props.gamePin,
                        nickname: this.state.nickname
                      }
                    });
                  }}
                  text="Start Game"
                />
              )}
            />
          </form>
        </div>
      </>
    );
  }
}

export default NicknameForm;
