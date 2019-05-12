import React from "react";
import "./Question.scss"
const Question = ({ question }) => {
  return(

    <div className = "question">
    <p>{question}</p>
    </div>
  ) 
};

export default Question;
