import React, { useState, useContext, useEffect } from "react";
import { useNavigate, NavLink, Navigation } from "react-router-dom";
import UserContext from "../context/UserContext";
import SignupForm from "../forms/SignupForm";
import { Form, FormGroup, Button } from "react-bootstrap";

function LoginForm({ login }) {
  const initialState = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(null);
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    console.debug(
      "LoginForm useEffect",
      "login=",
      typeof login,
      "currentUser=",
      currentUser,
      "formData=",
      formData
    );
    setFormData((f) => ({ ...f, username: currentUser.username }));
  }, [currentUser]);

  async function handleSubmit(e) {
    e.preventDefault();
    let result = await login(formData);
    if (result.success) {
      setSuccess(true);
      navigate.push("/");
    } else {
      setError(result.error);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  }

  return (
    <div className="LoginForm">
      <div className="container col-md-6">
        <h3 className="mt-3">Log In</h3>

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
              <button
                className="btn btn-primary float-left mt-3"
                onSubmit={handleSubmit}
              >
                Submit
              </button>
              <div className="mt-3">
                <NavLink to="/signup" activeClassName="active">
                  Sign up
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
