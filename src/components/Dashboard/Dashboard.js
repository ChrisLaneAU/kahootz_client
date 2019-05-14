import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Dashboard.scss'
import axios from "axios"
import QuizCode from "./QuizCode/QuizCode";
import Card from "./Card/Card"

const QUIZ_URL = "https://kahootz.herokuapp.com/quizzes.json"

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      quizzes: []
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount() {
    axios.get(QUIZ_URL).then(quizzes => {
      this.setState({
        quizzes: quizzes.data
      });
      console.log("this is the quizzes", quizzes);
    });
  }

  renderCards() {
    return this.state.quizzes.map(quiz => {
      return (
        <Link
          key={ quiz.id }
          to={{
            pathname: '/waiting-room',
            state: {
              quiz_id: quiz.id,
              category: quiz.category,
              difficulty: quiz.difficulty,
              questions: quiz.questions,
              answers: quiz.answers
            }
          }}
        >
          <Card key={quiz.id} category={quiz.category} difficulty={quiz.difficulty} questions={quiz.questions} />

      </Link>

     
      ) 
    })
  }

  render() {
    return (

      <div className="displayQuizzes">

        <div className="header">
          <h1>Select A Quiz To Play</h1>
        </div>

        <div className="displayCards">
          {this.renderCards()}
        </div>

        
      </div>

    )

  }
}

export default Dashboard;
