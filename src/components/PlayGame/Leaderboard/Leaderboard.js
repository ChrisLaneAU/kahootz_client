import React, { useState, useEffect } from 'react'
import { gamesRef } from "../../../config/firebase";
import './Leaderboard.scss';

const Leaderboard = (props) => {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    gamesRef.child(`${props.game_pin}/players`).once("value", snapshot => {
      setPlayers(
        Object.values(snapshot.val())
          .sort((a, b) => a.score - b.score)
          .reverse()
          .slice(0, 5)
      );

    });
  }, [])


  const renderPlayers = () => {
    return players.map( player => {
      return (
        <h1 className = "display_player">{player.nickname}: {player.score} points</h1>
      )
    })
  }
  console.log(players.length);
  return (
    <div className="display">
      <div className="leaderboard">
        <div className="leaderboard__content">
          <div className="leaderboard__content--header">
           <p> Leaderboard </p>
          </div>

          {players.length > 0 ? renderPlayers() : <div className="leaderboard__content--player"></div>}

        </div>
       
      </div>
      {props.admin ? (<button className = "next" onClick={props.next_question_nav}>NEXT</button>) : <></>}
    </div>

  );
}

export default Leaderboard;