import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UrGuideApi from "../api";
import UserContext from "../context/UserContext";
import MatchCard from "./MatchCard";

/** This component retrieves a user's likes and displays it's list here.
 *
 * On mount, retrieves a list of liked users
 *
 * Routed at /:users/:username/matches/likes
 *
 */

const LikeMatchList = () => {
  const { currentUser, user_id } = useContext(UserContext);
  // const { user_id } = useParams();
  const [likedMatches, setLikedMatches] = useState(null);
  const [error, setError] = useState(null);
  const [matchInfo, setMatchInfo] = useState(null);

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

  /** Add await to async dislike function */

  // async function dislikeMatch(user_id) {
  //   try {
  //     await UrGuideApi.dislikeMatch(currentUser.username, user_id);
  //     setLikedMatches((m) => m.filter((match) => match.user_id !== user_id));
  //     setTimeout(() => {
  //       setMatchInfo(user_id);
  //     }, 2000);
  //   } catch (errors) {
  //     setError(errors);
  //   }
  //   return matchInfo;
  // }

  // async function dislikeMatch(user_id) {
  //   try {
  //     let matchInfo = UrGuideApi.dislikeMatch(currentUser.username, user_id);
  //     setMatchInfo(matchInfo);
  //     setLikedMatches((m) => m.filter((match) => match.user_id !== user_id));
  //     setTimeout(() => {
  //       setMatchInfo(user_id);
  //     }, 2000);
  //   } catch (errors) {
  //     setError(errors);
  //   }
  // }

  // async function dislikeMatch(user_id) {
  //   try {
  //     await new Promise((resolve) => {
  //       UrGuideApi.dislikeMatch(currentUser.username, user_id).then(() => {
  //         setMatchInfo(user_id);
  //         setLikedMatches((m) =>
  //           m.filter((match) => match.user_id !== user_id)
  //         );
  //         console.log("dislikeMatch: ", user_id);
  //         setTimeout(() => {
  //           setMatchInfo(user_id);
  //           resolve();
  //         }, 2000);
  //       });
  //     });
  //   } catch (err) {
  //     setError(err);
  //   }
  // }

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
      await new Promise((resolve) => {
        UrGuideApi.dislikeMatch(currentUser.username, user_id).then(() => {
          setLikedMatches((m) =>
            m.filter((match) => match.user_id !== user_id)
          );
          console.log("dislikeMatch: ", user_id);
          setTimeout(() => {
            setMatchInfo(user_id);
            resolve();
          }, 2000);
        });
      });
    } catch (err) {
      setError(err);
    }
  }

  // async function dislikeMatch(user_id) {
  //   try {
  //     await UrGuideApi.dislikeMatch(currentUser.username, user_id);
  //     console.log(
  //       "currentUser",
  //       currentUser.username,
  //       "dislikeMatch: ",
  //       user_id
  //     );
  //     setLikedMatches((m) => m.filter((match) => match.user_id !== user_id));
  //   } catch (err) {
  //     setError(err);
  //   }
  // }

  if (error) return <p>Sorry, there was an error</p>;

  if (!likedMatches) return <p>Loading...</p>;

  return likedMatches.length ? (
    <div className="Liked-matches">
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
        <Link to={`/matches`}>
          <button className="btn btn-primary">Back to matches</button>
        </Link>
      </div>
    </div>
  ) : (
    <p className="lead">You haven't liked any users yet</p>
  );
};

export default LikeMatchList;
