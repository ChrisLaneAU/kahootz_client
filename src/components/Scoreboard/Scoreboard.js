import React, { Component } from "react";
import {Redirect} from 'react-router-dom'
import Question from "../PlayGame/Question/Question";
import AnswerGraph from "./AnswerGraph/AnswerGraph";
import SelectAnswerButton from "../PlayGame/SelectAnswerButton/SelectAnswerButton";
import axios from "axios";
import _ from "underscore";

const GAME_URL = "https://kahootz.herokuapp.com/games/"; // needs an id on the end ( we will get this info when making a post request and getting a game number back some how )

class Scoreboard extends Component {
  constructor() {
    super();
    this.state = {
      answers: {}
    };
  }

  componentDidMount() {
    this.getPlayerData();
  }

  getPlayerData() {
    axios.get(GAME_URL + "1.json").then(results => {
      // gets the players answers into an array
      const answers_arr = _.pluck(results.data.players, "answer");
      // converts the array into an object like {a:1, b:4 etc}
      const count = _.countBy(answers_arr, l => {
        return l;
      });

      this.setState({ answers: count });
    });
  }

  render() {
    //if (!this.props.location.state) return <Redirect to="/" />;
    const { question_id, question, answers } = this.props.location.state;
    return (
      <>
        <h1>Game started: Question {question_id}...</h1>
        <Question question={question} />
        <AnswerGraph answers={this.state.answers} />
        <SelectAnswerButton answers={answers} />
      </>
    );
  }
}

export default Scoreboard;

// const Scoreboard =  props  => {
//   const [gameAnswers, setGameAnswers] = useState('')

//   useEffect(() => {

//     console.log('THIS IS RUNNING');
//     console.log('STATE IS BEFORE: ', gameAnswers);
//     // console.log(gameAnswers);
//     axios.get(GAME_URL+'1.json').then( (results) => {
//       console.log(results.data.players);
//       const answers_arr = _.pluck(results.data.players, 'answer');

//       const count = _.countBy(answers_arr, ( l ) => {
//         return l
//       })

//       setGameAnswers( count )
//       // console.log(gameAnswers);
//       })
//     console.log('STATE IS AFTER: ', gameAnswers);

//   },[])

//   if (!props.location.state) return <Redirect to="/" />;

//   const { question_id, question, answers } = props.location.state;

//   return(

//   );
// }

// export default Scoreboard;
