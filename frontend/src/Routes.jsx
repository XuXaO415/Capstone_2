import React, { useState, useContext } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Homepage from "./Homepage";
import LoginForm from "./forms/LoginForm";
import SignupForm from "./forms/SignupForm";
import ProfileForm from "./forms/ProfileForm";
import PrivateRoute from "./routes/PrivateRoute";
import useLocalStorage from "./hooks/useLocalStorage";
import UrGuideApi from "./api";
import UserContext from "./context/UserContext";

function Routes() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const { currentUser } = useContext(UserContext);
  const [token, setToken] = useLocalStorage("token");
  console.debug("Router", "isLoggedIn=", isLoggedIn, "token=", token);

  async function login(data) {
    const isLoggedIn = await UrGuideApi.login(data);
    setIsLoggedIn(isLoggedIn);

    if (isLoggedIn) {
      setToken(isLoggedIn.token);
    }

    return isLoggedIn;
  }

  async function signup(data) {
    const isLoggedIn = await UrGuideApi.signup(data);
    setIsLoggedIn(isLoggedIn);

    if (isLoggedIn) {
      setToken(isLoggedIn.token);
    }

    return isLoggedIn;
  }

  async function logout() {
    setIsLoggedIn(false);
    setToken(null);
    <Link to="/" />;
  }

  return (
    <div className="Routes">
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/login">
          <LoginForm login={login} />
        </Route>
        <Route exact path="/signup">
          <SignupForm signup={signup} />
        </Route>
        <PrivateRoute exact path="/profile">
          <ProfileForm />
        </PrivateRoute>
        <Link to="/" />
      </Switch>
    </div>
  );

  // return () => {
  //   <div className="Routes">
  //     <Switch>
  //       <Route exact path="/">
  //         <Homepage />
  //       </Route>
  //       <Route exact path="/login">
  //         <LoginForm login={login} />
  //       </Route>
  //       <Route exact path="/signup">
  //         <SignupForm signup={signup} />
  //       </Route>
  //       <PrivateRoute exact path="/profile">
  //         <ProfileForm />
  //       </PrivateRoute>
  //       <Link to="/" />
  //     </Switch>
  //   </div>;
  // };
}

export default Routes;
