import React, { useState, useContext, useEffect } from "react";
import { useHistory, NavLink, Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Alert from "../common/Alert";

/** Form for logging in. */

function LoginForm({ login }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);
  const [validated, setValidated] = useState(false);

  console.debug(
    "LoginForm",
    "login=",
    typeof login,
    "formData=",
    formData,
    "formErrors=",
    formErrors
  );

  /** Handle form submit:
   *   - calls login func prop and, if successful, redirect to /profile.
   *  - if login unsuccessful, shows error messages.
   * */

  async function handleSubmit(e) {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    e.preventDefault();
    let result = await login(formData);
    if (result.success) {
      history.push("/profile");
    }

    if (!result.success) {
      setFormErrors(result.errors);
    } else {
      setFormErrors([]);
    }
  }

  /** Update form data field */

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((fData) => ({ ...fData, [name]: value }));
  }

  return (
    <div className="LoginForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h3 className="mb-3">Log In</h3>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              name="username"
              placeholder="Username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a username.
            </Form.Control.Feedback>
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a password.
            </Form.Control.Feedback>
          </div>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <p className="mt-3">
          New to UrGuide? <NavLink to="/signup">Sign Up</NavLink>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
