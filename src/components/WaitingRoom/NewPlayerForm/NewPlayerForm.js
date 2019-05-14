import React, { Component } from "react";
import { API_ROOT, HEADERS } from "../../../constants";

class NewPlayerForm extends Component {
  state = {
    nickname: "",
    game_id: this.props.game_id
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ game_id: nextProps.game_id });
  };

  handleChange = e => {
    this.setState({ nickname: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    fetch(`${API_ROOT}/players`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(this.state)
    });
    this.setState({ nickname: "" });
  };

  render = () => {
    return (
      <div className="newPlayerForm">
        <form onSubmit={this.handleSubmit}>
          <label>Enter Nickname:</label>
          <br />
          <input
            type="text"
            value={this.state.nickname}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  };
}

export default NewPlayerForm;
