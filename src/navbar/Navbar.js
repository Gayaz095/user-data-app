import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  //logic for logging out user and navigating user to Home
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="navbar" style={{ padding: "20px" }}>
      <div className="left-container">
        <ul className="nav-list">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
        </ul>
      </div>
      <div className="right-container">
        <ul className="nav-list">
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              </li>
              <li className="logout-container">
                <button onClick={handleLogout} className="logout-btn">
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
