import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();

  //signUp form state values
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  //errors state values
  const [errors, setErrors] = useState({
    usernameError: "",
    emailError: "",
    phoneError: "",
  });

  //state values for validation of form
  const [isFormValid, setIsFormValid] = useState(false);

  //handling input fields changes in signup form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateForm({ ...formData, [name]: value });
  };

  //validation of form is implemented here
  const validateForm = ({ username, email, phone }) => {
    const usernameRegex = /^[a-zA-Z ]*$/;
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    const phoneRegex = /^[0-9]+$/;

    const isUsernameValid = usernameRegex.test(username);
    const isEmailValid = emailRegex.test(email);
    const isPhoneValid = phoneRegex.test(phone);

    //displaying error values
    const usernameError = isUsernameValid ? "" : "Only alphabets are allowed";
    const emailError = isEmailValid ? "" : "Enter a valid email";
    const phoneError = isPhoneValid ? "" : "Only numbers are allowed";

    //setting errors with updated values
    setErrors({ usernameError, emailError, phoneError });

    //setting validating values
    setIsFormValid(isUsernameValid && isEmailValid && isPhoneValid);
  };

  //logic for handling signUp form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    //Storing the formData values in local storage
    localStorage.setItem("signupData", JSON.stringify(formData));
    navigate("/login"); // Navigating to the LoginPage
  };

  return (
    <div className="sign-up-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
          pattern="[A-Za-z]*"
          required
        />
        <span style={{ color: "red" }}>{errors.usernameError}</span>
        <br />
        <input
          type="email"
          name="email"
          placeholder="example@gmail.com"
          value={formData.email}
          onChange={handleInputChange}
          pattern="[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+"
          required
        />
        <span style={{ color: "red" }}>{errors.emailError}</span>
        <br />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleInputChange}
          pattern="[0-9]+"
          required
        />
        <span style={{ color: "red" }}>{errors.phoneError}</span>
        <br />
        <button type="submit" disabled={!isFormValid}>
          Sign Up
        </button>
      </form>
      <p>
        Already registered? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;
