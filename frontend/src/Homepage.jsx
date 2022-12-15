import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "./context/UserContext";
import "./Homepage.css";
import { FontAwesome } from "@fortawesome/react-fontawesome";

function Homepage() {
  const { currentUser } = useContext(UserContext);

  console.debug("Homepage", "currentUser=", currentUser);

  return (
    <div className="Homepage Homepage-background">
      <div className="container text-center">
        <h1 className="mb-4 font-weight-bold">UrGuide</h1>
        <p className="lead-paragraph">Your friends</p>

        {currentUser ? (
          <h2>
            Welcome back, {currentUser.firstName || currentUser.username}!
          </h2>
        ) : (
          <p>
            <Link className="btn btn-primary font-weight-bold mr-3" to="/login">
              Log in
            </Link>
            <p className="second-paragraph">Your guide to the world.</p>
            <Link
              className="btn btn-primary font-weight-bold mr-3"
              to="/signup"
            >
              Sign up
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default Homepage;
