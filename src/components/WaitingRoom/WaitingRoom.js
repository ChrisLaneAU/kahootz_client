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
import Loading from "./Loading/Loading"
import QuizCode from "../Dashboard/QuizCode/QuizCode"

// const GET_QUIZ_OBJ = "https://kahootz.herokuapp.com/quizzes.json"
// ACTIONCABLE



class WaitingRoom extends Component {
  constructor() {
    super();

    this.state = {
      next_question_id: "",
      next_question: 0,  //relates to the index of questions
      questions: '',
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

      if ( this.props.location.state ) {
        console.log("location state questions", this.props.location.state);
        this.setState({
          questions: this.props.location.state.questions,
          next_question_id: this.props.location.state.questions[0].id
        })
      }


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
    const { questions, next_question, next_question_id } = this.state;

    return (
      <Link
        to={{
          pathname: `/game/${next_question_id}`,
          state: {
            question_id: next_question_id,
            questions: questions
          }
        }}
      >
        Start Game
      </Link>
    );
  }

  _setActiveGame(gameTitle) {
    console.log(this.state.games);
    // const game = this.state.games.find(game => game.title === gameTitle);
    // this.setState({ activeGame: game.id, activePin: gameTitle })
  }

  render() {
    // ACTIONCABLE
    const { games, activeGame, activePin } = this.state;

    return (
      <>
      <QuizCode />
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
        {this.state.questions === '' ? (

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
