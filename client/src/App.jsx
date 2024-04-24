// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Scoreboard from "./components/Scoreboard";
import Dashboard from "./components/Dashboard";
import Challenges from "./components/Challenges";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/scoreboard" element={<Scoreboard />} />
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/challenges" element={<Challenges />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
