import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import UserSpace from "./components/UserSpace";
import Picross from "./components/Picross";

//route dynamique pour le UserSpace
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/:username" element={<UserSpace />} />
        <Route path="/play" element={<Picross />} />
      </Routes>
    </Router>
  );
}

export default App;