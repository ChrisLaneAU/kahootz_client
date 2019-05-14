import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Timer from "./Timer/Timer";
import Question from "./Question/Question";
import SelectAnswerButton from "./SelectAnswerButton/SelectAnswerButton";
import Scoreboard from "../Scoreboard/Scoreboard";

const PlayGame = props => {
  const [count, setCount] = useState( 12000 ); //timer count
  const [ questionCount, setQuestionCount ] = useState( 1 )
  const [ gameEnded, setGameEnded ] = useState( false ) // question count
  const question_object = props.location.state.questions

  if (!props.location.state) return <Redirect to="/" />;
  console.log( questionCount );

  const nextQuestion = () => {
    if ( questionCount === 10 ){
      setGameEnded( true  ) /// change to 
    } else {
      setCount(20);
      setQuestionCount(questionCount + 1);
    }
  }

  const skipQuestion = () => {
    setCount( 0 );
  }

  if ( count > 0 ){
    return (
      <>
        <h1>Question { questionCount } of 10</h1>

        <Question question={question_object[ questionCount - 1 ].content} />
        <Timer skip_question={ skipQuestion } state={props.location.state} adjustCount={setCount} count={ count } />
        <SelectAnswerButton answers={question_object[ questionCount - 1 ].answers} />

      </>
    )
  } else if ( gameEnded === true ) {
      return (
        <Redirect to="/post-game" />  
      )
    }
  
    else {
    return (
    <>
        <Scoreboard 
            question_id={props.location.next_question_id} 
            question={question_object[questionCount - 1].content} 
            answers={question_object[questionCount - 1].answers} 
            question_number={ questionCount }
            next_question_nav={ nextQuestion }
            />
    </>
    )
  } 
};

export default PlayGame;
