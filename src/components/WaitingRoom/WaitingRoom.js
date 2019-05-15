import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GamePin from "./GamePin/GamePin";
import "./WaitingRoom.scss";

import { gamesRef } from "../../config/firebase";

// ACTIONCABLE
import { ActionCableConsumer } from "react-actioncable-provider";
import { API_ROOT, HEADERS } from "../../constants";
import NewGameForm from "./NewGameForm/NewGameForm";
import PlayersArea from "./PlayersArea/PlayersArea";
import Cable from "./Cable/Cable";
import Loading from "./Loading/Loading";
import QuizCode from "../Dashboard/QuizCode/QuizCode";

// const GET_QUIZ_OBJ = "https://kahootz.herokuapp.com/quizzes.json"

class WaitingRoom extends Component {
  constructor() {
    super();

    this.state = {
      next_question_id: "",
      next_question: 0, //relates to the index of questions
      questions: "",
      games: [],
      activeGame: "",
      activePin: "",
      players: []
    };
  }

  componentDidMount() {
    gamesRef
      .child(`${this.props.location.state.gamePin}`)
      .on("value", snapshot => {
        this.setState({ players: snapshot.val().players });
      });
    fetch(`${API_ROOT}/games`)
      .then(res => res.json())
      .then(games => this.setState({ games }))
      .then(() => {
        if (this.props.location.state.gamePin) {
          const { gamePin, nickname } = this.props.location.state;
          this._setActiveGame(gamePin);
          // fetch(`${API_ROOT}/players`, {
          //   method: "POST",
          //   headers: HEADERS,
          //   body: JSON.stringify({ nickname, game_id: this.state.activeGame })
          // });
        }
      })
      .catch(error => {
        console.error(error);
        // this.props.history.push({
        //   pathname: "/",
        //   //state: { gamePin: this.props.gamePin, nickname: this.state.nickname }
        // });
      });

    if (this.props.location.state.questions) {
      const { questions } = this.props.location.state;
      this.setState({
        questions: questions,
        next_question_id: questions[0].id
      });
    }
  }

  renderStartGameLink() {
    const { questions, next_question, next_question_id } = this.state;

    return (
      <Link
        className="startgame_link"
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
    const game = this.state.games.find(game => game.title === gameTitle);
    this.setState({ activeGame: game.id, activePin: gameTitle });
  }

  render() {
    const { games, activeGame } = this.state;
    return (
      <div className="display__waitingroom">
        <div className="waitroom__header">
          <h1>Waiting For Players To Join</h1>
        </div>

        <div className="display__quizcode">
          <QuizCode quiz_id={this.props.location.state.gamePin} />
        </div>

        {this.props.location.state.isAdmin ? this.renderStartGameLink() : <></>}
        <div className="display__playersarea">
          <PlayersArea players={this.state.players} />
        </div>

        {/* ****TODO**** */}
        {/* KAHOOTZ BACKGROUND MUSIC <Sound
     url= './music.mp3'
     playStatus={Sound.status.PLAYING}
     playFromPosition={300}
     onLoading={this.handleSongLoading}
     onPlaying={this.handleSongPlaying}
     onFinishedPlaying={this.handleSongFinishedPlaying}
      /> */}
      </div>
    );
  }
}

export default WaitingRoom;
