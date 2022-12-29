import React, { useState, useContext } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import Homepage from "./Homepage";
import LoginForm from "./forms/LoginForm";
import SignupForm from "./forms/SignupForm";
import ProfileForm from "./forms/ProfileForm";
import PrivateRoute from "./routes/PrivateRoute";
import useLocalStorage from "./hooks/useLocalStorage";
import UserContext from "./context/UserContext";
import UrGuideApi from "./api";
// import { useAuth0 } from "@auth0/auth0-react";

function Routes() {
  // const { user, isAuthenticated, isLoading } = useAuth0();
  const { currentUser } = useContext(UserContext);
  const [token, setToken] = useLocalStorage("token");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.debug("Router", "isLoggedIn=", isLoggedIn, "token =", token);

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
        <PrivateRoute exact path="/logout">
          <button onClick={logout}>Logout</button>
        </PrivateRoute>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}

// function Routes() {
//   const [isLoggedIn, setIsLoggedIn] = React.useState(false);
//   const { currentUser } = useContext(UserContext);
//   const [token, setToken] = useLocalStorage("token");
//   console.debug("Router", "isLoggedIn=", isLoggedIn, "token=", token);

//   async function login(data) {
//     const isLoggedIn = await UrGuideApi.login(data);
//     setIsLoggedIn(isLoggedIn);

//     if (isLoggedIn) {
//       setToken(isLoggedIn.token);
//     }

//     return isLoggedIn;
//   }

//   async function signup(data) {
//     const isLoggedIn = await UrGuideApi.signup(data);
//     setIsLoggedIn(isLoggedIn);

//     if (isLoggedIn) {
//       setToken(isLoggedIn.token);
//     }

//     return isLoggedIn;
//   }

//   async function logout() {
//     setIsLoggedIn(false);
//     setToken(null);
//     <Link to="/" />;
//   }

//   return (
//     <div className="Routes">
//       <Switch>
//         <Route exact path="/">
//           <Homepage />
//         </Route>
//         <Route exact path="/login">
//           <LoginForm login={login} />
//         </Route>
//         <Route exact path="/signup">
//           <SignupForm signup={signup} />
//         </Route>
//         <PrivateRoute exact path="/profile">
//           <ProfileForm />
//         </PrivateRoute>
//         <Link to="/" />
//       </Switch>
//     </div>
//   );

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

export default Routes;
