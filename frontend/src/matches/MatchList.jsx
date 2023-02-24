import React, { useState, useEffect, useContext, usePush } from "react";
import UrGuideApi from "../api";
import UserContext from "../context/UserContext";
import MatchDetail from "./MatchDetail";
import MatchCard from "./MatchCard";

/** Show page with a list of potential matches
 *
 * On mount, loads list of potential matches and updates via setMatches
 * Re-loads list of potential matches upon "like" or "dislike"
 *
 * Routed at /users/:username/matches
 *
 * Routes -> MatchList -> {MatchDetail, MatchCard}
 *
 */

function MatchList() {
  // const { currentUser, user_id } = useContext(UserContext);
  const { currentUser } = useContext(UserContext);
  const { user_id } = useState([]);
  const [matches, setMatches] = useState([]);
  const [matchInfo, setMatchInfo] = useState(null);

  const [likedMatches, setLikedMatches] = useState(null);

  console.debug(
    "MatchList",
    "matches=",
    matches,
    "matchInfo=",
    matchInfo,
    "currentUser=",
    currentUser
  );

  useEffect(
    function getPotentialUserMatches() {
      async function getPotentialMatches() {
        let matches = await UrGuideApi.getPotentialMatches(
          currentUser.username,
          user_id
        );
        console.debug(
          "MatchList useEffect getPotentialMatches",
          "matches=",
          matches
        );
        setMatches(matches);
      }
      getPotentialMatches();
    },
    [currentUser.username, user_id]
  );

  //** Show user their liked matches */

  // useEffect(
  //   function getLikedMatches() {
  //     async function getLikedMatches() {
  //       let likedMatches = await UrGuideApi.getLikedMatches(
  //         currentUser.username
  //       );
  //       console.debug(
  //         "MatchList useEffect getLikedMatches",
  //         "likedMatches=",
  //         likedMatches
  //       );
  //       setLikedMatches(likedMatches);
  //     }
  //     getLikedMatches();
  //   },
  //   [currentUser.username]
  // );

  /** Define matches */

  function likeMatch(user_id) {
    async function likeUser() {
      try {
        let likeMatch = await UrGuideApi.likeMatch(
          currentUser.username,
          // username
          user_id
        );
        console.log(
          "currentUser.username=",
          currentUser.username,
          "Liked match=",
          "user_id=",
          user_id
        );
        setMatches(likeMatch);
      } catch (err) {
        console.error(err);
      }
    }
    return likeUser(user_id);
  }

  function dislikeMatch(user_id) {
    async function dislikeMatch() {
      try {
        let dislikeMatch = await UrGuideApi.dislikeMatch(
          currentUser.username,
          user_id
        );
        console.log("Disliked match=", (dislikeMatch = user_id));
        setMatches(dislikeMatch);
      } catch (err) {
        console.error(err);
      }
    }
    // dislikeMatch(user_id);
    return dislikeMatch(user_id) && window.location.reload();
  }

  // function dislike(user_id) {
  //   async function dislikeUser() {
  //     let matches = await UrGuideApi.dislikeMatch(
  //       currentUser.username,
  //       user_id
  //     );
  //     setMatches(matches);
  //   }
  //   return dislikeUser();
  // }

  //remove dislike user from match list

  if (!matches) return <p>Loading...</p>;

  return (
    <div className="MatchList">
      <h3 className="text-center">
        Hey {currentUser.username}, here are some of your matches
      </h3>
      {matches.map((m) => (
        <MatchCard
          key={m.username}
          user_id={m.user_id}
          // id={m.id}
          username={m.username}
          first_name={m.firstName}
          last_name={m.lastName}
          matchInfo={m.matchInfo}
          city={m.city}
          state={m.state}
          interests={m.interests}
          hobbies={m.hobbies}
          setMatchInfo={setMatchInfo}
          matches={setMatches}
          image_url={m.image_url}
          like={likeMatch}
          dislike={dislikeMatch}
        ></MatchCard>
      ))}
      {matchInfo && (
        <MatchDetail
          // username={currentUser.username}
          matchInfo={matchInfo}
          setMatchInfo={setMatchInfo}
          matches={matches}
        />
      )}

      {/* 
      <h3 className="text-center">Your Liked Matches</h3>
      {likedMatches && (
        <div className="row">
          {likedMatches.map((m) => (
            <MatchCard
              key={m.username}
              user_id={m.user_id}
              // id={m.id}
              username={m.username}
              first_name={m.firstName}
              last_name={m.lastName}
              matchInfo={m.matchInfo}
              city={m.city}
              state={m.state}
              interests={m.interests}
              hobbies={m.hobbies}
              setMatchInfo={setMatchInfo}
              matches={setMatches}
              image_url={m.image_url}
              dislike={dislike}
            ></MatchCard>
          ))} */}
    </div>
  );
}

export default MatchList;
