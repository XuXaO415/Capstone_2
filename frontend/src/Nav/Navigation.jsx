import React, { Component, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../context/UserContext";
import ProfileForm from "../forms/ProfileForm";
import PrivateRoute from "../routes/PrivateRoute";
import useLocalStorage from "../hooks/useLocalStorage";
import UrGuideApi from "../api";
import SignupForm from "../forms/SignupForm";
import LoginForm from "../forms/LoginForm";
import Homepage from "../Homepage";
import { Navbar, Nav, Container } from "react-bootstrap";

function Navigation({ logout }) {
  const { currentUser } = useContext(UserContext);

  console.debug(
    "Navigation",
    "login=",
    typeof login,
    "currentUser=",
    currentUser,
    "logout=",
    typeof logout
  );

  function loggedInNav() {
    return (
      <Nav className="mr-auto">
        <Nav.Link href="/" onClick={logout}>
          Log out {currentUser.first_name || currentUser.username}
        </Nav.Link>
      </Nav>
    );
  }

  function loggedOutNav() {
    return (
      <Nav className="mr-auto">
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/signup">Sign Up</Nav.Link>
      </Nav>
    );
  }

  return (
    <div className="Navigation">
      <Navbar bg="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            UrGuide
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {currentUser ? loggedInNav() : loggedOutNav()}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

// function Navigation({ logout }) {
//   const { currentUser } = useContext(UserContext);

//   function loggedInNav() {
//     return (
//       <ul className="navbar-nav ml-auto">
//         <li className="nav-item">
//           <NavLink className="nav-link" to="/matches">
//             Matches
//           </NavLink>
//         </li>
//         <li className="nav-item">
//           <NavLink className="nav-link" to="/profile">
//             Profile
//           </NavLink>
//         </li>
//         <li className="nav-item">
//           <NavLink className="nav-link" to="/" onClick={logout}>
//             Log out {currentUser.first_name || currentUser.username}
//           </NavLink>
//         </li>
//       </ul>
//     );
//   }

//   function loggedOutNav() {
//     return (
//       <ul className="navbar-nav ml-auto">
//         <li className="nav-item">
//           <NavLink className="nav-link" to="/login">
//             Login
//           </NavLink>
//         </li>
//         <li className="nav-item">
//           <NavLink className="nav-link" to="/signup">
//             Sign Up
//           </NavLink>
//         </li>
//       </ul>
//     );
//   }

//   return (
//     <nav className="navbar navbar-expand-md navbar-dark bg-dark">
//       <Link className="navbar-brand" to="/"></Link>
//       <button>
//         <span className="navbar-toggler-icon"></span>
//       </button>
//       <div className="collapse navbar-collapse" id="navbarNav">
//         {currentUser ? loggedInNav() : loggedOutNav()}
//       </div>
//     </nav>
//   );
// }

export default Navigation;
