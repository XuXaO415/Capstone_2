import React, { useEffect, useState, useContext } from "react";
import { useHistory, Redirect, NavLink, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
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
    state: "",
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

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await signup(formData);
      history.push("/profile");
    } catch (err) {
      setFormErrors(err);
    }
  }

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   let result = await signup(formData);
  //   if (result.success) {
  //     let mes = "You have successfully signed up!";
  //     alert(mes);
  //     history.push("/profile");
  //   } else {
  //     setFormErrors(result.errors);
  //   }
  // }

  // if (formData.interests === formData.hobbies) {
  //   setFormErrors(["Interests and hobbies cannot be the same"]);
  // }

  return (
    <Container className="SignupForm">
      <div className="container col-md-8">
        <h3 className="mb-3">Sign Up</h3>
        <Form onSubmit={handleSubmit}>
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

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZipCode">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                type="number"
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
                <option value="10">Nightlife</option>
                <option value="11">Food</option>
                <option value="12">Movies</option>
                <option value="13">Art</option>
                <option value="14">Yoga</option>
                <option value="15">Dancing</option>
                <option value="16">Museums</option>
                <option value="17">Gardening</option>
                <option value="18">Traveling</option>
                <option value="19">Photography</option>
                <option value="20">Pets</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridInterests">
              <Form.Label>Interests</Form.Label>
              <Form.Select name="interests" onChange={handleChange} required>
                <option value="">Choose...</option>
                <option value="1">Sightseeing</option>
                <option value="2">Gaming</option>
                <option value="4">Reading</option>
                <option value="5">Music</option>
                <option value="6">Cooking</option>
                <option value="7">Traveling</option>
                <option value="8">Shopping</option>
                <option value="9">Hiking</option>
                <option value="10">Nightlife</option>
                <option value="11">Food</option>
                <option value="12">Movies</option>
                <option value="13">Art</option>
                <option value="14">Yoga</option>
                <option value="15">Dancing</option>
                <option value="16">Museums</option>
                <option value="17">Gardening</option>
                <option value="18">Traveling</option>
                <option value="19">Photography</option>
                <option value="20">Pets</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Button variant="primary" type="submit" onSubmit={handleSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default SignupForm;
