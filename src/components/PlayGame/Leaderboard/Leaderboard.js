import React, { useState, useEffect } from 'react'
import { gamesRef } from "../../../config/firebase";


const Leaderboard = ( props ) => {
  const [players, setPlayers ] = useState([])

  useEffect(() => {
    gamesRef.child(`${props.game_pin}/players`).once("value", snapshot => {
      setPlayers(
        Object.values(snapshot.val())
          .sort((a, b) => a.score - b.score)
          .reverse()
          .slice(0, 5)
      );

    });
  },[])
 

  const renderPlayers = () => {
    return players.map( player => {
      return (
        <h1>{player.nickname}: {player.score} points</h1>
      )
    })
  }
  return(
    <div>
      <h1>LeaderBoard</h1>
   
        { players.length > 0 ? renderPlayers() : <div></div> }

    { props.admin ? (<button onClick={props.next_question_nav}>NEXT</button> ) : <></> }

    </div>
  
  );
}

export default Leaderboard;