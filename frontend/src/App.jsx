import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import UrGuideApi from "./api";
import UserContext from "./context/UserContext";
import jwt from "jsonwebtoken";
import Navigation from "./routes/Navigation";
import Routes from "./Routes";

export const TOKEN_STORAGE_ID = "UrGuide-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [currentUser, setCurrentUser] = useState(null);
  const [potentialMatches, setPotentialMatches] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.debug(
    "App",
    "infoLoaded=",
    infoLoaded,
    "token =",
    token,
    "currentUser=",
    currentUser,
    "potentialMatches=",
    potentialMatches,
    "isLoggedIn=",
    isLoggedIn
  );

  useEffect(
    function loadUserInfo() {
      console.debug("App useEffect load user info", "token=", token);

      async function getCurrentUser() {
        if (token) {
          try {
            UrGuideApi.token = token;
            let { username } = jwt.decode(token);

            let user = await UrGuideApi.getCurrentUser(username);
            setCurrentUser(user);
            setIsLoggedIn(true);
          } catch (err) {
            console.error("App loadUserInfo: problem loading", err);
            setCurrentUser(null);
            setIsLoggedIn(false);
          }
        }
      }

      async function getPotentialMatches() {
        if (token) {
          try {
            let { username } = jwt.decode(token);
            UrGuideApi.token = token;
            let potentialMatches = await UrGuideApi.getPotentialMatches(
              username
            );
            setPotentialMatches(potentialMatches);
          } catch (err) {
            console.error("App loadUserInfo: problem loading", err);
            setPotentialMatches([]);
          }
        }
        setInfoLoaded(true);
      }

      setInfoLoaded(false);
      getCurrentUser();
      getPotentialMatches();
    },
    [token]
  );

  /** Handles site-wide logout. */

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** Handles site-wide login. */

  function login(data) {
    setToken(data.token);
  }

  if (!infoLoaded) return "Loading...";
  return (
    <div className="App">
      <UserContext.Provider
        value={{
          currentUser,
          setCurrentUser,
        }}
      >
        <Router>
          <Navigation logout={logout} />{" "}
          <Routes login={login} potentialMatches={potentialMatches} />{" "}
        </Router>{" "}
      </UserContext.Provider>{" "}
    </div>
  );
}

export default App;
