import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./homepage/HomePage";
import SignUp from "./signup/SignUp";
import LoginPage from "./loginpage/LoginPage";
import Dashboard from "./dashboard/Dashboard";
import ViewPage from "./viewpage/ViewPage";
import Navbar from "./navbar/Navbar";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  return (
    <div>
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/login"
            element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard isLoggedIn={isLoggedIn} />}
          />
          <Route path="/view/:id" element={<ViewPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
