import React, { useState, useEffect } from "react";
import "./QuizCode.scss";

const QuizCode = props => {
  let [gameNum, setGameNum] = useState(0);

  useEffect(() => {
    setGameNum(props.quiz_id);
  });

  return (
    <div className="quizcode">
      <h1>QuizCode: {gameNum} </h1>
    </div>
  );
};

export default QuizCode;
