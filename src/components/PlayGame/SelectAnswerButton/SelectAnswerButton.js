import React from "react";
import { Link } from "react-router-dom";
import "./SelectAnswerButton.scss"

const SelectAnswerButton = ( props ) => {
  const answersLet = ['a','b','c','d']
  const renderAnswers = props.answers.map((answer, index)=> {
    return (
    <>
      <div className="answerbutton answerbutton__answertext" to="">
          <div className="answerbutton__answer" key={answersLet[index]}
            value={answersLet[index]} onClick={ }>
            {answer.answer}
          </div>
      </div>    
    </>   
)
  }
  )
    

  return (
    <>
    <div className = "display">
      {renderAnswers}
      </div>
    </>
  );
};

export default SelectAnswerButton;
