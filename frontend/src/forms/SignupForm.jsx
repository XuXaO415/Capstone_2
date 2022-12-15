import React, { Component, useState, useContext } from "react";
import { useHistory, Redirect, NavLink } from "react-router-dom";
import UrGuideApi from "../api";
import UserContext from "../context/UserContext";

function SignupForm({ signup }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    country: "",
    zipCode: "",
    hobbies: "",
    interest: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    "SignupForm",
    "signup=",
    typeof signup,
    "formData=",
    formData,
    "formErrors=",
    formErrors
  );

  async function handleSubmit(e) {
    e.preventDefault();
    let result = await signup(formData);
    if (result.success) {
      setFormErrors([]);
      history.push("/");
    } else {
      setFormErrors(result.errors);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  return (
    <div className="SignupForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h3 className="mb-3">Sign Up</h3>
        <div className="card">
          <div className="card-body">
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
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>First name</label>
                <input
                  name="firstName"
                  className="form-control"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Last name</label>
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
                  type="email"
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
                <label>Hobbies</label>
                <input
                  name="hobbies"
                  className="form-control"
                  value={formData.hobbies}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Interest</label>
                <input
                  name="interest"
                  className="form-control"
                  value={formData.interest}
                  onChange={handleChange}
                />
              </div>
              {formErrors.length ? (
                <div className="alert alert-danger">
                  <ul>
                    {formErrors.map((err, idx) => (
                      <li key={idx}>{err}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <button
                type="submit"
                className="btn btn-primary float-right"
                onSubmit={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
