import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../context/UserContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Navigation.css";

/** Navigation/Navbar component */
function Navigation({ logout }) {
  const { currentUser } = useContext(UserContext);

  console.debug("Navigation", "currentUser=", currentUser);

  function loggedInNav() {
    return (
      <ul className="navbar-nav ms-auto">
        <li className="nav-item me-4">
          <Nav className="mr-auto">
            <Nav.Link className="nav-link" href="/profile">
              Profile
            </Nav.Link>
            <Nav.Link className="nav-link" href="/matches">
              Matches
            </Nav.Link>
            <Nav.Link className="nav-link" href="/likes">
              Likes
            </Nav.Link>
            <Nav.Link href="/" onClick={logout}>
              Log out {currentUser.first_name || currentUser.username}
            </Nav.Link>
          </Nav>
        </li>
      </ul>
    );
  }

  function loggedOutNav() {
    return (
      <ul className="navbar-nav ms-auto">
        <li className="nav-item me-4">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
        <li className="nav-item me-4">
          <NavLink className="nav-link" to="/signup">
            Sign Up
          </NavLink>
        </li>
      </ul>
    );
  }

  return (
    <Navbar
      className="Navigation navbar navbar-expand-md"
      bg="dark"
      variant="dark"
      expand="lg"
    >
      <Container className="container-fluid">
        <Navbar.Brand href="/">UrGuide</Navbar.Brand>
        <img
          alt="planet icon"
          src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/30/null/external-planet-protest-vitaliy-gorbachev-lineal-color-vitaly-gorbachev.png"
        />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {currentUser ? loggedInNav() : loggedOutNav()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
