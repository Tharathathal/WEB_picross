import React, { useState, useEffect } from 'react';
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

function Board({ squaresColor, squaresState, handleClick, size }) {
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
        {squaresColor.slice(6, size).map((isBlack, index) => (
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
  const [size, setSize] = useState(9);
  const [numbers, setNumbers] = useState(Array(2*Math.sqrt(size)).fill(null));

  const [squaresColor, setSquaresColor] = useState(Array(size).fill(null));
  const [squaresState, setSquaresState] = useState(Array(size).fill(null));
  
  useEffect(() => {
    const futureNumbers = getNumbers(numbers.slice(), picture, size);
    setNumbers(futureNumbers);
  }, []);

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
      <p> {numbers.join(' ')}</p>
    </>
  );
}

export default Game;

function getNumbers(futureNumbers, pic, size){  
  for (let i=0; i<Math.sqrt(size); i++){
    var count = 0;
    for (let j=i*Math.sqrt(size); j<(i*Math.sqrt(size)+Math.sqrt(size)); j++){
        if (pic[j]===true){
            count += 1;
        }
    }
    futureNumbers[i] = count;

    count = 0;
    for (let j=i; j<size; j = j+Math.sqrt(size)){
        if (pic[j]===true){
            count += 1;
        }
    }
    futureNumbers[i+Math.sqrt(size)] = count;
  };
  return futureNumbers;
}