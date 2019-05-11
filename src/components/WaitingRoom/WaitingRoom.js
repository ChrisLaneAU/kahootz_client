import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class WaitingRoom extends Component {
  constructor() {
    super();

    this.state = {
      question_id: "",
      question: "",
      answers: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3000/quizes.json").then(quizzes => {
      const question = quizzes.data[0].questions[0];
      this.setState({
        question_id: question.id,
        question: question.content,
        answers: question.answers
      });
    });
  }

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
    return (
      <>
        <h1>Waiting Room</h1>
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
