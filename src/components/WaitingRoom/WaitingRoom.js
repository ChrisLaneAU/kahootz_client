import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./WaitingRoom.scss";

import { gamesRef } from "../../config/firebase";

import { API_ROOT } from "../../constants";
import PlayersArea from "./PlayersArea/PlayersArea";
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
      players: [],
      redirect: false
    };
  }

  componentWillMount() {
    if (this.props.location.state === undefined)
      this.setState({ redirect: true });
  }

  componentDidMount() {
    const setGameListener = gamePin => {
      gamesRef.child(`${gamePin}`).on("value", snapshot => {
        this.setState({
          players: snapshot.val().players,
          next_question: snapshot.val().next_question
        });
      });
    };
    if (this.props.location.state.isAdmin) {
      console.log("isAdmin");
      const newGamePin = Math.floor(Math.random() * 100000);
      this.setState({ gamePin: newGamePin });
      gamesRef.child(`${newGamePin}`).set(
        {
          players: [""],
          questions: this.props.location.state.questions,
          gameStart: false
        },
        setGameListener(newGamePin)
      );
    } else {
      setGameListener(this.props.location.state.gamePin);
    }
    //if (this.state.redirect) return;

    // fetch(`${API_ROOT}/games`)
    //   .then(res => res.json())
    //   .then(games => this.setState({ games }))
    //   .then(() => {
    //     if (this.props.location.state.gamePin) {
    //       const { gamePin } = this.props.location.state;
    //       this._setActiveGame(gamePin);
    //     }
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
  }

  _handleStartGameClick() {
    gamesRef
      .child(`${this.props.location.state.gamePin}`)
      .update({ next_question: 1 });
  }

  renderStartGameLink() {
    const { questions, next_question, next_question_id } = this.state;

    return (
      <Link
        className="startgame_link"
        onClick={() => this._handleStartGameClick()}
        to={{
          pathname: `/game/1`,
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

  renderWaitingRoom() {
    const { isAdmin } = this.props.location.state;
    const currentGamePin = isAdmin
      ? this.state.gamePin
      : this.props.location.state.gamePin;
    return (
      <div className="display__waitingroom">
        <div className="waitroom__header">
          <h1>Waiting For Players To Join</h1>
        </div>

        <div className="display__quizcode">
          <QuizCode quiz_id={currentGamePin} />
        </div>

        {isAdmin ? this.renderStartGameLink() : <></>}
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

  render() {
    const {
      redirect,
      next_question,
      isAdmin,
      next_question_id,
      questions
    } = this.state;

    if (redirect) return <Redirect to="/" />;
    return !isAdmin && next_question ? (
      <Redirect
        to={{
          pathname: `/game/1`,
          state: {
            question_id: next_question_id,
            questions: questions
          }
        }}
      />
    ) : (
      this.renderWaitingRoom()
    );
  }
}

export default WaitingRoom;
