import React from "react";
import { Link } from "react-router-dom";

const Dashboard = props => {
  return (
    <>
      <h1>Dashboard</h1>
      <Link to="/create-quiz">Create Quiz</Link>
      <Link to="/login">Logout</Link>
    </>
  );
};

export default Dashboard;
