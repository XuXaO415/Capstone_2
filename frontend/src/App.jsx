import React, { useState, useEffect, useContext } from "react";

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
  const [potentialMatches, setPotentialMatches] = useState({
    data: null,
    isLoaded: false,
  });
  const [currentUser, setCurrentUser] = useState({
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

            UrGuideApi.token = token;

            let getUser = await UrGuideApi.getCurrentUser(username);
            setCurrentUser({
              data: getUser,
              isLoaded: true,
            });
          } catch (err) {
            console.error("App loadUserInfo error", err);
            setCurrentUser((currUser) => ({
              ...currUser,
              isLoaded: true,
            }));
          }
        } else {
          setCurrentUser({
            data: null,
            isLoaded: true,
          });
        }
      }
      getCurrentUser();
    },
    [token]
  );

  /** Handle getting user matches **/

  useEffect(
    function loadPotentialMatches() {
      console.debug("App loadPotentialMatches", "loadPotentialMatches");
      async function getPotentialMatches() {
        if (token) {
          try {
            let { username, user_id } = jwt.decode(token);
            console.log("username", username, "user_id", user_id);
            // let potentialMatches = await UrGuideApi.matchList(
            let potentialMatches = await UrGuideApi.getPotentialMatches(
              username,
              user_id
              // currentUser.username,
              // user_id
            );
            setPotentialMatches({
              data: potentialMatches,
              isLoaded: true,
            });
          } catch (err) {
            console.error("App loadPotentialMatches error", err);
            setPotentialMatches((currPotentialMatches) => ({
              ...currPotentialMatches,
              isLoaded: true,
            }));
          }
        } else {
          setPotentialMatches({
            data: null,
            isLoaded: true,
          });
        }
      }
      getPotentialMatches();
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

  async function matchUsers(username, user_id) {
    try {
      let potentialMatches = await UrGuideApi.getPotentialMatches(
        username,
        user_id
      );
      console.log("potentialMatches", potentialMatches, "user_id", user_id);
      setPotentialMatches(potentialMatches);
    } catch (err) {
      console.error("matchUsers failed", err);
    }
  }

  /** Check if user was already liked */
  // function hasUserBeenLiked(user_id) {
  //   if (currentUser.data.matches) {
  //     return currentUser.data.matches.some((match) => match.id === user_id);
  //   }
  // }

  function hasUserBeenLiked(user_id, username) {
    if (currentUser.data.matches(username, user_id)) return;
    UrGuideApi.getPotentialMatches(
      currentUser.data.username,
      username,
      user_id
    );
    setPotentialMatches(potentialMatches);
  }

  async function likeUser(username, user_id) {
    try {
      await UrGuideApi.likeMatch(username, user_id);
      let likePotentialMatches = await UrGuideApi.likeMatch(
        currentUser.username,
        // username,
        user_id
      );
      setPotentialMatches(likePotentialMatches);
    } catch (err) {
      console.error("likeUser failed", err);
    }
  }

  async function unlikeUser(username, user_id) {
    try {
      await UrGuideApi.dislikeMatch(username, user_id);
      let unlikePotentialMatches = await UrGuideApi.getPotentialMatches(
        // currentUser.data.username,
        currentUser.username,
        username,
        user_id
      );
      setPotentialMatches(unlikePotentialMatches);
    } catch (err) {
      console.error("unlikeUser failed", err);
    }
  }

  return (
    <div className="App">
      <UserContext.Provider
        value={{
          currentUser: currentUser.data,
          setCurrentUser,
          potentialMatches,
          // matchUsers,
          hasUserBeenLiked,
          likeUser,
          unlikeUser,
        }}
      >
        <BrowserRouter>
          <Navigation logout={logout} />
          <Routes
            currentUser={currentUser.data}
            login={login}
            signup={signup}
            potentialMatches={potentialMatches}
            matchUsers={matchUsers}
            // likeUser={likeMatch}
            // unlikeUser={unlikeUser}
          />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
