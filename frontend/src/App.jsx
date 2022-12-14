import React, { useState, useEffect } from "react";
import UrGuideApi from "./api";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Link,
  Route,
} from "react-router-dom";
import Routes from "./Routes";
import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from "./Nav/Navigation";
import UserContext from "./context/UserContext";
import jwt from "jsonwebtoken";

export const TOKEN_STORAGE_ID = "UrGuide-token";

/** App component
 *  - holds token in state
 * - on load, looks for "token" in localStorage
 * - if found, decodes to get username/user_id, then makes API call to get user info
 * - provides login/logout functions to child components
 * - provides currentUser to child components
 * - provides infoLoaded state to child components
 * - provides isLoggedIn state to child components
 * - if no token, renders login/signup forms
 * - if token, renders site routes
 * Routes -> App -> { Login, Signup }
 * Routes -> App -> Navigation -> { Home, Profile} -> { ProfileForm}
 *  */

// function App() {
//   const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [infoLoaded, setInfoLoaded] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(
//     function loadUserInfo() {
//       async function getCurrentUser() {
//         if (token) {
//           try {
//             UrGuideApi.token = token;
//             let { username } = jwt.decode(token);
//             let currentUser = await UrGuideApi.getCurrentUser(username);
//             setCurrentUser(currentUser);
//           } catch (err) {
//             console.error("App loadUserInfo: problem loading", err);
//             setCurrentUser(null);
//           }
//           setInfoLoaded(true);
//         }
//       }
//       setInfoLoaded(false);
//       getCurrentUser();
//     },
//     [token]
//   );

//   function logout() {
//     setCurrentUser(null);
//     setToken(null);
//   }

//   async function login(data) {
//     try {
//       let token = await UrGuideApi.login(data);
//       setToken(token);
//       return { success: true };
//     } catch (errors) {
//       console.error("login failed", errors);
//       return { success: false, errors };
//     }
//   }

//   async function signup(data) {
//     try {
//       let token = await UrGuideApi.signup(data);
//       setToken(token);
//       return { success: true };
//     } catch (errors) {
//       console.error("signup failed", errors);
//       return { success: false, errors };
//     }
//   }

//   async function updateProfile(data) {
//     try {
//       let user = await UrGuideApi.updateProfile(data);
//       setCurrentUser(user);
//       return { success: true };
//     } catch (errors) {
//       console.error("update user failed", errors);
//       return { success: false, errors };
//     }
//   }

//   return (
//     <div className="App">
//       <BrowserRouter>
//         <UserContext.Provider
//           value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn }}
//         >
//           <Navigation logout={logout} />

//           <Routes login={login} signup={signup} updateProfile={updateProfile} />
//         </UserContext.Provider>
//       </BrowserRouter>
//     </div>
//   );
// }

// function App() {
//   const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [infoLoaded, setInfoLoaded] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(true);

//   console.debug("App", { token, currentUser, infoLoaded, isLoggedIn });

//   useEffect(
//     function loadUserInfo() {
//       console.debug("App useEffect loadUserInfo", "token=", token);
//       async function getCurrentUser() {
//         if (token) {
//           try {
//             UrGuideApi.token = token;
//             let { username } = jwt.decode(token);
//             let user = await UrGuideApi.getCurrentUser(username);
//             setCurrentUser(user);
//           } catch (err) {
//             console.error("App loadUserInfo: problem loading", err);
//             setCurrentUser(null);
//           }
//         }
//         setInfoLoaded(true);
//       }
//       setInfoLoaded(false);
//       getCurrentUser();
//     },
//     [token]
//   );

//   function login(formData) {
//     async function loginUser() {
//       try {
//         let token = await UrGuideApi.login(formData);
//         setToken(token);
//         return {
//           success: true,
//           setInfoLoaded: true,
//           setIsLoggedIn: true,
//           login: true,
//         };
//       } catch (err) {
//         console.error("login failed", err);
//         return { success: false, err };
//       }
//     }
//     setIsLoggedIn(true);
//     return loginUser();
//   }

//   function signup(data) {
//     async function signupUser() {
//       try {
//         let token = await UrGuideApi.signup(data);
//         setToken(token);
//         return { success: true };
//       } catch (err) {
//         console.error("signup failed", err);
//         return { success: false };
//       } finally {
//         setInfoLoaded(true);
//       }
//     }
//     setIsLoggedIn(true);
//     return signupUser();
//   }

//   function logout() {
//     setCurrentUser(null);
//     setToken(null);
//     setIsLoggedIn(false);
//   }

//   async function updateProfile(data) {
//     try {
//       let user = await UrGuideApi.updateProfile(data);
//       setCurrentUser(user);
//       return { success: true };
//     } catch (err) {
//       console.error("updateProfile failed", err);
//       return { success: false, update: false, err };
//     }
//   }

//   return (
//     <BrowserRouter>
//       <UserContext.Provider
//         value={{
//           currentUser,
//           setCurrentUser,
//           login,
//           signup,
//           logout,
//           updateProfile,
//           isLoggedIn,
//           setIsLoggedIn,
//         }}
//       >
//         <div className="App">
//           <Navigation logout={logout} />
//           <Routes
//             login={login}
//             signup={signup}
//             logout={logout}
//             updateProfile={updateProfile}
//           />
//         </div>
//       </UserContext.Provider>
//     </BrowserRouter>
//   );
// }

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  console.debug("App", { token, currentUser, infoLoaded, isLoggedIn });

  useEffect(
    function loadUserInfo() {
      async function getCurrentUser() {
        try {
          UrGuideApi.token = token;
          let { username } = jwt.decode(token);
          let user = await UrGuideApi.getCurrentUser(username);
          setCurrentUser(user);
          setIsLoggedIn(false);
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
          setIsLoggedIn(false);
          return;
        }
      }
      setInfoLoaded(false);
      getCurrentUser();
    },
    [token]
  );

  function login(formData) {
    async function loginUser() {
      try {
        let token = await UrGuideApi.login(formData);
        setToken(token);
        return { success: true };
      } catch (err) {
        console.error("login failed", err);
        return { success: false };
      }
    }
    setIsLoggedIn(true);
    return loginUser();
  }

  function signup(formData) {
    async function signupUser() {
      try {
        let token = await UrGuideApi.signup(formData);
        setToken(token);
        return { success: true };
      } catch (err) {
        console.error("signup failed", err);
        return { success: false };
      }
    }
    setIsLoggedIn(true);
    return signupUser();
  }

  function logout() {
    setToken(null);
    setCurrentUser(null);
  }

  function updateProfile(formData) {
    async function updateUser() {
      try {
        let updatedUser = await UrGuideApi.updateProfile(
          currentUser.username,
          formData
        );
        setCurrentUser((currentUser) => ({ ...currentUser, ...updatedUser }));
        return { msg: "Profile updated successfully", success: true };
      } catch (err) {
        console.error("updateProfile failed", err);
        return {
          msg: "Profile update failed",
          err,
          success: false,
          typeof: typeof err,
          type: err.type,
        };
      }
    }
    return updateProfile();
  }

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={currentUser}>
          <Navigation logout={logout} />
          <Routes
            login={login}
            signup={signup}
            logout={logout}
            updateProfile={updateProfile}
          />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
