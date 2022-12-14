import React, { useContext, useState, useEffect } from "react";
import { Link, Route } from "react-router-dom";
import UserContext from "./context/UserContext";
import "./Homepage.css";

function Homepage() {
  const { currentUser } = useContext(UserContext);

  console.debug("Homepage", "currentUser=", currentUser);

  return (
    <div className="Homepage App-header mt-5">
      <div className="container text-center">
        <h1 className="h1-welcome">Welcome to UrGuide</h1>
        <p className="lead-paragraph">Your Friends are your best guides.</p>
        <p className="second lead-paragraph">
          UrGuide is a platform for you to share your favorite places.
        </p>
        {currentUser ? (
          <h2>Welcome back, {currentUser.username}</h2>
        ) : (
          <center>
            <Link to="/login" className="btn btn-primary">
              Log in
            </Link>
            <Link to="/signup" className="btn btn-primary">
              Sign up
            </Link>
          </center>
        )}
      </div>
    </div>
  );
}

export default Homepage;
