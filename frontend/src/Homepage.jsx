import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "./context/UserContext";
import "./Homepage.css";
import { Button } from "reactstrap";

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
          <div>
            <Button
              color="primary"
              outline
              href="/login"
              className="btn btn-lg font-weight-bold mr-3"
              value="Login"
            >
              Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Homepage;
