import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory, Route, useParams } from "react-router-dom";
import UrGuideApi from "../api";
import UserContext from "../context/UserContext";
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
  // const { user_id } = useParams();
  const [likedMatches, setLikedMatches] = useState(null);
  const [setError] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       await UrGuideApi.getLikedMatches(currentUser.username, user_id).then(
  //         (res) => setLikedMatches(res)
  //       );
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   })();
  // }, [currentUser.username, user_id]);

  useEffect(() => {
    (async () => {
      try {
        const res = await UrGuideApi.getLikedMatches(
          currentUser.username,
          user_id
        );
        if (res) {
          setLikedMatches(res);
        } else {
          setLikedMatches([]);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [currentUser.username, user_id]);

  async function dislikeMatch(user_id) {
    try {
      setLikedMatches((m) => m.filter((match) => match.user_id !== user_id));
    } catch (err) {
      setError(err);
    }
  }

  if (!likedMatches) return <p>Loading...</p>;

  return likedMatches.length ? (
    <div className="MatchList-list">
      <div className="text-center">
        <h1 className="display-4">{currentUser.username}'s liked matches</h1>
        {likedMatches.map((l, idx) => (
          <MatchCard
            key={idx}
            user_id={l.user_id}
            username={l.username}
            first_name={l.first_name}
            image_url={l.image_url}
            city={l.city}
            state={l.state}
            country={l.country}
            zip_code={l.zip_code}
            interests={l.interests}
            hobbies={l.hobbies}
            dislike={dislikeMatch}
          />
        ))}
      </div>
    </div>
  ) : (
    <p className="lead">You haven't liked any users yet</p>
  );

  //     {likedMatches.length ? (
  //       <div className="MatchList-list">
  //         {likedMatches.map((l) => (
  //           <MatchCard
  //             key={l.id}
  //             // key={l.user_id}
  //             user_id={l.user_id}
  //             username={l.username}
  //             first_name={l.first_name}
  //             image_url={l.image_url}
  //             city={l.city}
  //             state={l.state}
  //             country={l.country}
  //             zip_code={l.zip_code}
  //             interests={l.interests}
  //             hobbies={l.hobbies}
  //             dislike={dislikeMatch}
  //             // dislike={(matchInfo) => dislikeMatch(matchInfo.user_id)}
  //           />
  //         ))}
  //       </div>
  //     ) : (
  //       <p>You haven't liked any users yet.</p>
  //     )}
  //   </div>
  // );
};

export default LikeMatchList;
