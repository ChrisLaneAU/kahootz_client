import React from "react";
import { Link } from "react-router-dom";
import "./PostGame.scss";
import Podium from "./Podium/Podium";
import { gamesRef } from "../../config/firebase";
import _ from "underscore";

const PostGame = props => {
  const gamePin = props.location.state.pin;
  const gameRef = gamesRef.child(gamePin);
  let first = "";
  let second = "";
  let third = "";

  gameRef.once("value", snapshot => {
    let players = snapshot.val().players;
    players = Object.values(players);
    let playersSorted = _.sortBy(players, "score"); /// DOESNT WORK FIX
    //console.log(playersSorted);
    first = playersSorted[0];
    second = playersSorted[1];
    third = playersSorted[2];
  });

  return (
    <>
      <div className="podium__header">
        <h1>And The Winner Is...</h1>
        <Link className="playagain_button" to="/">
          Play Another Game
        </Link>
      </div>

      <Podium gamePin={gamePin} />
    </>
  );
};

export default PostGame;
