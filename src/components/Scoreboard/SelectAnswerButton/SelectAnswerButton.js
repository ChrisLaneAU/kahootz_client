import React from "react";
import { Link } from "react-router-dom";

const SelectAnswerButton = ({ answers }) => {
  const renderAnswers = answers.map(answer => {
    return (
      <li key={answer.id}>
        <Link to="/post-game">{answer.answer}</Link>
      </li>
    );
  });

  return (
    <>
      <p>Answers: </p>
      <ul>{renderAnswers}</ul>
    </>
  );
};

export default SelectAnswerButton;
