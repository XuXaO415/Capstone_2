import React, { useContext, useState } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Navigation.css";

/** Navigation/Navbar component */
function Navigation({ logout }) {
  const { currentUser } = useContext(UserContext);

  function loggedInNav() {
    return (
      <ul className="navbar-nav ms-auto">
        <li className="nav-item me-4">
          <Nav className="mr-auto">
            <Nav.Link className="nav-link" href="/profile">
              Profile
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
          alt=""
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

// function Navigation({ logout }) {
//   const history = useHistory();
//   const { currentUser } = useContext(UserContext);

//   function handleClick() {
//     logout();
//     history.push("/");
//   }

//   const loggedInNav = () => {
//     return (
//       <Nav className="mr-auto">
//         <Nav.Link href="/profile">Profile</Nav.Link>
//         <Nav.Link href="/" onClick={handleClick}>
//           Log out {currentUser.firstName || currentUser.username}
//         </Nav.Link>
//       </Nav>
//     );
//   };

//   const loggedOutNav = () => {
//     return (
//       <ul className="navbar-nav ml-auto">
//         <li className="nav-item mr-4">
//           <NavLink className="nav-link" to="/login">
//             Login
//           </NavLink>
//         </li>
//         <li className="nav-item mr-4">
//           <NavLink className="nav-link" to="/signup">
//             Sign Up
//           </NavLink>
//         </li>
//       </ul>
//     );
//   };

//   return (
//     <Navbar bg="dark" variant="dark" expand="lg">
//       <Container>
//         <Navbar.Brand href="/">UrGuide</Navbar.Brand>
//         <img
//           alt=""
//           className="d-inline-block align-left"
//           src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/30/null/external-planet-protest-vitaliy-gorbachev-lineal-color-vitaly-gorbachev.png"
//         />
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           {currentUser ? loggedInNav() : loggedOutNav()}
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

export default Navigation;
