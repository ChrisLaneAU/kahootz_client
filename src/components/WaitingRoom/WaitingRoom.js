import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GamePin from "./GamePin/GamePin";

// ACTIONCABLE
import { ActionCableConsumer } from "react-actioncable-provider";
import { API_ROOT, HEADERS } from "../../constants";
import NewGameForm from "./NewGameForm/NewGameForm";
import PlayersArea from "./PlayersArea/PlayersArea";
import Cable from "./Cable/Cable";

class WaitingRoom extends Component {
  constructor() {
    super();

    this.state = {
      question_id: "",
      question: "",
      answers: [],
      games: [],
      activeGame: "",
      activePin: ""
    };
  }

  componentDidMount() {
    // ACTIONCABLE
    fetch(`${API_ROOT}/games`)
      .then(res => res.json())
      .then(games => this.setState({ games }))
      .then(() => {
        if (this.props.location.state.gamePin) {
          const { gamePin, nickname } = this.props.location.state;
          this._setActiveGame(gamePin);
          fetch(`${API_ROOT}/players`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify({ nickname, game_id: this.state.activeGame})
          });
        };
      });

    axios.get("http://localhost:3000/quizzes.json").then(quizzes => {
      const question = quizzes.data[0].questions[0];
      this.setState({
        question_id: question.id,
        question: question.content,
        answers: question.answers
      });
    });


  }

  // ACTIONCABLE
  handleReceivedGame = response => {
    const { game } = response;
    this.setState({
      games: [...this.state.games, game]
    });
  };

  handleReceivedPlayer = response => {
    const { player } = response;
    const games = [...this.state.games];
    const game = games.find(game => game.id === player.game_id);
    game.players = [...game.players, player];
    this.setState({ games });
  };

  handleClick = id => {
    this.setState({ activeGame: id });
  };

  renderStartGameLink() {
    const { question_id, question, answers } = this.state;

    return (
      <Link
        to={{
          pathname: `/game/${question_id}`,
          state: {
            question_id: question_id,
            question: question,
            answers: answers
          }
        }}
      >
        Start Game
      </Link>
    );
  }

  _setActiveGame(gameTitle) {
    const game = this.state.games.find(game => game.title === gameTitle);
    this.setState({ activeGame: game.id, activePin: gameTitle })
  }

  render() {
    // ACTIONCABLE
    const { games, activeGame, activePin } = this.state;

    return (
      <>
        <h1>Waiting Room</h1>
        <GamePin gamePin={activePin}/>
        <ActionCableConsumer
          channel={{ channel: "GamesChannel" }}
          onReceived={this.handleReceivedGame}
        />
        {this.state.games.length ? (
          <Cable
            games={games}
            handleReceivedPlayer={this.handleReceivedPlayer}
          />
        ) : null}
        {/*<h2>Games</h2>
        <ul>{mapGames(games, this.handleClick)}</ul>
        <NewGameForm setActiveGame={(gameTitle) => {this._setActiveGame(gameTitle)}} />*/}
        {activeGame ? (
          <PlayersArea game={findActiveGame(games, activeGame)} />
        ) : null}
        {this.state.question_id === "" ? (
          <p>Loading...</p>
        ) : (
          this.renderStartGameLink()
        )}
        <p>{JSON.stringify(this.state.quiz)}</p>
      </>
    );
  }
}

export default WaitingRoom;

// ACTIONCABLE HELPERS

const findActiveGame = (games, activeGame) => {
  return games.find(game => game.id === activeGame);
};

const mapGames = (games, handleClick) => {
  return games.map(game => {
    return (
      <li key={game.id} onClick={() => handleClick(game.id)}>
        {game.title}
      </li>
    );
  });
};
