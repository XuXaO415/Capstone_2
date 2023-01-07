import React, { useEffect, useState, useContext } from "react";
import { useHistory, Redirect, NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import "./SignupForm.css";

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
    interests: "",
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

  useEffect(function updateTitle() {
    document.title = "Signup";
  }, []);

  async function handleChange(e) {
    const { name, value } = e.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let result = await signup(formData);
    if (result.success) {
      history.push("/profile");
    } else {
      setFormErrors(result.errors);
    }
  }

  if (signup.loggedIn) return <Redirect to="/" />;

  return (

    <div className="SignupForm">
      <h3 className="mb-3">Sign Up</h3>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCountry">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZipCode">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridHobbies">
            <Form.Label>Hobbies</Form.Label>
            <Form.Select name="hobbies" onChange={handleChange} required>
              <option value="">Choose...</option>
              <option value="1">Sightseeing</option>
              <option value="2">Gaming</option>
              <option value="3">Sports</option>
              <option value="4">Reading</option>
              <option value="5">Music</option>
              <option value="6">Cooking</option>
              <option value="7">Traveling</option>
              <option value="8">Shopping</option>
              <option value="9">Hiking</option>
              <option value

      </Form>










  //   <Container className="SignupForm">
  //     <h3 className="mb-3">Sign Up</h3>
  //     <Form onSubmit={handleSubmit}>
  //       <Form.Group as={Row} controlId="formHorizontalUsername">
  //         <Form.Label column sm={2}>
  //           Username
  //         </Form.Label>
  //         <Col sm={10}>
  //           <Form.Control
  //             type="text"
  //             name="username"
  //             value={formData.username}
  //             onChange={handleChange}
  //             required
  //           />
  //         </Col>
  //       </Form.Group>

  //       <Form.Group as={Row} controlId="formHorizontalPassword">
  //         <Form.Label column sm={2}>
  //           Password
  //         </Form.Label>
  //         <Col sm={10}>
  //           <Form.Control
  //             type="password"
  //             name="password"
  //             value={formData.password}
  //             onChange={handleChange}
  //             required
  //           />
  //         </Col>
  //       </Form.Group>

  //       <Form.Group as={Row} controlId="formHorizontalFirstName">
  //         <Form.Label column sm={2}>
  //           First Name
  //         </Form.Label>
  //         <Col sm={10}>
  //           <Form.Control
  //             type="text"
  //             name="firstName"
  //             value={formData.firstName}
  //             onChange={handleChange}
  //             required
  //           />
  //         </Col>
  //       </Form.Group>

  //       <Form.Group as={Row} controlId="formHorizontalLastName">
  //         <Form.Label column sm={2}>
  //           Last Name
  //         </Form.Label>
  //         <Col sm={10}>
  //           <Form.Control
  //             type="text"
  //             name="lastName"
  //             value={formData.lastName}
  //             onChange={handleChange}
  //             required
  //           />
  //         </Col>
  //       </Form.Group>

  //       <Form.Group as={Row} controlId="formHorizontalEmail">
  //         <Form.Label column sm={2}>
  //           Email
  //         </Form.Label>
  //         <Col sm={10}>
  //           <Form.Control
  //             type="email"
  //             name="email"
  //             value={formData.email}
  //             onChange={handleChange}
  //             required
  //           />
  //         </Col>
  //       </Form.Group>

  //       <Form.Group as={Row} controlId="formHorizontalCity">
  //         <Form.Label column sm={2}>
  //           City
  //         </Form.Label>
  //         <Col sm={10}>
  //           <Form.Control
  //             type="city"
  //             name="city"
  //             value={formData.city}
  //             onChange={handleChange}
  //             required
  //           />
  //         </Col>
  //       </Form.Group>

  //       <Form.Group as={Row} controlId="formHorizontalCountry">
  //         <Form.Label column sm={2}>
  //           Country
  //         </Form.Label>
  //         <Col sm={10}>
  //           <Form.Control
  //             type="country"
  //             name="country"
  //             value={formData.country}
  //             onChange={handleChange}
  //             required
  //           />
  //         </Col>
  //       </Form.Group>

  //       <Form.Group as={Row} controlId="formHorizontalZipCode">
  //         <Form.Label column sm={2}>
  //           Zip code
  //         </Form.Label>
  //         <Col sm={10}>
  //           <Form.Control
  //             type="zipCode"
  //             name="zipCode"
  //             value={formData.zipCode}
  //             onChange={handleChange}
  //             required
  //           />
  //         </Col>
  //       </Form.Group>

  //       <Form.Group as={Row} controlId="formHorizontalHobbies">
  //         <Form.Label column sm={2}>
  //           Hobbies
  //         </Form.Label>
  //         <Col sm={10}>
  //           <Form.Control
  //             type="hobbies"
  //             name="hobbies"
  //             value={formData.hobbies}
  //             onChange={handleChange}
  //             required
  //           />
  //         </Col>
  //       </Form.Group>

  //       <Form.Group as={Row} controlId="formHorizontalInterests">
  //         <Form.Label column sm={2}>
  //           Interests
  //         </Form.Label>
  //         <Col sm={10}>
  //           <Form.Control
  //             type="interests"
  //             name="interests"
  //             value={formData.interests}
  //             onChange={handleChange}
  //             required
  //           />
  //         </Col>
  //       </Form.Group>

  //       {formErrors.length
  //         ? formErrors.map((err) => (
  //             <Alert variant="danger" key={err}>
  //               {err}
  //             </Alert>
  //           ))
  //         : null}

  //       <Button variant="primary" type="submit">
  //         Submit
  //       </Button>
  //     </Form>
  //   </Container>
  // );
}

// function SignupForm({ signup }) {
//   const history = useHistory();
//   const initialValues = {
//     username: "",
//     password: "",
//     firstName: "",
//     lastName: "",
//     email: "",
//     city: "",
//     country: "",
//     zipCode: "",
//     hobbies: "",
//     interests: "",
//   };

//   const SignupSchema = Yup.object().shape({
//     username: Yup.string()
//       .min(2, "Too Short!")
//       .max(30, "Username is too long is too long to remember!")
//       .required("Required"),
//     password: Yup.string()
//       .min(5, "Too Short!")
//       .max(30, "Password is too long!")
//       .required("Required"),
//     firstName: Yup.string()
//       .min(2, "Too Short!")
//       .max(30, "Is this really your name?")
//       .required("Required"),
//     lastName: Yup.string()
//       .min(2, "Too Short!")
//       .max(30, "Cool name?")
//       .required("Required"),
//     email: Yup.string().email("Invalid email").required("Required"),
//     city: Yup.string()
//       .min(2, "Please enter your city!")
//       .max(50, "That's a really long name!")
//       .required("Required"),
//     country: Yup.string()
//       .min(2, "Please enter your country!")
//       .max(50, "That's a really long name!")
//       .required("Required"),
//     zipCode: Yup.string()
//       .min(2, "Please enter your zip code!")
//       .max(10, "That's a really long name!")
//       .required("Required"),

//     //add hobbies and interests

//     interests: Yup.string()
//       .min(2, "Please enter your interests!")
//       .max(50, "That's a really long name!")
//       .required("Required"),

//     hobbies: Yup.string()
//       .min(2, "Please enter your hobbies!")
//       .max(50, "That's a really long name!")
//       .required("Required"),
//   });

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
//       <Card>
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
//       </Card>
//     </Card>
//   );
// }

// const [formErrors, setFormErrors] = useState([]);

// async function handleSubmit(e) {
//   e.preventDefault();
//   let result = await signup(formData);
//   if (result.success) {
//     setFormErrors([]);
//     history.push("/");
//   } else {
//     setFormErrors(result.errors);
//   }
// }

// function handleChange(e) {
//   const { name, value } = e.target;
//   setFormData((data) => ({ ...data, [name]: value }));
// }

// return (
//   <div className="SignupForm">
//     <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
//       <h3 className="mb-3">Sign Up</h3>
//       <div className="card">
//         <div className="card-body">
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label>Username</label>
//               <input
//                 name="username"
//                 className="form-control"
//                 value={formData.username}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-group">
//               <label>Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 className="form-control"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="form-group">
//               <label>First name</label>
//               <input
//                 name="firstName"
//                 className="form-control"
//                 value={formData.firstName}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-group">
//               <label>Last name</label>
//               <input
//                 name="lastName"
//                 className="form-control"
//                 value={formData.lastName}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-group">
//               <label>Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 className="form-control"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-group">
//               <label>City</label>
//               <input
//                 name="city"
//                 className="form-control"
//                 value={formData.city}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-group">
//               <label>Country</label>
//               <input
//                 name="country"
//                 className="form-control"
//                 value={formData.country}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-group">
//               <label>Zip Code</label>
//               <input
//                 name="zipCode"
//                 className="form-control"
//                 value={formData.zipCode}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-group">
//               <label>Hobbies</label>
//               <input
//                 name="hobbies"
//                 className="form-control"
//                 value={formData.hobbies}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-group">
//               <label>Interests</label>
//               <input
//                 name="interest"
//                 className="form-control"
//                 value={formData.interest}
//                 onChange={handleChange}
//               />
//             </div>
//             <Button
//               type="submit"
//               className="btn btn-primary float-right"
//               onSubmit={handleSubmit}
//             >
//               Sign Up
//             </Button>
//           </form>
//         </div>
//       </div>
//     </div>
//   </div>
// );

export default SignupForm;
