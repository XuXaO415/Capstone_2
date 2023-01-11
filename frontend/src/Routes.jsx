import React, { useState, useContext } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import Homepage from "./Homepage";
import LoginForm from "./forms/LoginForm";
import SignupForm from "./forms/SignupForm";
import ProfileForm from "./forms/ProfileForm";
import PrivateRoute from "./routes/PrivateRoute";
import UserContext from "./context/UserContext";
import UrGuideApi from "./api";

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

function Routes({ login, signup, updateProfile }) {
  const { currentUser } = useContext(UserContext);

  const loginLocation = {
    pathname: "/login",
    state: {
      msg: "You must be logged in to view this page",
    },
  };

  // const signupLocation = {
  //   pathname: "/signup",
  //   state: {
  //     msg: "In order to use this site, you must sign up",
  //   },
  // };

  return (
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
        {currentUser ? (
          <ProfileForm updateProfile={updateProfile} />
        ) : (
          <Redirect to={loginLocation} />
        )}
      </PrivateRoute>
      <PrivateRoute exact path="/logout">
        {currentUser ? <Redirect to="/" /> : <Redirect to={loginLocation} />}
      </PrivateRoute>
    </Switch>
  );
}

// // function Routes({ login, signup, updateProfile }) {
// //   const { currentUser } = useContext(UserContext);
// //   const loginLocation = {
// //     pathname: "/login",
// //     // eslint-disable-next-line no-restricted-globals
// //     state: { from: location },
// //   };
// //   const signupLocation = {
// //     pathname: "/signup",
// //     // eslint-disable-next-line no-restricted-globals
// //     state: { from: location },
// //   };
// //   const profileLocation = {
// //     pathname: "/profile",
// //     // eslint-disable-next-line no-restricted-globals
// //     state: { from: location },
// //   };
// //   const logoutLocation = {
// //     pathname: "/logout",
// //     // eslint-disable-next-line no-restricted-globals
// //     state: { from: location },
// //   };

// //   return (
// //     <Switch>
// //       <Route exact path="/">
// //         <Homepage />
// //       </Route>
// //       <Route exact path="/login">
// //         <LoginForm login={login} />
// //       </Route>
// //       <Route exact path="/signup">
// //         <SignupForm signup={signup} />
// //       </Route>
// //       <PrivateRoute exact path="/profile">
// //         {currentUser ? <ProfileForm /> : <Redirect to={profileLocation} />}
// //       </PrivateRoute>
// //       <PrivateRoute exact path="/logout">
// //         {currentUser ? (
// //           <Redirect to={logoutLocation} />
// //         ) : (
// //           <Redirect to={loginLocation} />
// //         )}
// //       </PrivateRoute>
// //       <Route>
// //         <Redirect to="/" />
// //       </Route>
// //     </Switch>
// //   );
// // }

// function Routes() {
//   const { currentUser } = useContext(UserContext);
//   const [token, setToken] = useLocalStorage("token");
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
