import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UrGuideApi from "../api";
import UserContext from "../context/UserContext";
import MatchDetail from "./MatchDetail";
import Alert from "../common/Alert";
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
  const [user_id] = useState(null);
  const [matches, setMatches] = useState(null);
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
    [currentUser, user_id]
  );

  useEffect(
    function getLikedMatches() {
      async function getLikedMatches() {
        let likedMatches = await UrGuideApi.getLikedMatches(
          currentUser.username,
          user_id
        );
        console.debug(
          "MatchList useEffect getLikedMatches",
          "likedMatches=",
          likedMatches
        );
        setLikedMatches(likedMatches);
      }
      getLikedMatches();
    },
    [currentUser, user_id]
  );

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
    // return dislikeMatch(user_id);
    dislikeMatch(user_id);
    // return <Link to={`/users/${currentUser.username}/matches`} />;
  }

  function removeMatch(user_id) {
    async function removeMatch() {
      try {
        let removeMatch = await UrGuideApi.removeMatch(
          currentUser.username,
          user_id
        );
        console.log("Removed match=", (removeMatch = user_id));
        setMatches(removeMatch);
      } catch (err) {
        console.error(err);
      }
    }
    // return removeMatch(user_id);
    removeMatch(user_id);
    <Alert type="danger" messages={["Match removed"]} />;
  }

  if (!matches) return <p>Loading...</p>;

  return (
    <div className="MatchList">
      <h3 className="text-center">
        Hey {currentUser.username}, here are some of your matches
      </h3>
      {Array.isArray(matches) &&
        matches.map((m) => (
          <MatchCard
            key={m.username}
            user_id={m.user_id}
            // id={m.id}
            username={m.username}
            first_name={m.first_name}
            last_name={m.last_name}
            // matchInfo={m.matchInfo}
            // city={m.city}
            // state={m.state}
            interests={m.interests}
            hobbies={m.hobbies}
            setMatchInfo={setMatchInfo}
            // matches={setMatches}
            image_url={m.image_url}
            like={likeMatch}
            dislike={dislikeMatch}
            remove={removeMatch}
          ></MatchCard>
        ))}
      {matchInfo && (
        <MatchDetail
          // username={currentUser.username}
          getMatchInfo={matchInfo}
          matchInfo={matchInfo}
          setMatchInfo={setMatchInfo}
          matches={matches}
          getLikedMatches={setLikedMatches}
        />
      )}
    </div>
  );
}

export default MatchList;
