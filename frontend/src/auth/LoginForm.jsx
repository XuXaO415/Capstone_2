import React, { useState } from "react";

function LoginForm({ login }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    "LoginForm",
    "login=",
    typeof login,
    "formData=",
    formData,
    "formErrors=",
    formErrors
  );

  /** Handle form input. */

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await login(formData);
    if (result.success) {
      setFormErrors([]);
    } else {
      setFormErrors(result.errors);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  return (
    <div className="LoginForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h3 className="mb-3">Login</h3>
        <div
          className="LoginForm-errors alert alert-danger"
          style={{ display: formErrors.length ? "block" : "none" }}
        >
          {formErrors.map((err) => (
            <p className="mb-0" key={err}>
              {err}
            </p>
          ))}
        </div>
        <div className="LoginForm-form card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  className="form-control"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  className="form-control"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {formErrors.length ? (
                <button
                  className="btn btn-danger float-right"
                  onClick={handleSubmit}
                >
                  Retry
                </button>
              ) : (
                <button
                  className="btn btn-primary float-right"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
