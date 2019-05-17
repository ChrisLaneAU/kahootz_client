import React, { useState, useEffect } from "react";
import { gamesRef } from "../../../config/firebase";

const Leaderboard = props => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    gamesRef.child(`${props.game_pin}/players`).once("value", snapshot => {
      setPlayers(
        Object.values(snapshot.val())
          .sort((a, b) => a.score - b.score)
          .reverse()
          .slice(0, 5)
      );
    });
  }, []);

  const renderPlayers = () => {
    players.map(player => {
      console.log("this is a player", player);
      return (
        <h1>
          {player.nickname}: {player.score} points
        </h1>
      );
    });
  };
  console.log(players.length);
  return (
    <>
      <h1>LeaderBoard</h1>
      <ol>{players.length > 0 ? renderPlayers() : <></>}</ol>
      {props.admin ? (
        <button onClick={props.next_question_nav}>NEXT</button>
      ) : (
        <></>
      )}
    </>
  );
};

export default Leaderboard;
