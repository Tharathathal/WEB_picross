import React, { useState } from 'react';
import Switch from '@mui/material/Switch' ;

function Square({ isBlack, state, onSquareClick }) {
  return (
    <button
      className={"square" + (isBlack ? " black" : "")}
      onClick={onSquareClick}
    >
      {state}
    </button>
  );
}

function Board({ squaresColor, squaresState, handleClick }) {
  return (
    <>
      <div className="board-row">
        {squaresColor.slice(0, 3).map((isBlack, index) => (
          <Square key={index} isBlack={isBlack} state = {squaresState[index]} onSquareClick={() => handleClick(index)} />
        ))}
      </div>
      <div className="board-row">
        {squaresColor.slice(3, 6).map((isBlack, index) => (
          <Square key={index + 3} isBlack={isBlack} state = {squaresState[index + 3]} onSquareClick={() => handleClick(index + 3)} />
        ))}
      </div>
      <div className="board-row">
        {squaresColor.slice(6, 9).map((isBlack, index) => (
          <Square key={index + 6} isBlack={isBlack} state = {squaresState[index + 6]} onSquareClick={() => handleClick(index + 6)} />
        ))}
      </div>
    </>
  );
}

function Game() {
  const picture = [true,true,true,false,false,false,false,false,false];
  var [blackIsPlayed, setBlackIsPlayed] = useState(true);
  var [errors, setErrors] = useState(0);

  const [squaresColor, setSquaresColor] = useState(Array(9).fill(null));
  const [squaresState, setSquaresState] = useState(Array(9).fill(null));

  const handleSwitchChange = () => {
    setBlackIsPlayed(!blackIsPlayed);
  };

  const handleClick = (i) => {
    if (squaresState[i] == null) {
      if (picture[i] !== blackIsPlayed){
        setErrors(errors +1);
        blackIsPlayed = !blackIsPlayed;
      }
      const futureSquaresColor = squaresColor.slice();
      futureSquaresColor[i] = blackIsPlayed ? true : false;
      setSquaresColor(futureSquaresColor);

      const futureSquaresState = squaresState.slice();
      futureSquaresState[i] = blackIsPlayed ? "B" : "X";
      setSquaresState(futureSquaresState);
    }
  };
  

  return (
    <>
      <h1> Picross </h1>
      <div className='board'>
        <Board squaresColor={squaresColor} squaresState={squaresState} handleClick={handleClick} />
      </div>
      <div className='switch'>
        <Switch checked={blackIsPlayed} onChange={handleSwitchChange} />
      </div>
      <p> Nombre d'erreurs : <span className='errors'> {errors} </span>
      </p>
    </>
  );
}

export default Game;