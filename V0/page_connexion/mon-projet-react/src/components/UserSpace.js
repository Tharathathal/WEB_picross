import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserSpace() {
  let { username } = useParams(); // Accès au paramètre dynamique
  const [date, setDate] = useState('');
  const [game, setGame] = useState('');
  const [score, setScore] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/userspace', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }),
        });

        if (response.ok) {
          const data = await response.json();
          setDate(data.date);
          setGame(data.game);
          setScore(data.score);
        } else {
          console.error('Failed to fetch information');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [username]); // Dépendance à `username` pour relancer la requête si jamais le paramètre change

  return (
    <>
      <div className="container">
        Bienvenue dans l'espace utilisateur de {username}!
        <div>You are among us since : {date}</div>
        <div>You made {game} games</div>
        <div>You cumulate {score} points</div>
      </div>
      <div className="container">
      <button className="loginButton">NEW GAME</button>
      </div>
    </>
  );
}
//<Link to="/newgame"><button className="loginButton">NEW GAME</button></Link>

export default UserSpace;
