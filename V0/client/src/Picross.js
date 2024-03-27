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
    backgroundColor: theme.palette.mode === 'dark' ? '#19115e' : '#19115e',
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
    backgroundColor: theme.palette.mode === 'dark' ? '#f37f1c' : '#f37f1c',
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

function Board({ size,squaresColor, squaresState, errors, handleClick }) {
  let rows = [];

  for (let i = 0; i < size; i++) {
    const Row =  squaresColor.slice(i*size, (i+1)*size).map((isBlack, index) => (
      <Square key={index + i*size} isBlack={isBlack} state = {squaresState[index + i*size]} error = {errors[index+ i*size]} onSquareClick={() => handleClick(index + i*size)} />
    ));

    rows.push(<div className="board-row" key={i}>{Row}</div>);
  }
  
  return <>{rows}</>

}

function Heart ({ filled }) {
  if (filled){
  return <span>❤</span>;
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
    <div className="heart">
      {hearts.map((filled, index) => (
        <Heart key={index} filled={filled} />
      ))}
    </div>
  );
};


function Game() {
  const picture = [true,true,true,false,true,false,true,false,false];
  var [blackIsPlayed, setBlackIsPlayed] = useState(true);

  
  const [size, setSize] = useState(9);
  const [numbers, setNumbers] = useState(Array(2*Math.sqrt(size)).fill(null));

  const [squaresColor, setSquaresColor] = useState(Array(size).fill(null));
  const [squaresState, setSquaresState] = useState(Array(size).fill(null));

  const [errors, setErrors] = useState(Array(size).fill(null));
  
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
      
      endgame = true;
      
      for (let i = 0; i<squaresColor.length;i++) {
        if (picture[i]&&!squaresColor[i]){
          endgame = false;
        }
      }
      
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
          <Hearts numErrors={errors.reduce((acc, curr) => acc + (curr ? 1 : 0), 0)} />
          <div className="container">
            <div className="row-wrapper">
              <div className="corner">
                <Square/>
              </div>
              <div className="board-row">
                {numbers.slice(numbers.length/2, numbers.length).map((number, index) => (
                  <Square key={index} isBlack={false} state={Array.isArray(number) ? number.join(' · ') : number} />
                ))}
              </div>
            </div>
            <div className="board-wrapper">
              <div className="board-column">
                {numbers.slice(0, numbers.length/2).map((number, index) => (
                  <Square key={index} isBlack={false} state={Array.isArray(number) ? number.join(' · ') : number} />
                ))}
              </div>
              <div className="board">
                <Board size={Math.sqrt(size)} squaresColor={squaresColor} squaresState={squaresState} errors={errors} handleClick={handleClick} />
              </div>
            </div>
          </div>



          <div className="switch">
            <MySwitch checked={blackIsPlayed} onChange={handleSwitchChange} />
          </div>
        </>
      )}
    </>
  );
}



export default Game;

function getNumbers(futureNumbers, pic, size){
  var count = 0;  
  var values = [];

  for (let i=0; i<Math.sqrt(size); i++){
    for (let j=i*Math.sqrt(size); j<(i*Math.sqrt(size)+Math.sqrt(size)); j++){
      if (pic[j]===true){
        count += 1;
      }
      else{
        if (count != 0){      
          values.push(count);
          count = 0;
        }
      }
    }   
    if (values.length == 0 || count!=0){
      values.push(count);
    } 
    futureNumbers[i] = values;
    count = 0;
    values = [];
    
    for (let j=i; j<size; j=j+Math.sqrt(size)){
      if (pic[j]===true){
        count += 1;
      }
      else{
        if (count != 0){      
          values.push(count);
          count = 0;
        }
      }
    }
    if (values.length == 0 || count!=0){
      values.push(count);
    }    
    futureNumbers[i+Math.sqrt(size)] = values;
    count = 0;
    values = [];
  };
  return futureNumbers;
}