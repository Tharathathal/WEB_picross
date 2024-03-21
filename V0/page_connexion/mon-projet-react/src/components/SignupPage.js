import React, { useState } from "react";

function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

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
          setMessage(`The username ${username} is already taken :( please change.`)
        } else if (data.message === "yes") {
          setMessage(`Nice to see you among us ${username} :)`)
          //+ redirection ?
        } else if (data.message === "no") {
          setMessage(`There was an error in the registration of ${username}.`)
        }
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Create a username :</label>
        <input
          type="text"
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Create a password :</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Sign up</button>
      {message && <p>{message}</p>} 
    </form>
  );
}

export default SignupPage;
