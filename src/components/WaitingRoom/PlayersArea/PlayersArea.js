import React from "react";
import NewPlayerForm from "../NewPlayerForm/NewPlayerForm";

const PlayersArea = ({ game: { id, title, players } }) => {
  return (
    <div className="playerArea">
      <ul>{orderedPlayers(players)}</ul>
      {/*<NewPlayerForm game_id={id} />*/}
    </div>
  );
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
