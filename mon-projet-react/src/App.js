import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./componentsV1/HomePage";
import LoginPage from "./componentsV1/LoginPage";
import SignupPage from "./componentsV1/SignupPage";
import UserSpace from "./componentsV1/UserSpace";
import Picross from "./componentsV1/Picross";

//route dynamique pour le UserSpace
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/:username" element={<UserSpace />} />
        <Route path="/:username/play" element={<Picross />} />
      </Routes>
    </Router>
  );
}

export default App;