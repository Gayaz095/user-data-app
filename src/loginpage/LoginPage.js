import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  //login form state  values
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  //errors state values
  const [error, setError] = useState("");

  //logic for handling input field change in form
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //implementing submitting form data
  const handleFormSubmit = (e) => {
    e.preventDefault();
    //getting the signed up data from local storage
    const savedData = JSON.parse(localStorage.getItem("signupData"));

    //if only savedData is same as data in login form i.e., formData state value
    //then only navigate to Dashboard
    if (
      savedData &&
      savedData.username === formData.username &&
      savedData.email === formData.email &&
      savedData.phone === formData.phone
    ) {
      localStorage.setItem("isLoggedIn", "true"); //setting isLoggedIn value in localStorage
      setIsLoggedIn(true);
      navigate("/dashboard"); //navigating to Dashboard
    } else {
      //if data from login form is not same as saveData in localStorage then display error
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
        <br />
        <button type="submit">Login</button>
      </form>
      <p style={{ color: "red" }}>{error}</p>
      <p>
        Not registered? <Link to="/signup">SignUp</Link>
      </p>
    </div>
  );
};

export default LoginPage;
