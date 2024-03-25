import React, { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch' ;
import { styled } from '@mui/material/styles'

const MySwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M 16 4 L 16 16 L 4 16 L 4 4 L 16 4"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M 11.5 10 L 16 14.5 L 14.5 16 L 10 11.5 L 5.5 16 L 4 14.5 L 8.5 10 L 4 5.5 L 5.5 4 L 10 8.5 L 14.5 4 L 16 5.5 L 11.5 10"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));



function Square({ isBlack, state, error, onSquareClick }) {
  let className = "square";
  if (error&&isBlack){
    className+=" red";
  } else if (error&&!isBlack){
    className+= " redx";
  } else if (isBlack) {
    className+=" black";
  }

  return (
    <button
      className={className} 
      onClick={onSquareClick}
    >
      {state}
    </button>
  );
}

function Board({ squaresColor, squaresState, errors, handleClick }) {
  return (
    <>
      <div className="board-row">
        {squaresColor.slice(0, 3).map((isBlack, index) => (
          <Square key={index} isBlack={isBlack} state = {squaresState[index]} error = {errors[index]} onSquareClick={() => handleClick(index)} />
        ))}
      </div>
      <div className="board-row">
        {squaresColor.slice(3, 6).map((isBlack, index) => (
          <Square key={index + 3} isBlack={isBlack} state = {squaresState[index + 3]} error = {errors[index + 3]} onSquareClick={() => handleClick(index + 3)} />
        ))}
      </div>
      <div className="board-row">
        {squaresColor.slice(6, 9).map((isBlack, index) => (
          <Square key={index + 6} isBlack={isBlack} state = {squaresState[index + 6]} error = {errors[index + 6]} onSquareClick={() => handleClick(index + 6)} />
        ))}
      </div>
    </>
  );
}

function Heart ({ filled }) {
  if (filled){
  return <span className="heart">❤</span>;
  }
};
function Hearts ({ numErrors }) {
  const [hearts, setHearts] = useState(Array(5).fill(true));

  React.useEffect(() => {
    if (numErrors > 0 && numErrors <= 5) {
      setHearts((prevHearts) => {
        const newHearts = [...prevHearts];
        for (let i = 0; i < numErrors; i++) {
          newHearts[i] = false;
        }
        return newHearts;
      });
    }
  }, [numErrors]);

  return (
    <div>
      {hearts.map((filled, index) => (
        <Heart key={index} filled={filled} />
      ))}
    </div>
  );
};


function Game() {
  const picture = [true,true,true,false,false,false,false,false,false];
  var [blackIsPlayed, setBlackIsPlayed] = useState(true);

  const [errors, setErrors] = useState(Array(9).fill(null));
  const [size, setSize] = useState(9);
  const [numbers, setNumbers] = useState(Array(2*Math.sqrt(size)).fill(null));

  const [squaresColor, setSquaresColor] = useState(Array(size).fill(null));
  const [squaresState, setSquaresState] = useState(Array(size).fill(null));
  
  useEffect(() => {
    const futureNumbers = getNumbers(numbers.slice(), picture, size);
    setNumbers(futureNumbers);
  }, []);

  const checkEndgame = () => {
    let endgame,win;
    
    const numErrors = errors.reduce((acc,curr)=>acc+ (curr ? 1:0),0);
    if (numErrors > 4) {
      endgame = true;
      win = false;
    } else {
      endgame = squaresColor.every((e)=>e!==null);
      if (endgame) {
        win = true;
      }
    }
    return {endgame,win};
  }

  const {endgame,win} = checkEndgame();

  const handleSwitchChange = () => {
    setBlackIsPlayed(!blackIsPlayed);
  };

  const handleClick = (i) => {
    if (squaresState[i] == null) {
      const futureErrors = errors.slice();
      futureErrors[i] = false;
      if (picture[i] !== blackIsPlayed){
        blackIsPlayed = !blackIsPlayed;
        futureErrors[i] = true;
      }
      setErrors(futureErrors);

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
      {endgame ? (
        <div>
          {win ? <h2> You won ! </h2> : <h2> Game over </h2>}
        </div>
      ) : (
        <>
          <div className="board">
            <Board squaresColor={squaresColor} squaresState={squaresState} errors={errors} handleClick={handleClick} />
          </div>
          <div className="switch">
            <MySwitch checked={blackIsPlayed} onChange={handleSwitchChange} />
          </div>
          <Hearts numErrors={errors.reduce((acc, curr) => acc + (curr ? 1 : 0), 0)} />
          <p> {numbers.join(" ")}</p>
        </>
      )}
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