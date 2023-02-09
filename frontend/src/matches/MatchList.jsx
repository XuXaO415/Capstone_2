import React, { useState, useEffect, useContext } from "react";
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

function MatchList({ match, history }) {
  const { currentUser } = useContext(UserContext);
  const [matches, setMatches] = useState(null);
  const [matchInfo, setMatchInfo] = useState(null);

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
          currentUser.user_id
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
    [currentUser.username, currentUser.user_id]
  );

  // function like(username, data) {
  //   async function likeUser() {
  //     let matches = await UrGuideApi.likeMatch(
  //       currentUser.username,
  //       username,
  //       data
  //     );
  //     setMatches(matches);
  //   }
  //   likeUser();
  // }

  /** Semi working */

  function like(username, user_id) {
    async function likeUser() {
      let matches = await UrGuideApi.likeMatch(
        currentUser.username,
        username,
        user_id
      );
      setMatches(matches);
    }
    likeUser();
  }

  function dislike(username, data) {
    async function dislikeUser() {
      let matches = await UrGuideApi.dislikeMatch(
        currentUser.username,
        username,
        data
      );
      setMatches(matches);
    }
    dislikeUser();
  }

  //remove dislike user from match list

  if (!matches) return <p>Loading...</p>;

  return (
    <div className="MatchList">
      <h3 className="text-center">Here are some of your matches</h3>
      {matches.map((m) => (
        <MatchCard
          key={m.username}
          user_id={m.user_id}
          id={m.id}
          username={m.username}
          first_name={m.firstName}
          last_name={m.lastName}
          matchInfo={m}
          city={m.city}
          state={m.state}
          interests={m.interests}
          hobbies={m.hobbies}
          setMatchInfo={setMatchInfo}
          matches={matches}
          image_url={m.image_url}
          like={like}
          dislike={dislike}
        />
      ))}
      {matchInfo && (
        <MatchDetail
          username={currentUser.username}
          matchInfo={matchInfo}
          setMatchInfo={setMatchInfo}
          matches={matches}
        />
      )}
    </div>
  );
}

export default MatchList;
