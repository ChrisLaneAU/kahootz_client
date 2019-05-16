import React, { Component } from "react";
import { Link } from "react-router-dom";
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
    console.log("handle card click");
    //axios.post(SERVER_URL_PUT, { new_game: true, quiz_id: 8 }).then(results => {
    //axios.get(SERVER_URL_GET).then(result => {
    // gamesRef.child().set(
    //   {
    //     players: [""],
    //     questions,
    //     next_question: 0,
    //     currentQuestion: questions[0].content,
    //     currentAnswers: questions[0].answers.map(answer => answer.answer)
    //   },
    //   error => {
    //     if (error) {
    //       console.error(error);
    //     } else {
    //       this.setState({ redirect: true, gameId: result.data.id });
    //     }
    //   }
    // );
    //  });
    //});
  }

  renderCards() {
    return this.state.quizzes.map(quiz => {
      return (
        <Link
          to={{
            pathname: "/waiting-room",
            state: {
              questions: quiz.questions,
              isAdmin: true
            }
          }}
          key={quiz.id}
        >
          <Card
            key={quiz.id}
            category={quiz.category}
            difficulty={quiz.difficulty}
            questions={quiz.questions}
          />
        </Link>
      );
    });
  }

  render() {
    return (
      <div className="displayQuizzes">
        <div className="header">
          <h1>Select A Quiz To Play</h1>
        </div>

        {<div className="displayCards">{this.renderCards()}</div>}
      </div>
    );
  }
}

export default Dashboard;
