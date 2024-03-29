import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function UserSpace() {
  let { username } = useParams(); // Accès au paramètre dynamique
  const [date, setDate] = useState('');
  const [game, setGame] = useState('');
  const [score, setScore] = useState('');

  const handleClick = async () => {
    try {
      const response = await fetch('http://localhost:5000/userspace0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setGame(updatedData.game);
      } else {
        console.error('Failed to increment game count');
      }
    } catch (error) {
      console.error('Error incrementing game count:', error);
    }
  }

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
    <form className="form-box">
      <div className="container">
        <label>Welcome in the user space of {username}!</label>
        <div>You are among us since : {date}</div>
        <div>You made {game} games</div>
        <div>You cumulate {score} points</div>
      </div>
      </form>
      <form onClick={handleClick} className="form-box">
      <div className="container">
      <Link to="/play"><button className="loginButton">NEW GAME</button></Link>
      </div>
      </form>
    </>
  );
}
//<Link to="/newgame"><button className="loginButton">NEW GAME</button></Link>

export default UserSpace;
