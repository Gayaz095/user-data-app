import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import data from "../db.json";
import "./ViewPage.css";

const ViewPage = () => {
  const navigate = useNavigate();

  //id for individual users
  const { id } = useParams();

  //CRUD operations state values
  const [user, setUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    state: "",
    gender: "",
    sitename: "",
  });

  //fetching required user data
  useEffect(() => {
    const currentUser = data.users.find((user) => user.id === parseInt(id));
    if (currentUser) {
      setUser(currentUser);
      setFormData(currentUser);
    }
  }, [id]);

  //handling input field changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditMode = () => {
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setFormData(user);
  };

  //function to handle form submitting
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedData = data.users.map((u) =>
      u.id === parseInt(id) ? { ...formData, id: parseInt(id) } : u
    );
    data.users = updatedData;
    setUser(formData);
    setIsEditMode(false);
  };

  //deleting a user data
  const handleDelete = () => {
    const confirmDelete = window.confirm("Do you want to delete user?");
    if (confirmDelete) {
      const updatedData = data.users.filter((u) => u.id !== parseInt(id));
      data.users = updatedData;
      alert("User Deleted");
      navigate("/dashboard");
    }
  };

  return (
    <div className="view-page-container">
      <h2>View Page for CRUD Operations</h2>
      {user && (
        <form onSubmit={handleFormSubmit} className="user-form">
          <div>
            <strong>Username:</strong>
            {isEditMode ? (
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            ) : (
              <span>{user.username}</span>
            )}
          </div>
          <div>
            <strong>Email:</strong>
            {isEditMode ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            ) : (
              <span>{user.email}</span>
            )}
          </div>
          <div>
            <strong>Phone:</strong>
            {isEditMode ? (
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            ) : (
              <span>{user.phone}</span>
            )}
          </div>
          <div>
            <strong>State:</strong>
            {isEditMode ? (
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}>
                <option value="Gujarat">Gujarat</option>
                <option value="Maharastra">Maharastra</option>
                <option value="Karnataka">Karnataka</option>
              </select>
            ) : (
              <span>{user.state}</span>
            )}
          </div>
          <div>
            <strong>Gender:</strong>
            {isEditMode ? (
              <div>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleInputChange}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleInputChange}
                  />
                  Female
                </label>
              </div>
            ) : (
              <span>{user.gender}</span>
            )}
          </div>
          <div>
            <strong>Sitename:</strong>
            {isEditMode ? (
              <input
                type="text"
                name="sitename"
                value={formData.sitename}
                onChange={handleInputChange}
              />
            ) : (
              <span>{user.sitename}</span>
            )}
          </div>
          {isEditMode ? (
            <div>
              <button type="submit" className="update-button">
                Save
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="delete-button">
                Cancel
              </button>
            </div>
          ) : (
            <>
              <button onClick={handleEditMode} className="update-button">
                Update
              </button>
              <button onClick={handleDelete} className="delete-button">
                Delete
              </button>
            </>
          )}
        </form>
      )}
    </div>
  );
};

export default ViewPage;
