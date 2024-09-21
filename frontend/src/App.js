import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./style.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/HomePage";
import Tracker from "./Pages/TrackerPage";
import Login from "./Components/Login";
import Signup from "./Components/SignUp";
import NewPassword from "./Components/NewPassword";
import ResetPassword from "./Components/ResetPassword";
import Subscription from "./Components/Subscription";
import { useState, useEffect } from "react";

function App() {
  // State to store token
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Update token in state whenever it changes in localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, [localStorage.getItem('token')]); // This dependency ensures the token updates whenever localStorage changes

  return (
    <main>
      <Routes>
        <Route path="/login" element={<Login />} exact />
        <Route path="/register" element={<Signup />} exact />
        <Route path="/reset-password" element={<ResetPassword />} exact />
        <Route path="/new-password/:uidb64/:token" element={<NewPassword />} exact/>
        <Route
          path="/home"
          element={token ? <Home /> : <Navigate to="/login" exact/>}
        />
        <Route path="/subscribe" element={<Subscription />} exact/>
        <Route path="/tracker/:key" element={<Tracker />} exact/>
        <Route element={Error} />
      </Routes>
      <div>
        <p className="text-center text-small text-muted p-4 my-3">
          Built By <a href="https://kushagrasaxena.me" target="_blank">Kushagra Saxena</a>
        </p>
      </div>
    </main>
  );
}

export default App;
