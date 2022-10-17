import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from "../auth/UserContext";




function Homepage() {
    const { currentUser } = useContext(UserContext);
    console.debug("Homepage", "currentUser=", currentUser);

    return (
        <div className="Homepage">
        <div className="container text-center">
        <h1 className="mb-4 font-weight-bold">UrGuide</h1>
        <p className="lead">Your guide to the world -- UrGuide</p>
        {currentUser ? <h2>
            Welcome back, {currentUser.firstName || currentUser.username}!
        </h2>
        : (
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