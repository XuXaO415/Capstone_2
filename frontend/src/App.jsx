import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import UrGuideApi from "./api";

import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from "./Nav/Navigation";
import UserContext from "./context/UserContext";
import jwt from "jsonwebtoken";
import Routes from "./Routes";

export const TOKEN_STORAGE_ID = "UrGuide-token";

function App() {
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [currentUser, setCurrentUser] = useState({
    data: null,
    isLoaded: false,
  });
  const [currentUserId, setCurrentUserId] = useState({
    data: null,
    isLoaded: false,
  });

  useEffect(
    function loadUserInfo() {
      console.debug("App loadUserInfo", "loadUserInfo", "token=", token);

      async function getCurrentUser() {
        if (token) {
          try {
            let { username } = jwt.decode(token);

            let { id } = jwt.decode(token);

            UrGuideApi.token = token;

            let currentUser = await UrGuideApi.getCurrentUser(username);
            let currentUserId = await UrGuideApi.getCurrentUserId(id);

            setCurrentUser({
              data: currentUser,
              isLoaded: true,
            });
            setCurrentUserId({
              data: currentUserId,
              isLoaded: true,
            });
          } catch (err) {
            console.error("App loadUserInfo error", err);
            setCurrentUser({
              data: null,
              isLoaded: true,
            });
            setCurrentUserId({
              data: null,
              isLoaded: true,
            });
          }
        } else {
          setCurrentUser({
            data: null,
            isLoaded: true,
          });
          setCurrentUserId({
            data: null,
            isLoaded: true,
          });
        }
      }
      getCurrentUser();
    },
    [token]
  );

  /** Handle site-wide user logout */
  function logout() {
    setCurrentUser({
      data: null,
      isLoaded: true,
    });
    setToken(null);
  }

  /** Handle site-wide user login */

  async function login(loginData) {
    let token = await UrGuideApi.login(loginData);
    setToken(token);
  }

  /** Handles site-wide new user signup */
  async function signup(signupData) {
    let token = await UrGuideApi.signup(signupData);
    setToken(token);
  }

  return (
    <div className="App">
      <UserContext.Provider
        value={{ currentUser: currentUser.data, setCurrentUser }}
      >
        <BrowserRouter>
          <Navigation logout={logout} />
          <Routes
            currentUser={currentUser.data}
            login={login}
            signup={signup}
          />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

// const login = async (data) => {
//   if (token) {
//     try {
//       let token = await UrGuideApi.login(data);
//       setToken(token);
//       let { username } = jwt.decode(token);
//       let user = await UrGuideApi.getCurrentUser(username, token);
//       console.message("user", user);
//       setCurrentUser(user);
//     } catch (err) {
//       console.error("login failed", err);
//       return { login: false, err };
//     }
//   }
// };

// const signup = async (data) => {
//   try {
//     let token = await UrGuideApi.signup(data);
//     setToken(token);
//     let { username } = jwt.decode(token);
//     let user = await UrGuideApi.getCurrentUser(username);
//     setCurrentUser(user);

//     return { signup: true };
//   } catch (err) {
//     console.error("signup failed", err);
//     return { signup: false, err };
//   }
// };

// const update = async (data) => {
//   try {
//     let user = await UrGuideApi.updateProfile(data);
//     setCurrentUser(user);
//     return { update: true };
//   } catch (err) {
//     console.error("update failed", err);
//     return { update: false, err };
//   }
// };

// /** Handle logging out of user. */
// const logout = () => {
//   setCurrentUser(null);
//   setToken(null);
// };

//   return (
//     <div className="App">
//       <UserContext.Provider value={{ currentUser, setCurrentUser }}>
//         <BrowserRouter>
//           <Navigation logout={logout} />
//           <Routes login={login} signup={signup} update={update} />
//         </BrowserRouter>
//       </UserContext.Provider>
//     </div>
//   );
// }

//   useEffect(
//     function loadUserInfo() {
//       async function getCurrentUser() {
//         if (token) {
//           try {
//             let { username } = jwt.decode(token);
//             UrGuideApi.token = token;
//             let loadInfo = await UrGuideApi.getCurrentUser(username);
//             setCurrentUser(loadInfo);
//           } catch (err) {
//             console.error("App loadUserInfo error", err);
//             setCurrentUser(null);
//           }
//         }
//       }
//       getCurrentUser();
//     },
//     [token]
//   );

//   /** Handle logging in of user. */

//   async function loginUser(data) {
//     try {
//       let newUser = await UrGuideApi.login(data);
//       let { username } = jwt.decode(newUser.token);
//       UrGuideApi.token = newUser.token;
//       let loadInfo = await UrGuideApi.getCurrentUser(username);
//       setCurrentUser(loadInfo);
//       setToken(newUser.token);
//       return { login: true };
//     } catch (err) {
//       console.error("login failed", err);
//       return { login: false, err };
//     }
//   }

//   async function signupUser(data) {
//     try {
//       let newUser = await UrGuideApi.signup(data);
//       let { username } = jwt.decode(newUser.token);
//       UrGuideApi.token = newUser.token;
//       let loadInfo = await UrGuideApi.getCurrentUser(username);
//       setCurrentUser(loadInfo);
//       setToken(newUser.token);
//       return { signup: true };
//     } catch (err) {
//       console.error("signup failed", err);
//       return { signup: false, err };
//     }
//   }

//   async function updateUser(data) {
//     try {
//       let updatedUser = await UrGuideApi.updateProfile(data);
//       setCurrentUser(updatedUser);
//       return { update: true };
//     } catch (err) {
//       console.error("update failed", err);
//       return { update: false, err };
//     }
//   }

//   /** Handle logging out of user. */
//   function logout() {
//     setCurrentUser(null);
//     setToken(null);
//   }

//   return (
//     <div className="App">
//       <UserContext.Provider
//         value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn }}
//       >
//         <BrowserRouter>
//           <Navigation logout={logout} />
//           <Routes
//             login={loginUser}
//             signup={signupUser}
//             update={updateUser}
//             logout={logout}
//           />
//         </BrowserRouter>
//       </UserContext.Provider>
//     </div>
//   );
// }

// function App() {
//   const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
//   const [currentUser, setCurrentUser] = useState(null);
//   //works with this: const [currentUser, setCurrentUser] = useState(true);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   console.debug(
//     "App",
//     "token=",
//     token,
//     "currentUser=",
//     currentUser,
//     "isLoggedIn=",
//     isLoggedIn
//   );

//   useEffect(() => {
//     async function getUserInfo() {
//       if (token) {
//         try {
//           //destructured username
//           // let { username } = jwt.decode(token).username;
//           //original
//           let { username } = jwt.decode(token);
//           let user = await UrGuideApi.getCurrentUser(username);
//           setCurrentUser(user);
//         } catch (err) {
//           console.trace("App useEffect getUserInfo error", err);
//           setCurrentUser(null);
//         }
//       }
//     }
//     getUserInfo();
//   }, [token]);

//   /** Handle logging in of user. */

//   const login = async (data) => {
//     try {
//       let token = await UrGuideApi.login(data);
//       setToken(token);
//       return { login: true };
//     } catch (err) {
//       console.trace("login failed", err);

//       return { login: false, err };
//     }
//   };

//   // const login = (data) => {
//   //   async function loginUser() {
//   //     try {
//   //       let token = await UrGuideApi.login(data);
//   //       setToken(token);
//   //       return { success: true };
//   //     } catch (err) {
//   //       console.error("login failed", err);
//   //       return { success: false, err };
//   //     }
//   //   }
//   //   setIsLoggedIn(true);
//   //   loginUser();
//   // };

//   /** Handle logging out of user. */
//   function logout() {
//     setCurrentUser(null);
//     setToken(null);
//   }

//   const signup = async (data) => {
//     try {
//       let token = await UrGuideApi.signup(data);
//       setToken(token);
//       return { signup: true };
//     } catch (err) {
//       console.error("signup failed", err);
//       return { signup: false, err };
//     }
//   };

//   const updateProfile = async (data) => {
//     try {
//       let updatedUser = await UrGuideApi.updateProfile(data);
//       setCurrentUser(updatedUser);
//       return { update: true };
//     } catch (err) {
//       console.error("update failed", err);
//       return { update: false, err };
//     }
//   };

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
