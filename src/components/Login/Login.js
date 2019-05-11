import React from "react";
import { Link } from "react-router-dom";

const Login = props => {
  return (
    <>
      <h1>Login To Create a Quiz</h1>
      <Link to="/signup">Sign Up</Link>
      <Link to="/dashboard">Log In</Link>
    </>
  );
};

export default Login;
