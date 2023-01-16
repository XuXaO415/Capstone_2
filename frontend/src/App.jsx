import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import UrGuideApi from "./api";

import Routes from "./Routes";
import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from "./Nav/Navigation";
import UserContext from "./context/UserContext";
import jwt from "jsonwebtoken";

export const TOKEN_STORAGE_ID = "UrGuide-token";

function App() {
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [currentUser, setCurrentUser] = useState(null);
  //works with this: const [currentUser, setCurrentUser] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.debug(
    "App",
    "token=",
    token,
    "currentUser=",
    currentUser,
    "isLoggedIn=",
    isLoggedIn
  );

  useEffect(() => {
    async function getUserInfo() {
      if (token) {
        try {
          //destructured username
          // let { username } = jwt.decode(token).username;
          //original
          let { username } = jwt.decode(token);
          let currentUser = await UrGuideApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch (err) {
          console.trace("App useEffect getUserInfo error", err);
          setCurrentUser(null);
        }
      }
    }
    getUserInfo();
  }, [token]);

  /** Handle logging in of user. */

  const login = async (data) => {
    try {
      let token = await UrGuideApi.login(data);
      setToken(token);
      return { login: true };
    } catch (err) {
      console.trace("login failed", err);
      // console.error("login failed", err);
      return { login: false, err };
    }
  };

  // const login = (data) => {
  //   async function loginUser() {
  //     try {
  //       let token = await UrGuideApi.login(data);
  //       setToken(token);
  //       return { success: true };
  //     } catch (err) {
  //       console.error("login failed", err);
  //       return { success: false, err };
  //     }
  //   }
  //   setIsLoggedIn(true);
  //   loginUser();
  // };

  /** Handle logging out of user. */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  const signup = async (data) => {
    try {
      let token = await UrGuideApi.signup(data);
      setToken(token);
      return { signup: true };
    } catch (err) {
      console.error("signup failed", err);
      return { signup: false, err };
    }
  };

  const updateProfile = async (data) => {
    try {
      let updatedUser = await UrGuideApi.updateProfile(data);
      setCurrentUser(updatedUser);
      return { update: true };
    } catch (err) {
      console.error("update failed", err);
      return { update: false, err };
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <Navigation logout={logout} />
          <Routes login={login} signup={signup} updateProfile={updateProfile} />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

// function App() {
//   const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID, "token");
//   const [currentUser, setCurrentUser] = useState(null);
//   const [infoLoaded, setInfoLoaded] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   console.debug(
//     "App",
//     "token=",
//     token,
//     "currentUser=",
//     currentUser,
//     "infoLoaded=",
//     infoLoaded
//   );

//   useEffect(
//     function loadUserInfo() {
//       console.debug("App useEffect loadUserInfo", "token=", token);
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
//       return getCurrentUser;
//     },
//     [token]
//   );

//   function logout() {
//     setCurrentUser(null);
//     setToken(null);
//   }

//   async function login(data) {
//     console.debug("App login", "data=", data);
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
//         <UserContext.Provider value={{ currentUser, setCurrentUser }}>
//           <Navigation logout={logout} />

//           <Routes login={login} signup={signup} updateProfile={updateProfile} />
//         </UserContext.Provider>
//       </BrowserRouter>
//     </div>
//   );
// }

export default App;
