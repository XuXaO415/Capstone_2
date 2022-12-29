import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import UrGuideApi from "../api";

//create a form for the user to update their profile

function ProfileForm() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formErrors, setFormErrors] = useState([]);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    password: currentUser.password,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    city: currentUser.city,
    country: currentUser.country,
    zipCode: currentUser.zipCode,
    imageUrl: currentUser.imageUrl,
    hobbies: currentUser.hobbies,
    interests: currentUser.interests,
  });

  console.debug(
    "ProfileForm",
    "currentUser=",
    currentUser,
    "formData=",
    formData
  );

  async function handleSubmit(e) {
    e.preventDefault();
    let result = await UrGuideApi.updateUser(formData);
    if (result.success) {
      setFormErrors([]);
      setCurrentUser(result.user);
    } else {
      setFormErrors(result.errors);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  return (
    <div className="ProfileForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h3 className="mb-3">Update Profile</h3>
        <div
          className="ProfileForm-errors alert alert-danger"
          style={{ display: formErrors.length ? "block" : "none" }}
        >
          {formErrors.map((err) => (
            <p className="mb-0" key={err}>
              {err}
            </p>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>First Name</label>
            <input
              name="firstName"
              className="form-control"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              name="lastName"
              className="form-control"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              name="city"
              className="form-control"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input
              name="country"
              className="form-control"
              value={formData.country}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Zip Code</label>
            <input
              name="zipCode"
              className="form-control"
              value={formData.zipCode}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input
              name="imageUrl"
              className="form-control"
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Hobbies</label>
            <input
              name="hobbies"
              className="form-control"
              value={formData.hobbies}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Interests</label>
            <input
              name="interests"
              className="form-control"
              value={formData.interests}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-primary float-right">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;
