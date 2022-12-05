import { sign } from "jsonwebtoken";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import JoblyApi from "../api";

function SignupForm() {
  const history = useHistory();
  cont[(formData, setFormData)] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    //add more fields
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

  /** Handle form input. */

  async function handleSubmit(e) {
    e.preventDefault();
    let result = await signup(formData);
    if (result.success) {
      setFormErrors([]);
    } else {
      setFormErrors(result.errors);
    }
  }

  /** Update form data */
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
            </div>
  )
}

export default SignupForm;
