import React from "react";
import { ActionCable } from "react-actioncable-provider";

const Cable = ({ games, handleReceivedPlayer }) => {
  return (
    <>
      {games.map(game => {
        return (
          <ActionCable
            key={game.id}
            channel={{ channel: "PlayersChannel", game: game.title }}
            onReceived={handleReceivedPlayer}
          />
        );
      })}
    </>
  );
};

export default Cable;
