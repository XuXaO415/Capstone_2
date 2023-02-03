import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "./context/UserContext";
import "./Homepage.css";
import Button from "react-bootstrap/Button";

function Homepage() {
  const { currentUser } = useContext(UserContext);
  console.debug("Homepage", "currentUser=", currentUser);

  return (
    <div className="Homepage Homepage-background">
      <div className="container text-center">
        <h1 className="lead-paragraph mb-1 font-weight-bold">UrGuide</h1>
        <p className="second-paragraph font-weight-bold font-italic">
          Your friends, your guides.
        </p>
        {currentUser ? (
          <h2>
            Welcome back,{" "}
            <span className="font-weight-bold">
              {currentUser.firstName || currentUser.userName}!
              <h5>Ready to see your matches?</h5>
              <Link to="/profile">
                <Button color="primary" className="btn-sm font-weight-bold">
                  Profile
                </Button>
                <br></br>
                {/* <Link to="/matches">
                  <Button color="primary" className="btn-sm font-weight-bold">
                    Let's go!
                  </Button>
                </Link> */}
              </Link>
            </span>
          </h2>
        ) : (
          <Link to="/signup">
            <Button color="primary" className="btn-md font-weight-bold">
              Sign Up
            </Button>
          </Link>
        )}
        <br />
        <p className="mt-3 font-weight-bold">Already have an account?</p>
        <Link to="/login">
          <Button color="primary" className="btn-md font-weight-bold">
            Log In
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
