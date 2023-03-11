import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory, Route } from "react-router-dom";
import UrGuideApi from "../api";
import UserContext from "../context/UserContext";
import MatchDetail from "./MatchDetail";
import MatchCard from "./MatchCard";

/** This component retrieves a user's likes and displays it's list here.
 *
 * On mount, retrieves a list of liked users
 *
 * Routed at /:users/:username/matches/likes
 *
 *
 */

const LikeMatchList = () => {
  const { currentUser, user_id } = useContext(UserContext);
  const [likedMatches, setLikedMatches] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      await UrGuideApi.getLikedMatches(currentUser.username, user_id).then(
        (res) => setLikedMatches(res)
      );
    })();
  }, [currentUser.username, user_id]);

  async function dislikeMatch(user_id) {
    try {
      let matchInfo = UrGuideApi.dislikeMatch(currentUser.username, user_id);
      setLikedMatches((m) => m.filter((match) => match.user_id !== user_id));
    } catch (errors) {
      setError(errors);
    }
  }

  if (!likedMatches) return <p>Loading...</p>;

  return (
    <div className="MatchList">
      <div className="text-center">
        <h1 className="mb-4">Liked Matches</h1>
      </div>

      {likedMatches.length ? (
        <div className="MatchList-list">
          {likedMatches.map((l) => (
            <MatchCard
              key={l.id}
              user_id={l.user_id}
              username={l.username}
              first_name={l.first_name}
              last_name={l.last_name}
              image_url={l.image_url}
              city={l.city}
              state={l.state}
              zip_code={l.zip_code}
              interests={l.interests}
              hobbies={l.hobbies}
              dislike={dislikeMatch}
            />
          ))}
          {/* <Route exact path="/:users/:username/matches/likes/:user_id">
            <MatchDetail />
          </Route> */}
        </div>
      ) : (
        <p>You haven't liked any users yet.</p>
      )}
    </div>
  );
};

export default LikeMatchList;
