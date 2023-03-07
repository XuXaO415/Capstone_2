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
  const { currentUser } = useContext(UserContext);
  const [likedMatches, setLikedMatches] = useState(null);

  useEffect(() => {
    (async () => {
      let likedMatches = await UrGuideApi.getLikedMatches(currentUser.username);
      setLikedMatches(likedMatches);
    })();
  }, [currentUser.username]);

  if (!likedMatches) return <p>Loading...</p>;

  return (
    <div className="MatchList">
      <h1 className="mb-4">Liked Matches</h1>
      {likedMatches.length ? (
        <div className="MatchList-list">
          {likedMatches.map((m) => (
            <MatchCard
              key={m.username}
              user_id={m.user_id}
              username={m.username}
              first_name={m.first_name}
              last_name={m.last_name}
              image_url={m.image_url}
              city={m.city}
              state={m.state}
              interests={m.interests}
              hobbies={m.hobbies}
            />
          ))}
        </div>
      ) : (
        <p>You haven't liked any users yet.</p>
      )}
    </div>
  );
};

// function LikeMatchList() {
//   const { currentUser } = useContext(UserContext);
//   const [likedMatches, setLikedMatches] = useState(null);

//   console.debug("LikeMatchList", "likedMatches=", likedMatches);

//   useEffect(
//     function getLikedMatches() {
//       async function getLikedMatches() {
//         let likedMatches = await UrGuideApi.getLikedMatches(
//           currentUser.username
//         );
//         console.debug(
//           "LikeMatchList useEffect getLikedMatches",
//           "likedMatches=",
//           likedMatches
//         );
//         setLikedMatches(likedMatches);
//       }
//       getLikedMatches();
//     },
//     [currentUser.username]
//   );

//   if (!likedMatches) return <p>Loading...</p>;

//   return (
//     <div className="MatchList">
//       <h1 className="mb-4">Liked Matches</h1>
//       {likedMatches.length ? (
//         <div className="MatchList-list">
//           {likedMatches.map((m) => (
//             <MatchCard
//               key={m.username}
//               username={m.username}
//               first_name={m.first_name}
//               last_name={m.last_name}
//               image_url={m.image_url}
//               city={m.city}
//               state={m.state}
//               interests={m.interests}
//               hobbies={m.hobbies}
//             />
//           ))}
//         </div>
//       ) : (
//         <p>You haven't liked any users yet.</p>
//       )}
//     </div>
//   );
// }

export default LikeMatchList;
