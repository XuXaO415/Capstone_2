import React, { useState, useContext } from "react";
import { Switch, Route, Link, NavLink, Redirect } from "react-router-dom";
import Homepage from "./Homepage";
import LoginForm from "./forms/LoginForm";
import SignupForm from "./forms/SignupForm";
import ProfileForm from "./forms/ProfileForm";
import PrivateRoute from "./routes/PrivateRoute";
import MatchDetail from "./matches/MatchDetail";
import MatchList from "./matches/MatchList";
import MatchCard from "./matches/MatchCard";
import LikeMatchList from "./matches/LikeMatchList";
// import UserInfo from "./matches/UserInfo";

function Routes({
  login,
  signup,
  updateProfile,
  currentUser,
  like,
  dislike,
  potentialMatches,
  likedMatches,
  getLikedMatches,
  matchInfo,
  user_id,
}) {
  // console.debug(
  //   "Routes",
  //   "login=",
  //   login,
  //   "signup=",
  //   signup,
  //   "currentUser=",
  //   currentUser
  // );

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
              <MatchList
                potentialMatches={potentialMatches}
                setMatchInfo={matchInfo}
              />
              <MatchCard like={like} dislike={dislike} />
            </PrivateRoute>
            {/* 
            <PrivateRoute exact path="/matches/user/:user_id">
              <MatchDetail matchInfo={matchInfo} />
            </PrivateRoute> */}

            <PrivateRoute exact path="/likes">
              <LikeMatchList likedMatches={likedMatches} />
              <MatchCard like={like} dislike={dislike} />
            </PrivateRoute>
            {/* 
            <PrivateRoute exact path="/:username/matches/info/:user_id">
              <MatchDetail matchInfo={matchInfo} />
            </PrivateRoute> */}
          </>
        )}
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}

export default Routes;
