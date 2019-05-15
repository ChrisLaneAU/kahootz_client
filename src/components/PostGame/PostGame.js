import React from "react";
import { Link } from "react-router-dom";
import "./PostGame.scss"
import Podium from "./Podium/Podium"


const PostGame = props => {
  return (
    <>
      <div className="podium__header">
          <h1>And The Winner Is...</h1>
          <Link className="playagain_button" to="/">Play Another Game</Link>
        </div>
        
      <Podium />
      
    </>
  );
};

export default PostGame;
