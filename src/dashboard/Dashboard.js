import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import data from "../db.json";
import "./Dashboard.css";

const Dashboard = () => {
  //initial fetched state values
  const [userData, setUserData] = useState([]);

  //CRUD state values
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    phone: "",
    state: "",
    gender: "",
    sitename: "",
  });
  const states = ["Gujarat", "Maharastra", "Karnataka"];

  //errors state values
  const [errors, setErrors] = useState({
    usernameError: "",
    emailError: "",
    phoneError: "",
  });

  //filtering state values
  const [filteredUserData, setFilteredUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  //logic for fetching data
  useEffect(() => {
    setUserData(data.users); // Use the data directly
  }, []);

  //logic for adding new user or cancel
  const handleAddUser = () => {
    setShowAddUserForm(true);
  };

  const handleCancelAdd = () => {
    setShowAddUserForm(false);
  };

  //handling input field in form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
    validateForm(name, value);
  };

  //implementing form submitting logic
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/db.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      // Adding the new user data to the list
      setUserData([...userData, newUser]);

      // Resetting the newUser state
      setNewUser({
        username: "",
        email: "",
        phone: "",
        state: "",
        gender: "",
        sitename: "",
      });
      setShowAddUserForm(false); // Hide the AddUser form
    } catch (error) {
      console.error("Error adding user:", error.message);
    }
  };

  //validating form logic
  const validateForm = (name, value) => {
    switch (name) {
      case "username":
        const usernameRegex = /^[A-Za-z ]*$/; //username should be alphabet
        const isUsernameValid = usernameRegex.test(value);
        setErrors((prevErrors) => ({
          ...prevErrors,
          usernameError: isUsernameValid ? "" : "Only alphabets are allowed",
        }));
        break;
      case "email":
        //email should be alphanumeric
        const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        const isEmailValid = emailRegex.test(value);
        setErrors((prevErrors) => ({
          ...prevErrors,
          emailError: isEmailValid ? "" : "Enter a valid email",
        }));
        break;
      case "phone":
        //phone field should be numbers only
        const phoneRegex = /^[0-9]+$/;
        const isPhoneValid = phoneRegex.test(value);
        setErrors((prevErrors) => ({
          ...prevErrors,
          phoneError: isPhoneValid ? "" : "Only numbers are allowed",
        }));
        break;
      default:
        break;
    }
  };

  //filtering logic
  useEffect(() => {
    setFilteredUserData(userData);
  }, [userData]);

  //implementing logic so that filteredUserData should persist even after reloading the page
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("filteredUserData"));
    const storedSearchTerm = localStorage.getItem("searchTerm");
    if (storedData && storedSearchTerm) {
      setFilteredUserData(storedData);
      setSearchTerm(storedSearchTerm);
    } else {
      setFilteredUserData(userData);
    }
  }, [userData]);

  //logic for searching based on username in search bar
  const handleSearch = () => {
    const filteredData = userData.filter((user) => {
      return user.username.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredUserData(filteredData);
    localStorage.setItem("filteredUserData", JSON.stringify(filteredData));
    localStorage.setItem("searchTerm", searchTerm);
  };

  //handling sorting logic
  const handleSort = (type) => {
    let sortedData = [...filteredUserData];
    if (type === "atoz") {
      //sort alphabetically ascending order
      sortedData.sort((a, b) => a.username.localeCompare(b.username));
    } else if (type === "ztoa") {
      //sort alphabetically descending order
      sortedData.sort((a, b) => b.username.localeCompare(a.username));
    } else if (type === "lastmodified") {
      //sorting using last modified data
      sortedData = sortedData.sort(
        (a, b) => new Date(b.lastModified) - new Date(a.lastModified)
      );
    } else if (type === "lastinserted") {
      //sorting using last inserted data
      sortedData = sortedData.sort((a, b) => new Date(b.id) - new Date(a.id));
    }
    setFilteredUserData(sortedData);
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <button onClick={handleAddUser}>Add user</button>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="search-button"
          onClick={handleSearch}
          style={{ backgroundColor: "blue" }}>
          Search
        </button>
      </div>
      <div>
        <select onChange={(e) => handleSort(e.target.value)} value={sortBy}>
          <option value="">Sort By</option>
          <option value="atoz">Username A to Z</option>
          <option value="ztoa">Username Z to A</option>
          <option value="lastmodified">Last Modified</option>
          <option value="lastinserted">Last Inserted</option>
        </select>
      </div>
      {showAddUserForm && (
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            pattern="[A-Za-z ]*"
            value={newUser.username}
            onChange={handleInputChange}
            required
          />
          <span style={{ color: "red" }}>{errors.usernameError}</span>
          <br />
          <input
            type="email"
            name="email"
            placeholder="Email"
            pattern="[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+"
            value={newUser.email}
            onChange={handleInputChange}
            required
          />
          <span style={{ color: "red" }}>{errors.emailError}</span>
          <br />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            pattern="[0-9]+"
            value={newUser.phone}
            onChange={handleInputChange}
            required
          />
          <span style={{ color: "red" }}>{errors.phoneError}</span>
          <br />
          <select
            name="state"
            value={newUser.state}
            onChange={handleInputChange}
            required>
            <option value="">Select state</option>
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
          <br />
          <input
            type="text"
            name="sitename"
            placeholder="Sitename"
            value={newUser.sitename}
            onChange={handleInputChange}
            required
          />
          <br />
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={newUser.gender === "Male"}
              onChange={handleInputChange}
              required
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={newUser.gender === "Female"}
              onChange={handleInputChange}
              required
            />
            Female
          </label>
          <br />
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancelAdd}>
            Cancel
          </button>
        </form>
      )}
      <div className="cardUi">
        {filteredUserData && filteredUserData.length > 0 ? (
          filteredUserData.map((user) => (
            <div key={user.id} className="card">
              <span style={{ backgroundColor: "peachpuff" }}>
                <br></br>
              </span>

              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
              <p>
                <strong>State:</strong> {user.state}
              </p>
              <p>
                <strong>Gender:</strong> {user.gender}
              </p>
              <p>
                <strong>Sitename:</strong> {user.sitename}
              </p>
              <Link to={`/view/${user.id}`}>
                <button>View</button>
              </Link>
            </div>
          ))
        ) : (
          <div>No data found</div>
        )}
      </div>
      {/* implement logic if data id not found after filtering */}
      {filteredUserData.length === 0 && !showAddUserForm && (
        <div className="no-data-found">No Data Found</div>
      )}
    </div>
  );
};

export default Dashboard;
