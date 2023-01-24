import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "./context/UserContext";
import "./Homepage.css";
import Button from "react-bootstrap/Button";

const Homepage = () => {
  const { currentUser } = useContext(UserContext);

  /** Add this back later */
  // const history = useHistory();

  // useEffect(() => {
  //   if (currentUser) history.push("/profile");
  // }, [currentUser, history]);

  console.debug("Homepage", "currentUser=", currentUser);

  // return (
  //   <div className="Homepage Homepage-background">
  //     <div className="container text-center">
  //       <h1 className="lead-paragraph mb-4 font-weight-bold">UrGuide</h1>
  //       <p className="second-paragraph">Your friends, your guides.</p>
  //       {currentUser ? (
  //         <h2>
  //           Welcome Back, {currentUser.firstName || currentUser.username}!
  //         </h2>
  //       ) : (
  //         <p>
  //           <Link className="btn btn-primary fw-bold me-3" to="/login">
  //             Log in
  //           </Link>
  //           <Link className="btn btn-primary fw-bold" to="/signup">
  //             Sign up
  //           </Link>
  //         </p>
  //       )}
  //     </div>
  //   </div>
  // );

  //Fix this later
  return (
    <div className="Homepage Homepage-background">
      <div className="container text-center">
        <h1 className="lead-paragraph mb-4 font-weight-bold">UrGuide</h1>
        <p className="second-paragraph">Your friends, your guides.</p>
        {currentUser ? (
          <h2>
            Welcome back,{" "}
            <span className="font-weight-bold">
              {currentUser.firstName || currentUser.userName}!
            </span>
            !
          </h2>
        ) : (
          <p>
            <Link to="/login">
              <Button color="primary" className="btn-md font-weight-bold">
                Log In
              </Button>
            </Link>
          </p>
        )}
        <Link to="/signup">
          <Button color="primary" className="btn-md font-weight-bold">
            Sign Up
          </Button>
        </Link>
        <br />
        <p className="mt-3">Already have an account?</p>
        <Link to="/login">
          <Button color="primary" className="btn-md font-weight-bold">
            Log In
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
