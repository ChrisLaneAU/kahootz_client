import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Timer from "./Timer/Timer";
import Question from "./Question/Question";
import SelectAnswerButton from "./SelectAnswerButton/SelectAnswerButton";

const PlayGame = props => {
  const [count, setCount] = useState(20);
  const { question_id, question } = props.location.state;


  if (!props.location.state) return <Redirect to="/" />;
  if (count === 0) return <Redirect to={`game/${question_id}/scoreboard`} />


  return (
    <>
      <h1>Question {question_id}...</h1>

      <Question question={question.content} />
      <Timer state={ props.location.state } adjustCount={setCount} startCount = '20' />
      <SelectAnswerButton answers={question.answers} />
    </>
  );
};

export default PlayGame;
