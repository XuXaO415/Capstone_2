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

function MatchList() {
  const { currentUser } = useContext(UserContext);
  const [matches, setMatches] = useState(null);
  const [matchInfo, setMatchInfo] = useState(null);

  console.debug("MatchList", "currentUser=", currentUser);

  useEffect(
    function getPotentialUserMatches() {
      async function getPotentialMatches() {
        let matches = await UrGuideApi.getPotentialMatches(
          currentUser.username
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
    [currentUser.username]
  );

  function like(username) {
    async function likeUser() {
      let matches = await UrGuideApi.likeMatch(currentUser.username, username);
      setMatches(matches);
    }
    likeUser();
  }

  function dislike(username) {
    async function dislikeUser() {
      let matches = await UrGuideApi.dislikeMatch(
        currentUser.username,
        username
      );
      setMatches(matches);
    }
    dislikeUser();
  }

  if (!matches) return <p>Loading...</p>;

  return (
    <div className="MatchList">
      <h3 className="text-center">Potential Matches</h3>
      {matches.map((m) => (
        <MatchCard
          key={m.username}
          username={m.username}
          first_name={m.firstName}
          last_name={m.lastName}
          matchInfo={m}
          city={m.city}
          state={m.state}
          interests={m.interests}
          hobbies={m.hobbies}
          setMatchInfo={setMatchInfo}
          like={like}
          dislike={dislike}
        />
      ))}
      {matchInfo && (
        <MatchDetail
          username={currentUser.username}
          matchInfo={matchInfo}
          setMatchInfo={setMatchInfo}
        />
      )}
    </div>
  );
}

export default MatchList;
