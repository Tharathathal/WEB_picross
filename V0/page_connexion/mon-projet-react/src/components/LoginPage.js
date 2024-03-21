import React, { useState } from 'react';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

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
          //+ redirection ?
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

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Input your username :</label>
        <input
          type="text"
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Input your password :</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
      {message && <p>{message}</p>} 
    </form>
  );
}

export default LoginPage;
