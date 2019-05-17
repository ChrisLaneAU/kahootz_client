import React from "react";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import "./SelectAnswerButton.scss";

const decodeEntities = (function() {
  // this prevents any overhead from creating the object each time
  var element = document.createElement("div");

  function decodeHTMLEntities(str) {
    if (str && typeof str === "string") {
      // strip script/html tags
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, "");
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, "");
      element.innerHTML = str;
      str = element.textContent;
      element.textContent = "";
    }

    return str;
  }

  return decodeHTMLEntities;
})();

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

    const answerDecoded = decodeEntities(answer.answer);

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
            {answerDecoded}
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
