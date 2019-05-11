import React from "react";
import { Redirect } from "react-router-dom";

import Question from "./Question/Question";
import SelectAnswerButton from "./SelectAnswerButton/SelectAnswerButton";

const PlayGame = props => {
  if (!props.location.state) return <Redirect to="/" />;

  const { question_id, question, answers } = props.location.state;

  return (
    <>
      <h1>Game started: Question {question_id}...</h1>
      <Question question={question} />
      <SelectAnswerButton answers={answers} />
    </>
  );
};

export default PlayGame;
