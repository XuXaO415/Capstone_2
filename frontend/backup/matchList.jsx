// import * as React from "react";
// import { Link, NavLink, Switch, Route, Redirect } from "react-router-dom";
// import UserContext from "../context/UserContext";
// import MatchDetail from "./MatchDetail";

// function MatchList({ like, dislike }) {
//   const { potentialMatches } = React.useContext(UserContext);
//   const [userIdx, setUserIdx] = React.useState(0);

//   const matchInfo = potentialMatches[userIdx];
//   const totalNum = potentialMatches.length;

//   /** Oof,  I'm having trouble with my MatchList component.
//    * I'm trying to create a list of potential matches for the user, but I'm not sure how to display the list correctly.
//    * I'm also not sure how to display the list of potential matches/guides in the MatchDetail component.
//    * I'm not sure if I should be using a map function or if I should be using a for loop.
//    *
//    * This is the code I have so far:
//    *
//    **/

//   // allows user to like a potential match or guide
//   function handleLike(e) {
//     like(matchInfo);
//     setUserIdx((userIdx + 1) % totalNum);
//   }

//   //allows user to dislike a potential match or guide
//   function handleDislike(e) {
//     dislike(matchInfo);
//     //Is this the correct way to go through the list of potential matches/guides? Is this the best way to do this logic wise?
//     setUserIdx((userIdx + 1) % totalNum); // this allows the user to go through the list of potential matches/guides
//   }

//   //if not matches are found, display message
//   if (totalNum === 0) {
//     return (
//       <div className="MatchList">
//         <h1>No matches found!</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="MatchList">
//       <h1>Here are some of your matches</h1>
//       <MatchDetail
//         matchInfo={matchInfo}
//         currNum={userIdx + 1}
//         totalNum={totalNum}
//       />
//       <button onClick={handleLike}>Like</button>
//       <button onClick={handleDislike}>Dislike</button>
//     </div>
//   );
// }

// export default MatchList;

// import React, { useContext, useState } from "react";
// import UserContext from "../context/UserContext";
// import UserListData from "./UserListData";
// import MatchDetail from "./MatchDetail";
// import { Card } from "react-bootstrap";

/** MatchList component
 *
 * Props:
 * - like: function to like a match passed from App component, handles liking a match
 * - dislike: function to dislike a match passed from App component, handles disliking a match
 *
 * State:
 * - matchIdx: index of current match in matchList array (match objects)
 *
 * Context:
 * - potentialMatches: array of match objects
 *   [ { username, first_name, last_name, hobbies, interests, city, country, zipCode, latitude, longitude, image_url },...]
 *
 * App-> routes-> MatchList -> MatchDetail
 *
 */

// function MatchList({ like, dislike }) {
//   const { potentialMatches } = useContext(UserContext);
//   const [matchIdx, setMatchIdx] = useState(0);

//   const matchInfo = potentialMatches[matchIdx];
//   const totalNum = potentialMatches.length;

//   // allows user to like a potential match
//   function handleLike(e) {
//     like(matchInfo.id);
//     setMatchIdx((matchIdx + 1) % totalNum);
//   }

//   //allows user to dislike a potential match
//   function handleDislike(e) {
//     dislike(matchInfo.id);
//     setMatchIdx((matchIdx + 1) % totalNum);
//   }

//   //if not matches are found, display message
//   if (totalNum === 0) {
//     return (
//       <div className="MatchList">
//         <h1>No matches found!</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="MatchList">
//       <h1>Here are some of your matches</h1>
//       <userData
//         matchInfo={matchInfo}
//         currNum={matchIdx + 1}
//         totalNum={totalNum}
//       />
//       <button onClick={handleLike}>Like</button>
//       <button onClick={handleDislike}>UnLike</button>
//     </div>
//   );
// }

import React from "react";
import MatchDetail from "./MatchDetail";

function MatchList({ like, dislike }) {
  console.debug("MatchList", "like=", like, "dislike=", dislike);

  return (
    <div className="MatchList">
      {like && dislike && <MatchDetail like={like} dislike={dislike} />}
    </div>
  );
}

