import React from "react";
import { Link } from "react-router-dom";
import Podium from "./Podium/Podium"


const PostGame = props => {
  return (
    <>
      <div className="header">
          <h1>A The Winner Is...</h1>
          <Link to="/">Play Another Game</Link>
        </div>
      
      <Podium />
    </>
  );
};

export default PostGame;
