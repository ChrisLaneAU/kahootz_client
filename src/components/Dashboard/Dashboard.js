import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./Dashboard.scss";
import axios from "axios";
import Card from "./Card/Card";

import { gamesRef } from "../../config/firebase";

const QUIZ_URL = "https://kahootz.herokuapp.com/quizzes.json";

const SERVER_URL_PUT = "https://kahootz.herokuapp.com/new_game.json";
const SERVER_URL_GET = "https://kahootz.herokuapp.com/new_game.json";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      quizzes: [],
      redirect: false
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this._handleCardClick = this._handleCardClick.bind(this);
  }

  componentDidMount() {
    axios.get(QUIZ_URL).then(quizzes => {
      this.setState({
        quizzes: quizzes.data
      });
    });
  }

  _handleCardClick(questions) {
    axios.post(SERVER_URL_PUT, { new_game: true, quiz_id: 8 }).then(results => {
      axios.get(SERVER_URL_GET).then(result => {
        gamesRef.child(result.data.id).set(
          {
            players: [""],
            questions,
            next_question: 0,
            currentQuestion: questions[0].content,
            currentAnswers: questions[0].answers.map(answer => answer.answer)
          },
          error => {
            if (error) {
              console.error(error);
            } else {
              this.setState({ redirect: true, gameId: result.data.id });
            }
          }
        );
      });
    });
  }

  renderCards() {
    return this.state.quizzes.map(quiz => {
      return (
        <div key={quiz.id}>
          <Card
            onClick={questions => this._handleCardClick(questions)}
            key={quiz.id}
            category={quiz.category}
            difficulty={quiz.difficulty}
            questions={quiz.questions}
          />
        </div>
      );
    });
  }

  render() {
    return (
      <div className="displayQuizzes">
        <div className="header">
          <h1>Select A Quiz To Play</h1>
        </div>

        {this.state.redirect ? (
          <Redirect
            to={{
              pathname: "/waiting-room",
              state: {
                gamePin: this.state.gameId,
                isAdmin: true
              }
            }}
          />
        ) : (
          <div className="displayCards">{this.renderCards()}</div>
        )}
      </div>
    );
  }
}

export default Dashboard;