export default MatchList;

/** Show page with a list of potential matches
 *
 * On mount, loads list of potential matches and updates via setMatches
 * Re-loads list of potential matches upon "like" or "dislike"
 *
 * Routed at /users/:username/matches
 *
 * Routes -> MatchList -> MatchDetail
 */

function MatchList() {
  console.debug("MatchList");

  const { currentUser } = useContext(UserContext);
  const [matches, setMatches] = useState(null);

  useEffect(
    function showPotentialMatches() {
      async function matchList() {
        let matches = await UrGuideApi.matchList(currentUser.username);
        console.debug("MatchList useEffect matchList", "matches=", matches);
        setMatches(matches);
      }
      matchList();
    },
    [currentUser.username]
  );

  if (!matches) return <p>Loading...</p>;

  return (
    <div className="MatchList">
      <h3 className="text-center">Potential Matches</h3>
      {matches.map((m) => (
        <MatchDetail key={m.username} match={m} />
      ))}
    </div>
  );
}

// function MatchList() {
//   const { currentUser } = useContext(UserContext);
//   const [matches, setMatches] = useState(null);
//   const [matchInfo, setMatchInfo] = useState(null);

//   console.debug("MatchList", "currentUser=", currentUser);

//   useEffect(
//     function getPotentialUserMatches() {
//       async function getPotentialMatches() {
//         let matches = await UrGuideApi.getPotentialMatches(
//           currentUser.username
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
//     [currentUser.username]
//   );

//   if (!matches) return <p>Loading...</p>;

//   return (
//     <div className="MatchList">
//       <h3 className="text-center">Potential Matches</h3>
//       {matches.map((m) => (
//         <MatchCard
//           key={m.username}
//           username={m.username}
//           matchInfo={m}
//           setMatchInfo={setMatchInfo}
//         />
//       ))}
//       {matchInfo && (
//         <MatchDetail
//           username={currentUser.username}
//           matchInfo={matchInfo}
//           setMatchInfo={setMatchInfo}
//         />
//       )}
//     </div>
//   );
// }

//   const { currentUser } = useContext(UserContext);
//   const [matches, setMatches] = useState(null);

//   console.debug("MatchList", "currentUser=", currentUser, "matches=", matches);

//   useEffect(
//     function getPotentialUserMatches() {
//       async function getPotentialMatches() {
//         setMatches(await UrGuideApi.getPotentialMatches(currentUser.username));
//       }
//       getPotentialMatches();
//     },
//     [currentUser.username]
//   );

//   if (!matches) return <p>Loading...</p>;

//   return (
//     <div className="MatchList">
//       <h3 className="text-center">Here are some of your matches</h3>
//       {matches.map((m) => (
//         <MatchCard
//         //   key={m.id}
//         //   username={m.username}
//         //   first_name={m.first_name}
//         //   last_name={m.last_name}
//         //   city={m.city}
//         //   image_url={m.image_url}
//         ///>
//         //   key={m.user_id}
//         //   username={m.username}
//         />
//       ))}
//     </div>
//   );
// }

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

// function like(username) {
//   let data = {
//     username: username,
//     user_id: currentUser.user_id,
//   };
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

// function like(username) {
//   try {
//     async function likeUser() {
//       let match = await UrGuideApi.likeMatch(
//         currentUser.username,
//         username,
//         matchInfo
//       );
//       setMatches(match);
//     }
//     return likeUser();
//   } catch (err) {
//     console.error("MatchList like: problem with like", err);
//   }
// }

// async function like(username) {
//   try {
//     let matches = await UrGuideApi.likeMatch(currentUser.username, username);
//     setMatches(matches);
//   } catch (err) {
//     console.error("MatchList like: problem with like", err);
//   }
// }

// function like(username) {
//   async function likeUser() {
//     await UrGuideApi.likeMatch(currentUser.username, username);
//     setMatches(matches);
//   }
//   return likeUser();
// }
