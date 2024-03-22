import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import UserSpace from "./components/UserSpace";

// Composant App ou un autre composant racine où vous configurez le Router
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />}>
          <Route path="userspace" element={<UserSpace />} />
        </Route>
        <Route path="/signup" element={<SignupPage />}>
          <Route path="userspace" element={<UserSpace />} />
        </Route>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;

