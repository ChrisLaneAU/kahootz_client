import React, { Component } from "react";
import NewPlayerForm from "../NewPlayerForm/NewPlayerForm";
import './PlayersArea.scss'
// const PlayersArea = ({ game: { id, title, players } }) => {


class PlayersArea extends Component {


  renderPlayer(){
  const players = ["james", "ben", "chris", "sam", "jen", "kylie", "bob","jen", "kylie", "fred","jen", "kylie", "jack", "cooper","jen", "kylie", "sally", "anne", "billy", "frank", "james", "ben", "chris", "sam", "jen", "kylie", "bob", "fred", "jack", "cooper", "sally", "anne", "billy", "frank"]
  const listPlayers = players.map((player) => 
    <li>{player}</li>
  )

  return(listPlayers)
}


  render() {
    return (
      <div className="playerArea">
        {/* <h2>{title}</h2>
      <ul>{orderedPlayers(players)}</ul> */}
       
        <ul>{this.renderPlayer()}</ul>
      </div>
    );
  }

};

export default PlayersArea;

// helpers

const orderedPlayers = players => {
  const sortedPlayers = players.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );
  return sortedPlayers.map(player => {
    return <li key={player.id}>{player.nickname}</li>;
  });
};
