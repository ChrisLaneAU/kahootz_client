import React, { Component } from "react";
import Question from "../PlayGame/Question/Question";
import AnswerGraph from "./AnswerGraph/AnswerGraph";
import SelectAnswerButton from "../PlayGame/SelectAnswerButton/SelectAnswerButton";
import axios from "axios";
import _ from "underscore";
import { gamesRef } from "../../config/firebase";

class Scoreboard extends Component {
  constructor() {
    super();
    this.state = {
      answers: {}
    };
    this.getPlayerData = this.getPlayerData.bind(this);
  }

  componentDidMount() {
    this.getPlayerData();
  }

  getPlayerData() {
    
    const game_pin = this.props.game_pin;
    const gameRef = gamesRef.child(game_pin);

    gameRef.once("value", results => {
      // gets the players answers into an array
      const answers_arr = _.pluck(results.val().players, "answer");
      // converts the array into an object like {a:1, b:4 etc}
      const count = _.countBy(answers_arr, l => {
        return l;
      });

      this.setState({ answers: count });
    });
  }

  render() {
    const game_pin = this.props.game_pin;
    const gameRef = gamesRef.child(game_pin);
    gameRef.child('go_to_scoreboard').set(true)

    // gamesRef.on('value', snapshot => {
    //   console.log('snapshot.val().newTimer', snapshot.val().newTimer);
    //   if (snapshot.val().newTimer === 20) {
    //     this.props.resetTimer(20);
    //     this.props.resetQ( this.props.question_number + 1 )
    //     this.props.resetAnswered( false )
    //     gameRef.child('newTimer').set(false)
    //   }
    // })
    //if (!this.props.location.state) return <Redirect to="/" />;
    const {
      question,
      answers,
      question_number,
      next_question_nav
    } = this.props;
    return (
      <>
        <h1>Question {question_number} Results...</h1>
        <Question question={question} />
        {localStorage.getItem("jwt") ? (
          <button onClick={next_question_nav} className="skip-link">
            NEXT
          </button>
        ) : (
          ""
        )}
        <AnswerGraph answers={this.state.answers} />
        <SelectAnswerButton getAnswer={ this.props.getAnswer } answers={answers} />
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
