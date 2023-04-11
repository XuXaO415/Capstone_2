import React, { useContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext";

import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import UrGuideApi from "../api";
import { Card } from "react-bootstrap";

/** MatchDetail Component
 *
 * Props:
 * - UserMatchInfo: object with match info
 * { username, first_name, last_name, hobbies, interests, city, country, zipCode, latitude, longitude, image_url }
 *
 * - currNum: current number of match
 * - totalNum: total number of matches
 *
 * MatchDetail -> MatchList
 *
 * Routed at /matches (MatchList)
 */

// function MatchDetail({ currNum, totalNum }) {
//   console.debug("MatchDetail=", "currNum=", currNum, "totalNum=", totalNum);

//   const { first_name, last_name, hobbies, interests, city, country } =
//     useContext(UserContext);

//   const [matchIdx, setMatchIdx] = useState(0);
//   const [matchInfo, setMatchInfo] = useState(null);

//   React.useEffect(
//     function getMatchInfo() {
//       console.debug(
//         "MatchDetail useEffect getMatchInfo",
//         "matchIdx=",
//         matchIdx
//       );

//       async function getMatchInfo() {
//         let matchInfo = await UrGuideApi.getUserListData(matchIdx);
//         setMatchInfo(matchInfo);
//       }
//       getMatchInfo();
//     },
//     [matchIdx]
//   );

//   async function handleLike(e) {
//     e.preventDefault();
//     await UserListData.like(matchInfo.id);
//     setMatchIdx((matchIdx + 1) % totalNum);
//   }

//   async function handleDislike(e) {
//     e.preventDefault();
//     await UserListData.dislike(matchInfo.id);
//     setMatchIdx((matchIdx + 1) % totalNum);
//   }

//   return (
//     <div className="MatchDetail">
//       <h1>
//         Here are some of your matches {currNum} of {totalNum}
//       </h1>
//       <h2>
//         {first_name} {last_name}
//       </h2>

//       <div className="MatchDetail-card">
//         <div className="MatchDetail-card-body">
//           <p className="MatchDetail-card-title">My hobbies are: {hobbies}</p>
//           <p className="MatchDetail-card-title">
//             My interests are: {interests}
//           </p>
//           <p className="MatchDetail-card-title">
//             I'm from {city}, {country}
//           </p>
//         </div>
//       </div>
//       <div className="MatchDetail-buttons">
//         <Button
//           className="MatchDetail-button"
//           variant="primary"
//           onClick={handleLike}
//         >
//           Like
//         </Button>
//         <Button
//           className="MatchDetail-button"
//           variant="danger"
//           onClick={handleDislike}
//         >
//           Dislike
//         </Button>
//       </div>
//     </div>
//   );
// }

// function MatchDetail({ UserMatchInfo, currNum, totalNum }) {
//   const {
//     first_name,
//     last_name,
//     hobbies,
//     interests,
//     city,
//     country,

//   } = UserMatchInfo;

//   return (
//     <div className="MatchDetail">
//       <h1>
//         Here are some of your matches {currNum} of {totalNum}
//       </h1>
//       <h2>
//         {first_name} {last_name}
//       </h2>

//       <p className="MatchDetail-card-title">My hobbies: {hobbies}</p>
//       <p className="MatchDetail-card-title">My interests: {interests}</p>
//       <p className="MatchDetail-card-title">
//         I'm from {city}, {country}
//       </p>
//       <img className="MatchDetail-card-img" src={image_url} alt="user-img" />
//     </div>
//   );
// }

// function MatchDetail() {
//   const { username, user_id } = useParams();
//   const [matchInfo, setMatchInfo] = useState(null);

//   console.debug("MatchDetail", "username=", username, "user_id=", user_id);

//   useEffect(
//     function getPotentialUserMatches() {
//       async function getPotentialMatches() {
//         setMatchInfo(await UrGuideApi.getPotentialMatches(username, user_id));
//       }
//       getPotentialMatches();
//     },
//     [username, user_id]
//   );

//   if (!matchInfo) return <p>Loading...</p>;

//   return (
//     <div className="MatchDetail">
//       <Card>
//         <h3 className="text-center">You matched with: {matchInfo.username}</h3>
//         <Card.Img variant="top" src={matchInfo.image_url} />
//         <Card.Body>
//           <Card.Title>
//             {matchInfo.first_name} {matchInfo.last_name}
//           </Card.Title>
//           <Card.Text>
//             <strong>City:</strong> {matchInfo.city}
//           </Card.Text>
//           <Card.Text>
//             <Card.Text>
//               <strong>State:</strong> {matchInfo.state}
//             </Card.Text>
//             <strong>Country:</strong> {matchInfo.country}
//           </Card.Text>
//           <Card.Text>
//             <strong>Zip Code:</strong> {matchInfo.zipCode}
//           </Card.Text>
//           <Card.Text>
//             <strong>Hobbies:</strong> {matchInfo.hobbies}
//           </Card.Text>
//           <Card.Text>
//             <strong>Interests:</strong> {matchInfo.interests}
//           </Card.Text>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }

// function MatchDetail() {
//   const { username } = useParams();
//   const [matchInfo, setMatchInfo] = useState(null);

//   console.debug("MatchDetail", "username=", username);

//   useEffect(
//     function getMatchInfo() {
//       console.debug(
//         "MatchDetail useEffect getMatchInfo",
//         "username=",
//         username
//       );

//       async function getMatchInfo() {
//         setMatchInfo(await UrGuideApi.getPotentialMatches(username));
//       }
//       getMatchInfo();
//     },
//     [username]
//   );

//   if (!matchInfo) return <p>Loading...</p>;

//   return (
//     <div className="MatchDetail">
//       <Card>
//         <Card.Img variant="top" src={matchInfo.image_url} />
//         <Card.Body>
//           <Card.Title>
//             {matchInfo.first_name} {matchInfo.last_name}
//           </Card.Title>
//           <Card.Text>
//             <strong>City:</strong> {matchInfo.city}
//           </Card.Text>
//           <Card.Text>
//             <Card.Text>
//               <strong>State:</strong> {matchInfo.state}
//             </Card.Text>
//             <strong>Country:</strong> {matchInfo.country}
//           </Card.Text>
//           <Card.Text>
//             <strong>Zip Code:</strong> {matchInfo.zipCode}
//           </Card.Text>
//           <Card.Text>
//             <strong>Latitude:</strong> {matchInfo.latitude}
//           </Card.Text>
//           <Card.Text>
//             <strong>Longitude:</strong> {matchInfo.longitude}
//           </Card.Text>
//           <Card.Text>
//             <strong>Hobbies:</strong> {matchInfo.hobbies}
//           </Card.Text>
//           <Card.Text>
//             <strong>Interests:</strong> {matchInfo.interests}
//           </Card.Text>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }

// function MatchDetail() {
//   const { username, user_id } = useParams();
//   const { currentUser } = useContext(UserContext);
//   const [matchInfo, setMatchInfo] = useState(null);

//   console.debug(
//     "MatchDetail",
//     "currentUser=",
//     currentUser,
//     "username=",
//     username,
//     "user_id=",
//     user_id
//   );

//   useEffect(
//     function getPotentialUserMatches() {
//       async function getPotentialMatches() {
//         setMatchInfo(await UrGuideApi.getPotentialMatches(username, user_id));
//       }
//       getPotentialMatches();
//     },
//     [username, user_id]
//   );

//   if (!matchInfo) return <p>Loading...</p>;
//   return (
//     <div className="MatchDetail">
//       <Card>
//         <h3 className="text-center">You matched with: {matchInfo.username}</h3>
//         <Card.Img variant="top" src={matchInfo.image_url} />
//         <Card.Body>
//           <Card.Title>
//             {matchInfo.first_name} {matchInfo.last_name}
//           </Card.Title>
//           <Card.Text>
//             <strong>City:</strong> {matchInfo.city}
//           </Card.Text>
//           <Card.Text>
//             <Card.Text>
//               <strong>State:</strong> {matchInfo.state}
//             </Card.Text>
//             <strong>Country:</strong> {matchInfo.country}
//           </Card.Text>
//           <Card.Text>
//             <strong>Zip Code:</strong> {matchInfo.zipCode}
//           </Card.Text>
//           <Card.Text>
//             <strong>Hobbies:</strong> {matchInfo.hobbies}
//           </Card.Text>
//           <Card.Text>
//             <strong>Interests:</strong> {matchInfo.interests}
//           </Card.Text>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }

// function MatchDetail() {
//   const { username, user_id } = useParams();
//   const [matchInfo, setMatchInfo] = useState(null);

//   console.debug("MatchDetail", "username=", username, "user_id=", user_id);

//   useEffect(
//     function getPotentialUserMatches() {
//       async function getPotentialMatches() {
//         setMatchInfo(await UrGuideApi.getPotentialMatches(username, user_id));
//       }
//       getPotentialMatches();
//     },
//     [username, user_id]
//   );

//   if (!matchInfo) return <p>Loading...</p>;

//   return (
//     <div className="MatchDetail">
//       <Card>
//         <h3 className="text-center">You matched with: {matchInfo.username}</h3>
//         <Card.Img variant="top" src={matchInfo.image_url} />
//         <Card.Body>
//           <Card.Title>
//             {matchInfo.first_name} {matchInfo.last_name}
//           </Card.Title>
//           <Card.Text>
//             <strong>City:</strong> {matchInfo.city}
//           </Card.Text>
//           <Card.Text>
//             <Card.Text>
//               <strong>State:</strong> {matchInfo.state}
//             </Card.Text>
//             <strong>Country:</strong> {matchInfo.country}
//           </Card.Text>
//           <Card.Text>
//             <strong>Zip Code:</strong> {matchInfo.zipCode}
//           </Card.Text>
//           <Card.Text>
//             <strong>Hobbies:</strong> {matchInfo.hobbies}
//           </Card.Text>
//           <Card.Text>
//             <strong>Interests:</strong> {matchInfo.interests}
//           </Card.Text>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }

export default MatchDetail;

return (
  <div className="MatchDetail">
    <Card>
      <Card.Header>User Info</Card.Header>

      {/* {!matchInfo && <p>Loading...</p>} */}
      <h3 className="text-center">
        {/* <Link to={`/users/${currentUser.username}/matches`}>
            Back to Matches
          </Link> */}
        {/* Hey {currentUser.username}, you matched with: {matchInfo.username} */}
      </h3>
      {/* <Card.Link href={`/users/matches/user/${matchInfo.user_id}`} />

        <Card.Img variant="top" src={matchInfo.image_url} /> */}
      {/* <Card.Body>
          <Card.Title>
            {matchInfo.first_name} {matchInfo.last_name}
          </Card.Title>
          <Card.Text>
            <strong>City:</strong> {matchInfo.city}
          </Card.Text>
          <Card.Text>
            <Card.Text>
              <strong>State:</strong> {matchInfo.state}
            </Card.Text>
            <strong>Country:</strong> {matchInfo.country}
          </Card.Text>
          <Card.Text>
            <strong>Zip Code:</strong> {matchInfo.zipCode}
          </Card.Text>
          <Card.Text>
            <strong>Hobbies:</strong> {matchInfo.hobbies}
          </Card.Text>
          <Card.Text>
            <strong>Interests:</strong> {matchInfo.interests}
          </Card.Text>
        </Card.Body> */}
    </Card>
  </div>
);

/** Get user match info */

// function getMatchInfo() {
//   async function getMatchInfo() {
//     let MatchCard = await UrGuideApi.getMatchInfo(user_id);
//     console.debug("MatchDetail useEffect getMatchInfo", "setMatchInfo=");
//   }
//   getMatchInfo();
// }

return (
  <div className="MatchDetail">
    <Card>
      <Card.Header>User Details</Card.Header>
      {/* 
        {!matchInfo && <p>Loading...</p>} */}
      <h3 className="text-center">
        <Link to={`/matches`}>Back to Matches</Link>
        {/* Hey {currentUser.username}, you matched with: {matchInfo.username} */}
      </h3>
      {Array.isArray(matchInfo) && (
        <div className="MatchDetail-list">
          {matchInfo.map((m) => (
            <div key={m.user_id} className="MatchDetail-card">
              User: {m.username}
            </div>
          ))}
          <div className="MatchDetail-card">
            <Card.Img variant="top" src={matchInfo.image_url} />
            <Card.Body>
              <Card.Title>
                {matchInfo.first_name} {matchInfo.last_name}
              </Card.Title>
            </Card.Body>
          </div>
        </div>
      )}
    </Card>
  </div>
);

// if (!matchInfo) return <p>Loading...</p>;
return (
  <div className="MatchDetail">
    <Card>
      <Card.Header>User Details</Card.Header>
      <h3 className="text-center">
        <Link to={`/matches`}>Back to Matches</Link>
      </h3>
      {matchInfo ? (
        matchInfo.map((user) => (
          <div key={user.user_id} className="MatchDetail-list">
            <div className="MatchDetail-card">User: {user.username}</div>
            <div className="MatchDetail-card">
              <Card.Img variant="top" src={user.image_url} />
              <Card.Body>
                <Card.Title>
                  {user.first_name} {user.last_name}
                </Card.Title>
              </Card.Body>
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </Card>
  </div>
);
