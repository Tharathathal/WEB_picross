import React, { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch' ;
import { styled } from '@mui/material/styles'
import GetParam from './Param';

//Parametrage du switch
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


//Gestion des carrés
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

//Gestion du plateau
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

//Gestion des coeurs pour les erreurs
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

//Gestion du jeu global
function Game() {
  var [blackIsPlayed, setBlackIsPlayed] = useState(true);     //Booléen correspondant à l'action
  
  const [size, setSize] = useState(0);    //Taille du plateau
  const [picture, setPicture] = useState(Array(size).fill(null));   //Tableau des valeurs de la photo
  const [numbers, setNumbers] = useState(Array(2*Math.sqrt(size)).fill(null));    //Tableau des valeurs de carrés consécutifs

  const [squaresColor, setSquaresColor] = useState(Array(size).fill(null));   //Etat de la couleur des carrés (noir ou rouge)
  const [squaresState, setSquaresState] = useState(Array(size).fill(null));   //Etat du contenu des carrés (plein ou X)

  const [errors, setErrors] = useState(Array(size).fill(null));      //Tableau des erreurs   
  
  //Update des variables avec quand size est défini
  useEffect(() => {
    setSquaresColor(Array(size).fill(null));
    setSquaresState(Array(size).fill(null));
    setErrors(Array(size).fill(null));
    setNumbers(Array(2 * Math.sqrt(size)).fill(null));
  }, [size]);
  
  //Détermine les valeurs de carrés consécutifs
  useEffect(() => {
    const futureNumbers = getNumbers(numbers.slice(), picture, size);
    setNumbers(futureNumbers);
  }, [size]);

  //Vérifie si victoire ou défaite
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

  //Définit l'état du booléen d'action
  const handleSwitchChange = () => {
    setBlackIsPlayed(!blackIsPlayed);
  };

  //Vérifie si les paramètres de lancement de jeu sont définis
 const checkParam = () => {
    return size !== 0 && picture.every(item => item !== null);
  }

  //Gestion du click sur un carré
  const handleClick = (i) => {
    if (squaresState[i] == null) {
      const futureErrors = errors.slice();
      futureErrors[i] = false;
      if (picture[i] !== blackIsPlayed){ //Vérification si erreur
        blackIsPlayed = !blackIsPlayed;
        futureErrors[i] = true;
      }
      setErrors(futureErrors);

      //Affichage couleur
      const futureSquaresColor = squaresColor.slice();
      futureSquaresColor[i] = blackIsPlayed ? true : false;
      setSquaresColor(futureSquaresColor);

      //Affichage contenu
      const futureSquaresState = squaresState.slice();
      futureSquaresState[i] = blackIsPlayed ? "B" : "X";
      setSquaresState(futureSquaresState);
    }
  };
  
  return (
    <>
    {!checkParam() ?(
      <>
      <h1>Picross</h1>
      <GetParam setSize={setSize} setPicture={setPicture}/>
      </>
    ):(
      <>
        <h1> Picross </h1>
        {endgame ? (
          <div>
            {win ? <h2> You won !   </h2> : <h2> Game over </h2>}
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
      )
    }
    </>
  );
}

export default Game;

//Comptage des valeurs des lignes/colonnes
function getNumbers(futureNumbers, pic, size){
  var count = 0;    //Compte des valeurs consécutives
  var values = [];  //Liste des valeurs consécutives pour la ligne ou la colonne

  for (let i=0; i<Math.sqrt(size); i++){
    //Parcours des lignes
    for (let j=i*Math.sqrt(size); j<(i*Math.sqrt(size)+Math.sqrt(size)); j++){
      if (pic[j]===true){
        count += 1;
      }
      else{
        if (count !== 0){      //Interruption de la suite
          values.push(count);
          count = 0;
        }
      }
    }   
    if (values.length === 0 || count!==0){
      values.push(count);
    } 
    futureNumbers[i] = values;
    count = 0;
    values = [];
    
    //Parcours des colonnes
    for (let j=i; j<size; j=j+Math.sqrt(size)){
      if (pic[j]===true){
        count += 1;
      }
      else{
        if (count !== 0){      //Interruption de la suite  
          values.push(count);
          count = 0;
        }
      }
    }
    if (values.length === 0 || count!==0){
      values.push(count);
    }    
    futureNumbers[i+Math.sqrt(size)] = values;
    count = 0;
    values = [];
  };

  return futureNumbers;     //Retourne le tableau des listes des valeurs
}