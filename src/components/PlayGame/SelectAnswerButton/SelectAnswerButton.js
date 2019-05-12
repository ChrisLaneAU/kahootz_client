import React from "react";
import { Link } from "react-router-dom";
import "./SelectAnswerButton.scss"
const SelectAnswerButton = ({ answers }) => {
  const renderAnswers = answers.map(answer => {
    return (
      
      <div className ="answerbutton">
      <div className="answerbutton__answer" key={answer.id}>
        <Link className="answerbutton__answer-1" to="/post-game">{answer.answer}</Link>
      </div>
      </div>
 
          );
  });

  return (
    <>
    <div className = "display">
      <div>{renderAnswers}</div>
      </div>
    </>
  );
};

export default SelectAnswerButton;
