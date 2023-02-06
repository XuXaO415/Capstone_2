import React, { useState, useContext } from "react";
import { Switch, Route, Link, NavLink, Redirect } from "react-router-dom";
import Homepage from "./Homepage";
import LoginForm from "./forms/LoginForm";
import SignupForm from "./forms/SignupForm";
import ProfileForm from "./forms/ProfileForm";
import PrivateRoute from "./routes/PrivateRoute";
import MatchDetail from "./matches/MatchDetail";
import MatchList from "./matches/MatchList";

function Routes({
  login,
  signup,
  updateProfile,
  currentUser,
  like,
  unlike,
  potentialMatches,
}) {
  console.debug("Routes", `login=${typeof login}`, `signup=${typeof signup}`);

  return (
    <div className="Routes">
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        {!currentUser && (
          <>
            <Route exact path="/login">
              <LoginForm login={login} />
            </Route>
            <Route exact path="/signup">
              <SignupForm signup={signup} />
            </Route>
          </>
        )}
        <Route exact path="/">
          <Homepage />
        </Route>
        {currentUser && (
          <>
            <PrivateRoute exact path="/profile">
              <ProfileForm updateProfile={updateProfile} />
            </PrivateRoute>

            <PrivateRoute exact path="/matches">
              <MatchList potentialMatches={potentialMatches} />
            </PrivateRoute>

            <PrivateRoute exact path="/matches">
              <MatchDetail like={like} dislike={unlike} />
            </PrivateRoute>
          </>
        )}
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}

// return (
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
//         <ProfileForm updateProfile={updateProfile} />
//       </PrivateRoute>
//       <Route>
//         <Redirect to="/" />
//       </Route>
//     </Switch>
//   </div>
// );
//}

// function Routes({ login, signup, currentUser }) {
//   console.debug(
//     "PrivateRoute",
//     "login=",
//     login,
//     "signup=",
//     signup,
//     "currentUser=",
//     currentUser
//   );

//   return (
//     <div className="pt-5">
//       <Switch>
//         {!currentUser && (
//           <>
//             <Route exact path="/login" element={<LoginForm login={login} />} />
//             <Route
//               exact
//               path="/signup"
//               element={<SignupForm signup={signup} />}
//             />
//           </>
//         )}
//         <Route exact path="/" element={<Homepage />} />

//         {currentUser && (
//           <>
//             <Route exact path="/profile" element={<ProfileForm />} />
//           </>
//         )}
//         <Route exact path="*" element={<Homepage />} />
//       </Switch>
//     </div>
//   );
// }

export default Routes;
