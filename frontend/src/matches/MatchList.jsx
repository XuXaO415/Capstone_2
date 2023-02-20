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
  const { currentUser, user_id } = useContext(UserContext);
  const [matches, setMatches] = useState([]);
  const [matchInfo, setMatchInfo] = useState(null);
  // const [likeMatch, setLikeMatch] = useState(null);

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

  function like(user_id) {
    async function likeUser() {
      try {
        let likeMatch = await UrGuideApi.likeMatch(
          currentUser.username,
          // username
          user_id
        );
        console.log(
          "matches=",
          "currentUser.username=",
          currentUser.username
          // "username=",
          // username
        );
        setMatches(likeMatch);
      } catch (err) {
        console.error(err);
      }
    }

    return likeUser(user_id);
  }

  function dislike(user_id) {
    async function dislikeUser() {
      try {
        let dislikeMatch = await UrGuideApi.dislikeMatch(
          currentUser.username,
          user_id
        );
        setMatches(dislikeMatch);
      } catch (err) {
        console.error(err);
      }
    }
    return dislikeUser();
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
        Hey {currentUser.username}, are some of your matches
      </h3>
      {matches.map((m) => (
        <MatchCard
          // key={m.username}
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
          like={like}
          dislike={dislike}
        ></MatchCard>
      ))}
      {matchInfo && (
        <MatchDetail
          username={currentUser.username}
          matchInfo={matchInfo}
          setMatchInfo={setMatchInfo}
          // matches={matches}
        />
      )}
    </div>
  );
}

export default MatchList;
