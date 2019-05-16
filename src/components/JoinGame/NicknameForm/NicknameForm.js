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
  }

  _handleNicknameInput(event) {
    this.setState({ nickname: event.target.value });
  }

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
                    history.push({
                      pathname: "/waiting-room",
                      state: {
                        gamePin: this.props.gamePin,
                        nickname: {
                          nickname: this.state.nickname,
                          points: 0,
                          answer: "",
                          entered: false,
                          score: 0,
                          correct_answers: 0,
                          streak: 0,
                          last_correct: false,
                        },
                        isAdmin: false
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
