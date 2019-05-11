import React from "react";

const AskQuestions = props => {
  return (
    <>
      <h1>Game started: First Question...</h1>
      <p>Question: {props.location.state.question}</p>
      <p>Answers: {JSON.stringify(props.location.state.answers)}</p>
    </>
  );
};

export default AskQuestions;
