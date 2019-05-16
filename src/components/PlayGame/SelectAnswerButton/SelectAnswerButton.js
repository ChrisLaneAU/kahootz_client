import React from "react";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import "./SelectAnswerButton.scss";

const SelectAnswerButton = props => {
  const answersLet = ["a", "b", "c", "d"];
  const renderAnswers = props.answers.map((answer, index) => {
    const showCorrectAnswer =
      props.isScoreboard && answer.correct ? (
        <>
          <span> </span>
          <FontAwesomeIcon icon="check-circle" />
        </>
      ) : (
        <></>
      );
    return (
      <>
        <div
          className="answerbutton answerbutton__answertext"
          onClick={() => props.getAnswer(answersLet[index], answer.correct)}
        >
          <div
            className="answerbutton__answer"
            key={answersLet[index]}
            value={answersLet[index]}
          >
            {answer.answer}
            {showCorrectAnswer}
          </div>
        </div>
      </>
    );
  });

  return (
    <>
      <div className="display">{renderAnswers}</div>
    </>
  );
};

export default SelectAnswerButton;
