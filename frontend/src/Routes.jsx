import * as React from "react";
import { Link, BrowserRouter } from "react-router-dom";
import { matchPath, Route } from "react-router";
import Homepage from "./homepage/Homepage";
import LoginForm from "./auth/LoginForm";
import SignupForm from "./auth/SignupForm";
import ProfileForm from "./auth/ProfileForm";
import PrivateRoute from "./routes/PrivateRoute";
import UserContext from "./context/UserContext";

function Routes({ login, signup }) {
  // const { currentUser } = useContext(UserContext);
  console.debug("Routes", "login=", typeof login);

  return (
    <div className="Routes">
      <matchPath>
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
        <BrowserRouter to="/" />
      </matchPath>
    </div>
  );
}

// function Routes() {
//   return (
//     <div className="Route">
//       <Link>
//         <Route exact path="/">
//           <Homepage />
//         </Route>
//         <Route exact path="/login">
//           <LoginForm />
//         </Route>
//         <Route exact path="/signup">
//           <SignupForm />
//         </Route>
//         <Route exact path="/profile">
//           <ProfileForm />
//         </Route>
//         <Link to="/" />
//       </Link>
//     </div>
//   );
// }

export default Routes;
