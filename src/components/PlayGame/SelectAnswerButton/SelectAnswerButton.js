import React from "react";
import { Link } from "react-router-dom";
import "./SelectAnswerButton.scss"

const SelectAnswerButton = ({ answers }) => {

  const renderAnswers = answers.map(answer => {
    return (
    <>
      <Link className="answerbutton answerbutton__answertext" to="">
          <div className="answerbutton__answer" key={answer.id}>
            {answer.answer}
          </div>
      </Link>    
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
