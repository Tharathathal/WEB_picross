import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <form className="form-box">
    <div className="container">
      <h1>Welcome</h1>
        <Link to="/login"><button className="loginButton">Login</button></Link>
        <Link to="/signup"><button className="loginButton">Sign up</button></Link>
    </div>
    </form>
  );
}

export default HomePage;