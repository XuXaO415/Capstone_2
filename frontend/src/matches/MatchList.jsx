import React, { useState, useEffect, useContext, Component } from "react";
import { Link, useHistory, Route } from "react-router-dom";
import UrGuideApi from "../api";
import UserContext from "../context/UserContext";
import MatchDetail from "./MatchDetail";
import Alert from "../common/Alert";
import MatchCard from "./MatchCard";
import LikeMatchList from "./LikeMatchList";
import { Button } from "react-bootstrap";

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

const MatchList = () => {
  const { currentUser, user_id } = useContext(UserContext);
  const [matches, setMatches] = useState(null);
  const [matchInfo, setMatchInfo] = useState(null);
  const [error, setError] = useState(null);

  // const message = {
  //   liked: `${currentUser.username} liked ${user_id}`,
  //   disliked: `${currentUser.username} disliked ${user_id}`,
  // };

  useEffect(() => {
    (async () => {
      const matches = await UrGuideApi.getPotentialMatches(
        currentUser.username,
        user_id
      );
      setMatches(matches);
    })();
  }, [currentUser, user_id]);

  async function likeMatch(user_id) {
    try {
      let matchInfo = UrGuideApi.likeMatch(currentUser.username, user_id);
      setMatchInfo(matchInfo);
      setMatches((m) => m.filter((match) => match.user_id !== user_id));
      setTimeout(() => {
        setMatchInfo(user_id);
      }, 2000);
    } catch (errors) {
      setError(errors);
    }
  }

  async function dislikeMatch(user_id) {
    try {
      let matchInfo = UrGuideApi.dislikeMatch(currentUser.username, user_id);
      setMatchInfo(matchInfo);
      setMatches((m) => m.filter((match) => match.user_id !== user_id));
      setTimeout(() => {
        setMatchInfo(user_id);
      }, 2000);
    } catch (errors) {
      setError(errors);
    }
  }

  // useEffect(() => {
  //   if (matches && matches.length === 0) {
  //     (async () => {
  //       const matches = await UrGuideApi.getPotentialMatches(
  //         currentUser.username,
  //         user_id
  //       );
  //       setMatches(matches);
  //     })();
  //   }
  // }, [matches, currentUser, user_id]);

  if (!matches) return <p>Loading...</p>;

  return (
    <div className="MatchList">
      <h1 className="mb-4">
        Hey {currentUser.username}, here are some of your matches
      </h1>
      {matches.length ? (
        <div className="MatchList-list">
          {matches.map((m) => (
            <MatchCard
              key={m.user_id}
              user_id={m.user_id}
              username={m.username}
              first_name={m.first_name}
              // last_name={m.last_name}
              city={m.city}
              state={m.state}
              zip_code={m.zip_code}
              country={m.country}
              image_url={m.image_url}
              interests={m.interests}
              hobbies={m.hobbies}
              like={likeMatch}
              dislike={dislikeMatch}
              matchInfo={matchInfo}
            />
          ))}

          <Link to={`/likes`}>
            <Button variant="primary">Liked Matches</Button>
          </Link>
        </div>
      ) : (
        <p className="lead">No matches yet!</p>
      )}
    </div>
  );
};

// function MatchList() {
//   const { currentUser, user_id } = useContext(UserContext);
//   // const [user_id] = useState(null);
//   const [matches, setMatches] = useState(null);
//   const [matchInfo, setMatchInfo] = useState(null);
//   const [likedMatches, setLikedMatches] = useState(null);

//   console.debug(
//     "MatchList",
//     "matches=",
//     matches,
//     "matchInfo=",
//     matchInfo,
//     "currentUser=",
//     currentUser
//   );

//   useEffect(
//     function getPotentialUserMatches() {
//       async function getPotentialMatches() {
//         let matches = await UrGuideApi.getPotentialMatches(
//           currentUser.username,
//           user_id
//         );
//         console.debug(
//           "MatchList useEffect getPotentialMatches",
//           "matches=",
//           matches
//         );
//         setMatches(matches);
//       }
//       getPotentialMatches();
//     },
//     [currentUser, user_id]
//   );

//   useEffect(
//     function getLikedMatches() {
//       async function getLikedMatches() {
//         let likedMatches = await UrGuideApi.getLikedMatches(
//           currentUser.username,
//           user_id
//         );
//         console.debug(
//           "MatchList useEffect getLikedMatches",
//           "likedMatches=",
//           likedMatches
//         );
//         setLikedMatches(likedMatches);
//       }
//       getLikedMatches();
//     },
//     [currentUser, user_id]
//   );

//   function likeMatch(user_id) {
//     async function likeUser() {
//       try {
//         let likeMatch = await UrGuideApi.likeMatch(
//           currentUser.username,
//           user_id
//         );
//         console.log(
//           "currentUser.username=",
//           currentUser.username,
//           "Liked match=",
//           "user_id=",
//           user_id
//         );
//         setMatches(likeMatch);
//       } catch (err) {
//         console.error(err);
//       }
//     }
//     likeUser(user_id);
//   }

//   function dislikeMatch(user_id) {
//     async function dislikeMatch() {
//       try {
//         let dislikeMatch = await UrGuideApi.dislikeMatch(
//           currentUser.username,
//           user_id
//         );
//         console.log("Disliked match=", (dislikeMatch = user_id));
//         setMatches(dislikeMatch);
//       } catch (err) {
//         console.error(err);
//       }
//     }
//     dislikeMatch(user_id);
//   }

//   // function removeMatch(user_id) {
//   //   async function removeMatch() {
//   //     try {
//   //       let removeMatch = await UrGuideApi.removeMatch(
//   //         currentUser.username,
//   //         user_id
//   //       );
//   //       console.log("Removed match=", (removeMatch = user_id));
//   //       setMatches(removeMatch);
//   //     } catch (err) {
//   //       console.error(err);
//   //     }
//   //   }
//   //   removeMatch(user_id);
//   //   <Alert type="danger" messages={["Match removed"]} />;
//   // }
//   if (!matches || !likedMatches) return <p>Loading...</p>;

//   return (
//     <div className="MatchList">
//       <h4 className="text-center">
//         Hey {currentUser.username}, here are some of your matches
//       </h4>
//       {Array.isArray(matches) &&
//         matches.map((m) => (
//           <MatchCard
//             key={m.username}
//             user_id={m.user_id}
//             username={m.username}
//             first_name={m.first_name}
//             // last_name={m.last_name}
//             // city={m.city}
//             // state={m.state}
//             interests={m.interests}
//             hobbies={m.hobbies}
//             setMatchInfo={setMatchInfo}
//             image_url={m.image_url}
//             like={likeMatch}
//             dislike={dislikeMatch}
//           ></MatchCard>
//         ))}
//       {matchInfo && (
//         <MatchDetail
//           setMatchInfo={setMatchInfo}
//           matches={setMatches}
//           matchInfo={matchInfo}
//           getLikedMatches={likedMatches}
//           setLikedMatches={setLikedMatches}
//         />
//       )}
//     </div>
//   );
// }

export default MatchList;
