import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ActionCable } from "react-actioncable-provider";
import { API_ROOT } from "../../constants";
import NewGameForm from "./NewGameForm/NewGameForm";
import PlayersArea from "./PlayersArea/PlayersArea";
import Cable from "./Cable/Cable";
import Loading from "./Loading/Loading"

const GET_QUIZ_OBJ = "https://kahootz.herokuapp.com/quizzes.json"
// ACTIONCABLE



class WaitingRoom extends Component {
  constructor() {
    super();

    this.state = {
      question_id: "",
      question: "",
      answers: [],
      games: [],
      activeGame: ""
    };
  }

  componentDidMount() {
    // ACTIONCABLE
    fetch(`${API_ROOT}/games`)
      .then(res => res.json())
      .then(games => this.setState({ games }));

    axios.get(GET_QUIZ_OBJ).then(quizzes => {
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

  render() {
    // ACTIONCABLE
    const { games, activeGame } = this.state;

    return (
      <>
        <h1>Waiting Room</h1>
        <h3>-=-=-=-==-=-=ACTION CABLE START-=-=-=-==-=-=</h3>
        <ActionCable
          channel={{ channel: "GamesChannel" }}
          onReceived={this.handleReceivedGame}
        />
        {this.state.games.length ? (
          <Cable
            games={games}
            handleReceivedPlayer={this.handleReceivedPlayer}
          />
        ) : null}
        <h2>Games</h2>
        <ul>{mapGames(games, this.handleClick)}</ul>
        <NewGameForm />
        {activeGame ? (
          <PlayersArea game={findActiveGame(games, activeGame)} />
        ) : null}
        <h3>-=-=-=-==-=-=ACTION CABLE END-=-==-=-=</h3>
        {this.state.question_id === "" ? (
          
          <Loading />
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
