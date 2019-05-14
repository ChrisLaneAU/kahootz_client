import React from "react";
import { Link } from "react-router-dom";
import Podium from "./Podium/Podium"


const PostGame = props => {
  return (
    <>
      <div className="podium__header">
          <h1>And The Winner Is...</h1>
          
        </div>
      
      <Podium />
      <Link to="/">Play Another Game</Link>
    </>
  );
};

export default PostGame;
