import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "./context/UserContext";
import "./Homepage.css";
import { Button } from "reactstrap";

function Homepage() {
  const { currentUser } = useContext(UserContext);
  // const history = useHistory();

  // useEffect(() => {
  //   if (currentUser) {
  //     history.push("/profile");
  //   }
  // }, [currentUser, history]);

  console.debug("Homepage", "currentUser=", currentUser);

  return (
    <div className="Homepage Homepage-background">
      <div className="container text-center">
        <h1 className="mb-4 font-weight-bold">UrGuide</h1>
        <p className="lead-paragraph">Your friends, your guides.</p>

        <Link to="/signup">
          <Button color="primary" className="btn-lg">
            Sign Up
          </Button>
        </Link>

        <span className="mb-4">or</span>

        <Link to="/login">
          <Button color="primary" className="btn-lg">
            Log In
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
