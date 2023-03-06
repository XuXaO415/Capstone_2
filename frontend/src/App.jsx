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
      console.log(
        "App loadUserInfo =",
        Boolean(token),
        "loadUserInfo",
        "token =",
        Boolean(token)
      );

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

  /** Handle URL image upload -- not working yet  */
  // async function uploadImage(imageUrl) {
  //   try {
  //     let image = await UrGuideApi.uploadImage(imageUrl, currentUser.username);
  //     setCurrentUser((currentUser) => ({
  //       ...currentUser,
  //       image_url: image.image_url,
  //     }));
  //     return { success: true };
  //   } catch (err) {
  //     console.error("uploadImage failed", err);
  //     return { success: false, err };
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

  async function dislikeMatch(username, user_id) {
    try {
      await UrGuideApi.dislikeMatch(username, user_id);
      let dislikeMatch = await UrGuideApi.dislikeMatch(
        currentUser.username,
        // username,
        user_id
      );
      setPotentialMatches(dislikeMatch);
    } catch (err) {
      console.error("unlikeUser failed", err);
    }
  }

  async function getLikedMatches() {
    try {
      let { username, user_id } = jwt.decode(token);
      console.log("username", username, "user_id", user_id);
      await UrGuideApi.getLikedMatches(username, user_id);
      setPotentialMatches(
        await UrGuideApi.getLikedMatches(currentUser.username, user_id)
      );
    } catch (err) {
      console.error("getLikedMatches failed", err);
    }
  }

  // async function getLikedMatches() {
  //   if (token) {
  //     try {
  //       let { username, user_id } = jwt.decode(token);
  //       console.log("username", username, "user_id", user_id);
  //       let likedMatches = await UrGuideApi.getLikedMatches(username, user_id);
  //       setPotentialMatches({
  //         data: likedMatches,
  //         isLoaded: true,
  //       });
  //     } catch (err) {
  //       console.error("App loadPotentialMatches error", err);
  //       setPotentialMatches((currPotentialMatches) => ({
  //         ...currPotentialMatches,
  //         isLoaded: true,
  //       }));
  //     }
  //   } else {
  //     setPotentialMatches({
  //       data: null,
  //       isLoaded: true,
  //     });
  //   }
  // }
  return (
    <div className="App">
      <UserContext.Provider
        value={{
          currentUser: currentUser.data,
          setCurrentUser,
          potentialMatches,
          setPotentialMatches,
          getLikedMatches,
          // getLikedUsers,
          likeUser,
          dislikeMatch,
        }}
      >
        <BrowserRouter>
          <Navigation logout={logout} />
          <Routes
            currentUser={currentUser.data}
            login={login}
            signup={signup}
            // uploadImage={uploadImage}
            // like={likeUser}
            // dislike={dislikeMatch}

            // potentialMatches={potentialMatches}
            // matchUsers={matchUsers}
            // getLikedMatches={getLikedMatches}
          />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
