import React, { useState } from 'react';
import { Link } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [verif, setVerif] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message === "nothing") {
          setMessage(`The username ${username} doesn't exist.`)
        } else if (data.message === "yes") {
          setMessage(`Nice to see you again ${username} !`)
          setVerif(true)
        } else if (data.message === "no") {
          setMessage(`This is not the right password for ${username}.`)
        }
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  if (verif) {
    return (
      <div className="container">
        <label>Go to your personal space:</label>
        <Link to={`/${username}`}><button className="loginButton">My user space</button></Link>
      </div>
    );
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