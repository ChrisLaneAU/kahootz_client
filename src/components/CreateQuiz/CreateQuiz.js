import React from "react";
import { Link } from "react-router-dom";

const CreateQuiz = props => {
  return (
    <>
      <h1>Create a Quiz</h1>
      <Link to="/dashboard">Create</Link>
    </>
  );
};

export default CreateQuiz;
