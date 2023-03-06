import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory, Route } from "react-router-dom";
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

  const { currentUser, user_id } = useContext(UserContext);
  // const [user_id] = useState(null);
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
    likeUser(user_id);
    // <Route path="/users/:username/matches" component={MatchList} />;
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
    removeMatch(user_id);
    <Alert type="danger" messages={["Match removed"]} />;
  }

  if (!matches || !likedMatches) return <p>Loading...</p>;

  return (
    <div className="MatchList">
      <h4 className="text-center">
        Hey {currentUser.username}, here are some of your matches
      </h4>
      {Array.isArray(matches) &&
        matches.map((m) => (
          <MatchCard
            key={m.username}
            user_id={m.user_id}
            username={m.username}
            first_name={m.first_name}
            // last_name={m.last_name}
            // city={m.city}
            // state={m.state}
            interests={m.interests}
            hobbies={m.hobbies}
            setMatchInfo={setMatchInfo}
            image_url={m.image_url}
            like={likeMatch}
            dislike={dislikeMatch}
            remove={removeMatch}
          ></MatchCard>
        ))}
      {matchInfo && (
        <MatchDetail
          // username={currentUser.username}
          // getMatchInfo={getMatchInfo}
          // getMatchInfo={matchInfo}
          setMatchInfo={setMatchInfo}
          matches={setMatches}
          // getLikedMatches={setLikedMatches}
          getLikedMatches={likedMatches}
          setLikedMatches={setLikedMatches}
        />
      )}
      {/* {likedMatches && (
        <div className="LikedMatches">
          <h4 className="text-center">Liked Matches</h4>
          {Array.isArray(likedMatches) &&
            likedMatches.map((l) => (
              <MatchCard
                key={l.username}
                user_id={l.user_id}
                username={l.username}
                first_name={l.first_name}
                // last_name={l.last_name}
                // city={l.city}
                // state={l.state}
                interests={l.interests}
                hobbies={l.hobbies}
                setMatchInfo={setMatchInfo}
                image_url={l.image_url}
                dislike={dislikeMatch}
              ></MatchCard>
            ))}
        </div>
      )} */}
    </div>
  );
}

export default MatchList;
