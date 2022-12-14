import React, { useContext, useState, Component } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

/** Navigation/Navbar component
 *
 * Props: login function, signup function, logout function
 * State: none
 * Context: currentUser
 * Routes -> Navigation
 *
 */

function Navigation({ logout }) {
  const history = useHistory();
  const { currentUser } = useContext(UserContext);

  function handleClick() {
    logout();
    history.push("/");
  }

  const loggedInNav = () => {
    return (
      <Nav className="mr-auto">
        <Nav.Link href="/profile">Profile</Nav.Link>
        <Nav.Link href="/" onClick={handleClick}>
          Log out {currentUser.firstName || currentUser.username}
        </Nav.Link>
      </Nav>
    );
  };

  const loggedOutNav = () => {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/signup">
            Sign Up
          </NavLink>
        </li>
      </ul>
    );
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">UrGuide</Navbar.Brand>
        <img
          alt=""
          className="d-inline-block align-left"
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
