import './App.css';
import { useState } from 'react';
import SignupPage from './pages/Signup/Signup';
import LoginPage from "./pages/Login/Login"
import HomePage from "./pages/Home/Home"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {

   const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("testuser")) || null
  );

  const [currentUserToken, setCurrentUserToken] = useState(
    JSON.parse(localStorage.getItem("testuserToken")) || null
  );

  const handleLogin = (user, token) => {
    localStorage.setItem("testuser", JSON.stringify(user));
    setCurrentUser(user);

    localStorage.setItem("testuserToken", JSON.stringify(token));
    setCurrentUserToken(token);
  };
  return (
    <div className="App">
      <HomePage token={ currentUserToken} />
      {/* <LoginPage onLogin={handleLogin}/> */}
      {/* <SignupPage /> */}
    </div>
  );
}

export default App;
