import React, { Component, useContext } from "react";
import { Link, NavLink, Route, Redirect } from "react-router-dom";
import UserContext from "../context/UserContext";

/** Higher order components for private routes
 * https://tylermcginnis.com/react-router-protected-routes-authentication/
 *
 * This component is used to wrap routes that should only be accessible
 * to logged in users. If the user is not logged in, they will be redirected
 * to the login page.
 *
 */

function PrivateRoute({ exact, path, children }) {
  const { currentUser } = useContext(UserContext);

  console.debug(
    "PrivateRoute",
    "exact=",
    exact,
    "path=",
    path,
    "currentUser=",
    currentUser
  );

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
}

export default PrivateRoute;
