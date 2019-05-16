import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./WaitingRoom.scss";

import { gamesRef } from "../../config/firebase";
import _ from 'underscore'
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
          gameStart: snapshot.val().gameStart
        });
      });
    };
    if (this.props.location.state.isAdmin) {
      let newQuestions = []
      this.props.location.state.questions.map( obj => {
        let newAnswers = _.shuffle(obj.answers)
        obj.answers = newAnswers
        newQuestions.push( obj )
      })
      const newGamePin = Math.floor(Math.random() * 100000);
      this.setState({ gamePin: newGamePin });
      gamesRef.child(`${newGamePin}`).set(
        {
          players: [""],
          questions: newQuestions,
          gameStart: false
        },
        setGameListener(newGamePin)
      );
    } else {
      setGameListener(this.props.location.state.gamePin);
    }

  }

  _handleStartGameClick() {
    gamesRef
      .child(`${this.state.gamePin}`)
      .update({ gameStart: true });
  }

  renderStartGameLink() {
    const { questions, next_question, next_question_id } = this.state;

    return (
      <Link
        className="startgame_link"
        onClick={() => this._handleStartGameClick()}
        to={{
          pathname: `/game/${ this.state.gamePin }`,
          state: {
            gamePin: this.state.gamePin,
            isAdmin: this.props.location.state.isAdmin
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
      questions,
      gameStart
    } = this.state;
    if (redirect) return <Redirect to="/" />;
    return !this.props.location.state.isAdmin && gameStart ? (
      <Redirect
        to={{
          pathname: `/game/${ this.props.location.state.gamePin }`,
          state: {
            gamePin: this.props.location.state.gamePin,
            nickname: this.props.location.state.nickname,
            isAdmin: this.props.location.state.isAdmin
          }
        }}
      />
    ) : (
      this.renderWaitingRoom()
    );
  }
}

export default WaitingRoom;
