import * as React from "react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import "./Homepage.css";

function Homepage() {
  const { currentUser } = useContext(UserContext);
  const [message, setMessage] = useState("Welcome to UrGuide!");

  console.debug("Homepage", "currentUser=", currentUser);
  console.debug(
    "Homepage",
    "message =",
    Boolean(message),
    "if true, showing message =",
    message
  );

  return (
    <div className="Homepage Homepage-Background">
      <div className="container text-lg-center">
        <h1 className="mb-4 font-weight-bold">UrGuide</h1>
        <p className="lead-paragraph">Your guide to the world -- UrGuide</p>
        {currentUser ? (
          <h2>
            Welcome back, {currentUser.firstName || currentUser.username}!
          </h2>
        ) : (
          <p>
            <Link className="btn btn-primary font-weight-bold" to="/login">
              Log in
            </Link>
            <Link className="btn btn-primary font-weight-bold" to="/signup">
              Sign up
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default Homepage;
