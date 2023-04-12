// import * as React from "react";
// import { Link, NavLink } from "react-router-dom";

// const authContext = React.createContext();

// function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = React.useState(null);
//   const [auth, setAuth] = React.useState(false);

//   const value = {
//     currentUser,
//     setCurrentUser,
//     auth,
//     setAuth,
//   };

//   return <authContext.Provider value={value}>{children}</authContext.Provider>;
// }

// function useAuth() {
//   const context = React.useContext(authContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within a AuthProvider");
//   }
//   return context;
// }

// export { AuthProvider, useAuth };
