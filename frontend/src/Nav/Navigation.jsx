import React, { useContext, useState } from "react";
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
import "./Navigation.css";

function Navigation({ logout }) {
  const { currentUser } = useContext(UserContext);
  const [token, setToken] = useLocalStorage("token");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.debug("Navigation", "isLoggedIn=", isLoggedIn, "token =", token);

  function loggedInNav() {
    return (
      <Nav className="mr-auto">
        <Nav.Link href="/" onClick={logout}>
          Log out {currentUser.first_name || currentUser.username}
        </Nav.Link>
      </Nav>
    );
  }

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
    <nav className="Navigation navbar navbar-expand-md navbar-dark bg-light">
      <NavLink className="navbar-brand" to="/">
        UrGuide
      </NavLink>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {currentUser ? loggedInNav() : loggedOutNav()}
      </Navbar.Collapse>
    </nav>
  );
}

// function Navigation({ logout }) {
//   const { currentUser } = useContext(UserContext);

//   console.debug(
//     "Navigation",
//     "login=",
//     typeof login,
//     "currentUser=",
//     currentUser,
//     "logout=",
//     typeof logout
//   );

//   function loggedInNav() {
//     return (
//       <Nav className="mr-auto">
//         <Nav.Link href="/" onClick={logout}>
//           Log out {currentUser.first_name || currentUser.username}
//         </Nav.Link>
//       </Nav>
//     );
//   }

//   function loggedOutNav() {
//     return (
//       // <Nav className="mr-auto">
//       //   <Nav.Link href="/login">Login</Nav.Link>
//       //   <Nav.Link href="/signup">Sign Up</Nav.Link>
//       // </Nav>
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
//   }

//   return (
//     <nav className="Navigation navbar navbar-expand-md navbar-dark bg-light">
//       <NavLink className="navbar-brand" to="/">
//         UrGuide
//       </NavLink>
//       {currentUser ? loggedInNav() : loggedOutNav()}
//     </nav>
//   );
// }

export default Navigation;
