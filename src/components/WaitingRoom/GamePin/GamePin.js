import React from 'react';
import "./GamePin.scss";

const GamePin = props => {
  return (
    <>
      <h2 className="game-pin">
        Game Pin:&nbsp;
        <span className="game-pin__number">{props.gamePin}</span>
      </h2>
    </>
  )
};

export default GamePin;
