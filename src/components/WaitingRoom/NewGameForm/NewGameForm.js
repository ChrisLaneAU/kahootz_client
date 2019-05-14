import React, { Component } from "react";
import { API_ROOT, HEADERS } from "../../../constants";

class NewGameForm extends Component {
  state = {
    title: ""
  };

  handleChange = e => {
    this.setState({ title: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    // fetch(`${API_ROOT}/games`, {
    //   method: "POST",
    //   headers: HEADERS,
    //   body: JSON.stringify(this.state)
    // });
    this.props.setActiveGame(this.state.title);
    this.setState({ title: "" });
  };

  render = () => {
    return (
      <div className="newGamesForm">
        <form onSubmit={this.handleSubmit}>
          <label>Enter Pin:</label>
          <br />
          <input
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  };
}

export default NewGameForm;
