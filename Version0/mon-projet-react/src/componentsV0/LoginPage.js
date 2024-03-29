import React, { useState } from 'react';
import { Link } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); //affiche un message après la soumission du username et pwd
  const [verif, setVerif] = useState(false); //booléen qui devient vrai si l'utilisateur est vérifié 

  //fonction qui s'active lorsque l'utilisateur a soumis username et pwd
  const handleSubmit = async (event) => {
    event.preventDefault();

    //lors de la soumission --> requête au serveur
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), //on envoi au serveur ces infos
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message === "nothing") {
          setMessage(`The username ${username} doesn't exist.`) //si username introuvable
        } else if (data.message === "yes") {
          setMessage(`Nice to see you again ${username} !`) //si username trouvé et pwd ok
          setVerif(true)
        } else if (data.message === "no") {
          setMessage(`This is not the right password for ${username}.`) //si username trouvé mais mauvais pwd
        }
      } else {
        console.error('Login failed'); //si la réponse ne peut pas être lue 
      }
    } catch (error) {
      console.error('Login error:', error); //si la connexion a échouée
    }
  };

  //si utilisateur vérifié, on lui propose d'aller dans son user space
  if (verif) {
    return (
      <div className="container">
        {message && <p>{message}</p>}
        <label>Go to your personal space:</label>
        <Link to={`/${username}`}><button className="loginButton">My user space</button></Link>
      </div>
    );
  //sinon on lui propose de se connecter
  } else {
    return (
      <form onSubmit={handleSubmit} className="form-box">
        <div className="container">
          <label>Input your username :</label>
          <input
            type="text"
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="container">
          <label>Input your password :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="container">
        <button type="submit" className="loginButton">Login</button>
        </div>
        <div className="container">
        {message && <p>{message}</p>} 
        </div>
      </form>
    );
  }
}

export default LoginPage;