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

  const [potentialMatches, setPotentialMatches] = useState({
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
      console.debug("App loadPotentialMatches", Boolean(token));
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

  function getLikedMatches() {
    async function getLikedMatches() {
      if (token) {
        try {
          let user_id;
          console.log("user_id", user_id);
          let likedMatches = await UrGuideApi.getLikedMatches(
            currentUser,
            (user) => {
              return (user_id = user.user_id);
            }
          );
          likedMatches({
            data: likedMatches,
            isLoaded: true,
          });
        } catch (err) {
          console.error("App loadPotentialMatches error", err);
          getLikedMatches((currLikedMatches) => ({
            ...currLikedMatches,
            isLoaded: true,
          }));
        }
      } else {
        getLikedMatches({
          data: null,
          isLoaded: true,
        });
      }
    }
    getLikedMatches();
  }

  // async function matchUsers(currentUser) {
  //   try {
  //     let potentialMatches = await UrGuideApi.matchList(currentUser.username);
  //     console.log("potentialMatches", potentialMatches);
  //     setPotentialMatches(potentialMatches);
  //   } catch (err) {
  //     console.error("matchUsers failed", err);
  //   }
  // }

  // useEffect(
  //   function loadLikedMatches() {
  //     console.debug("App loadLikedMatches", "loadLikedMatches");
  //     async function getLikedMatches() {
  //       if (token) {
  //         try {
  //           let { username, user_id } = jwt.decode(token);
  //           console.log("username", username, "user_id", user_id);
  //           let likedMatches = await UrGuideApi.getLikedMatches(
  //             username,
  //             user_id
  //           );
  //           setPotentialMatches({
  //             data: likedMatches,
  //             isLoaded: true,
  //           });
  //         } catch (err) {
  //           console.error("App loadLikedMatches error", err);
  //           setPotentialMatches((currPotentialMatches) => ({
  //             ...currPotentialMatches,
  //             isLoaded: true,
  //           }));
  //         }
  //       } else {
  //         setPotentialMatches({
  //           data: null,
  //           isLoaded: true,
  //         });
  //       }
  //     }
  //     getLikedMatches();
  //   },
  //   [token]
  // );

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

  // async function matchUsers(username, user_id) {
  //   try {
  //     let potentialMatches = await UrGuideApi.getPotentialMatches(
  //       username,
  //       user_id
  //     );
  //     console.log("potentialMatches", potentialMatches, "user_id", user_id);
  //     setPotentialMatches(potentialMatches);
  //   } catch (err) {
  //     console.error("matchUsers failed", err);
  //   }
  // }

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

  function hasUserBeenLiked(username, user_id) {
    if (currentUser.data.matches(username, user_id)) return;
    UrGuideApi.getPotentialMatches(currentUser.username, username, user_id);
    setPotentialMatches(potentialMatches);
  }

  async function unlikeUser(username, user_id) {
    try {
      await UrGuideApi.dislikeMatch(username, user_id);
      let unlikePotentialMatches = await UrGuideApi.dislikeMatch(
        // currentUser.data.username,
        currentUser.username,
        // username,
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
          getLikedMatches,
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
            // matchUsers={matchUsers}
            // getLikedMatches={getLikedMatches}
            // likeUser={likeMatch}
            // unlikeUser={unlikeUser}
          />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
