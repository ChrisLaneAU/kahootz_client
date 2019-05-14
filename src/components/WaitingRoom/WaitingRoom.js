import React, { Component } from "react";
import { Link } from "react-router-dom";
import './WaitingRoom.scss'
import axios from "axios";
import { ActionCableConsumer } from "react-actioncable-provider";
import { API_ROOT } from "../../constants";
import NewGameForm from "./NewGameForm/NewGameForm";
import PlayersArea from "./PlayersArea/PlayersArea";
import Cable from "./Cable/Cable";
import Loading from "./Loading/Loading"
import Sound from 'react-sound';
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
      activeGame: ""
    };
  }

  componentDidMount() {
    // ACTIONCABLE
    fetch(`${API_ROOT}/games`)
      .then(res => res.json())
      .then(games => this.setState({ games }));

    if (this.props.location.state) {
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

  render() {
    // ACTIONCABLE
    const { games, activeGame } = this.state;

    return (

      <div className="display__waitingroom">
        
        <div className="waitroom__header">
          <h1>Waiting For Players To Join</h1>
        </div>
        
        <div className="display__quizcode">
          <QuizCode /*{quiz_id={this.props.location.state.quiz_id} *//>
        </div>

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


{this.state.questions === '' ? (

<Loading />
) : (
  this.renderStartGameLink()
)}
        <PlayersArea />

        {/* <ul>{mapGames(games, this.handleClick)}</ul>
      
        {activeGame ? (
          <PlayersArea game={findActiveGame(games, activeGame)} />
        ) : null} */}

        


        <p>{JSON.stringify(this.state.quiz)}</p>




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
