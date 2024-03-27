import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [verif, setVerif] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message === "change") {
          setMessage(`The username ${username} is already taken :( please change.`);
        } else if (data.message === "yes") {
          setMessage(`Nice to see you among us ${username} :)`);
          setVerif(true);
        } else if (data.message === "no") {
          setMessage(`There was an error in the registration of ${username}.`);
        }
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-box">
      <div className="container">
        <label>Create a username :</label>
        <input
          type="text"
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="container">
        <label>Create a password :</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="container">
      <button type="submit" className="loginButton">Sign up</button>
      </div>
      <div className="container">
      {message && <p>{message}</p>} 
      </div>
      <div className="container">
      {verif && (
      <>
        <label>Let's discover your personnal space</label>
        <Link to={`/${username}`}><button className="loginButton">My user space</button></Link>
      </>
      )}
      </div>
    </form>
  );
}

export default SignupPage;
