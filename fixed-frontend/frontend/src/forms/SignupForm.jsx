import React, { useEffect, useState, useContext } from "react";
import { useHistory, Redirect, NavLink } from "react-router-dom";
import "./SignupForm.css";
import UserContext from "../context/UserContext";
import { Button } from "react-bootstrap";
import { Formik, ErrorMessage, Field, Form, FormikErrors } from "formik";
import * as Yup from "yup";

function SignupForm({ signup }) {
  const history = useHistory();
  const initialValues = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    country: "",
    zipCode: "",
    hobbies: "",
    interests: "",
  };

  const [formData, setFormData] = useState(initialValues);

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short!")
      .max(30, "Username is too long is too long to remember!")
      .required("Required"),
    password: Yup.string()
      .min(5, "Too Short!")
      .max(30, "Password is too long!")
      .required("Required"),
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(30, "Is this really your name?")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(30, "Cool name?")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    city: Yup.string()
      .min(2, "Please enter your city!")
      .max(50, "That's a really long name!")
      .required("Required"),
    country: Yup.string()
      .min(2, "Please enter your country!")
      .max(50, "That's a really long name!")
      .required("Required"),
    zipCode: Yup.string()
      .min(2, "Please enter your zip code!")
      .max(10, "That's a really long name!")
      .required("Required"),

    //add hobbies and interests

    interests: Yup.string()
      .min(2, "Please enter your interests!")
      .max(50, "That's a really long name!")
      .required("Required"),

    hobbies: Yup.string()
      .min(2, "Please enter your hobbies!")
      .max(50, "That's a really long name!")
      .required("Required"),
  });

  //   interests: Yup.object()
  //     .shape({
  //       hiking: Yup.boolean(),
  //       biking: Yup.boolean(),
  //       sightseeing: Yup.boolean(),
  //       shopping: Yup.boolean(),
  //       museums: Yup.boolean(),
  //       food: Yup.boolean(),
  //       nightlife: Yup.boolean(),
  //       music: Yup.boolean(),
  //       sports: Yup.boolean(),
  //       gaming: Yup.boolean(),
  //       art: Yup.boolean(),
  //       traveling: Yup.boolean(),
  //     })
  //     .required("Required"),
  //   hobbies: Yup.object()
  //     .shape({
  //       reading: Yup.boolean(),
  //       traveling: Yup.boolean(),
  //       gaming: Yup.boolean(),
  //       sports: Yup.boolean(),
  //       pets: Yup.boolean(),
  //       music: Yup.boolean(),
  //       movies: Yup.boolean(),
  //       cooking: Yup.boolean(),
  //       art: Yup.boolean(),
  //       hiking: Yup.boolean(),
  //       biking: Yup.boolean(),
  //       sightseeing: Yup.boolean(),
  //       shopping: Yup.boolean(),
  //       museums: Yup.boolean(),
  //       food: Yup.boolean(),
  //       nightlife: Yup.boolean(),
  //       photography: Yup.boolean(),
  //       gardening: Yup.boolean(),
  //       volunteering: Yup.boolean(),
  //       writing: Yup.boolean(),
  //       dancing: Yup.boolean(),
  //       yoga: Yup.boolean(),
  //       meditation: Yup.boolean(),
  //     })
  //     .required("Required"),
  // });

  //   const handleSubmit = async (values, setStatus) => {
  //     let result = await signup(values);
  //     if (result.success) {
  //       history.push("/login");
  //     } else {
  //       setStatus(result.errors);
  //     }
  //   };

  //   return (
  //     <Card className="SignupForm">
  //       <card>
  //         <Formik
  //           initialValues={{
  //             username: "",
  //             password: "",
  //             firstName: "",
  //             lastName: "",
  //             email: "",
  //             city: "",
  //             country: "",
  //             zipCode: "",
  //             hobbies: "",
  //             interests: "",
  //           }}
  //           validationSchema={SignupSchema}
  //           onSubmit={(values, { setStatus }) => handleSubmit(values, setStatus)}
  //         >
  //           {({ errors, touched, values, handleChange, handleBlur }) => (
  //             <Form>
  //               <div className="form-group">
  //                 <label htmlFor="username">Username</label>
  //                 <Field
  //                   type="text"
  //                   name="username"
  //                   value={values.username}
  //                   onChange={handleChange}
  //                   onBlur={handleBlur}
  //                 />
  //                 <ErrorMessage name="username" />
  //               </div>
  //               <div className="form-group">
  //                 <label htmlFor="password">Password</label>
  //                 <Field
  //                   type="password"
  //                   name="password"
  //                   value={values.password}
  //                   onChange={handleChange}
  //                   onBlur={handleBlur}
  //                 />
  //                 <ErrorMessage name="password" />
  //               </div>
  //               <div className="form-group">
  //                 <label htmlFor="firstName">First Name</label>
  //                 <Field
  //                   type="text"
  //                   name="firstName"
  //                   value={values.firstName}
  //                   onChange={handleChange}
  //                   onBlur={handleBlur}
  //                 />
  //                 <ErrorMessage name="firstName" />
  //               </div>
  //               <div className="form-group">
  //                 <label htmlFor="lastName">Last Name</label>
  //                 <Field
  //                   type="text"
  //                   name="lastName"
  //                   value={values.lastName}
  //                   onChange={handleChange}
  //                   onBlur={handleBlur}
  //                 />
  //                 <ErrorMessage name="lastName" />
  //               </div>
  //               <div className="form-group">
  //                 <label htmlFor="email">Email</label>
  //                 <Field
  //                   type="email"
  //                   name="email"
  //                   value={values.email}
  //                   onChange={handleChange}
  //                   onBlur={handleBlur}
  //                 />
  //                 <ErrorMessage name="email" />
  //               </div>
  //               <div className="form-group">
  //                 <label htmlFor="city">City</label>
  //                 <Field
  //                   type="text"
  //                   name="city"
  //                   value={values.city}
  //                   onChange={handleChange}
  //                   onBlur={handleBlur}
  //                 />
  //                 <ErrorMessage name="city" />
  //               </div>
  //               <div className="form-group">
  //                 <label htmlFor="country">Country</label>
  //                 <Field
  //                   type="text"
  //                   name="country"
  //                   value={values.country}
  //                   onChange={handleChange}
  //                   onBlur={handleBlur}
  //                 />
  //                 <ErrorMessage name="country" />
  //               </div>
  //               <div className="form-group">
  //                 <label htmlFor="zipCode">Zip Code</label>
  //                 <Field
  //                   type="integer"
  //                   name="zipCode"
  //                   value={values.zipCode}
  //                   onChange={handleChange}
  //                   onBlur={handleBlur}
  //                 />
  //                 <ErrorMessage name="zipCode" />
  //               </div>
  //               <div className="form-group">
  //                 <label htmlFor="hobbies">Hobbies</label>
  //                 <Field
  //                   type="dropdown"
  //                   name="hobbies"
  //                   value={values.hobbies}
  //                   onChange={handleChange}
  //                   onBlur={handleBlur}
  //                 />
  //                 <ErrorMessage name="hobbies" />
  //               </div>
  //               <div className="form-group">
  //                 <label htmlFor="interests">Interests</label>
  //                 <Field
  //                   type="dropdown"
  //                   name="interests"
  //                   value={values.interests}
  //                   onChange={handleChange}
  //                   onBlur={handleBlur}
  //                 />
  //                 <ErrorMessage name="interests" />
  //               </div>
  //               <button type="submit">Submit</button>
  //             </Form>
  //           )}
  //         </Formik>
  //       </card>
  //     </Card>
  //   );
  // }

  const [formErrors, setFormErrors] = useState([]);

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
                <label>Interests</label>
                <input
                  name="interest"
                  className="form-control"
                  value={formData.interest}
                  onChange={handleChange}
                />
              </div>
              <Button
                type="submit"
                className="btn btn-primary float-right"
                onSubmit={handleSubmit}
              >
                Sign Up
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
