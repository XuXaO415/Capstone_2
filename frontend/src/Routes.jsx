import React, { useState, useContext } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import Homepage from "./Homepage";
import LoginForm from "./forms/LoginForm";
import SignupForm from "./forms/SignupForm";
import ProfileForm from "./forms/ProfileForm";
import PrivateRoute from "./routes/PrivateRoute";

/** Routes for UrGuide
 *
 *
 *
 * - /login
 * - /signup
 * - /logout
 * - /profile
 *
 * Context:
 *  - currentUser => logged in user
 *
 */

// function Routes() {
//   const [currentUser] = useContext(UserContext);
//   const [token, setToken] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   console.debug(
//     "Router is working correctly,",
//     "currentUser =",
//     currentUser,
//     "isLoggedIn=",
//     isLoggedIn,
//     "token =",
//     token
//   );

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
//         <PrivateRoute exact path="/logout">
//           <button onClick={logout}>Logout</button>
//         </PrivateRoute>
//         <Route>
//           <Redirect to="/" />
//         </Route>
//       </Switch>
//     </div>
//   );
// }

function Routes({ login, signup, updateProfile }) {
  console.debug("Routes", `login=${typeof login}`, `signup=${typeof signup}`);

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
          <ProfileForm updateProfile={updateProfile} />
        </PrivateRoute>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}

export default Routes;
