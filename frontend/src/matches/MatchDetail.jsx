import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import UrGuideApi from "../api";
import UserContext from "../context/UserContext";
import { Card } from "react-bootstrap";

/** Match Detail page
 *
 * Renders a potential match's profile
 *
 * Routed at users/username/matches/:user_id
 *
 * Routes -> MatchDetail -> MatchList
 */

function MatchDetail() {
  const { username, user_id } = useParams();
  const { currentUser } = useContext(UserContext);
  const [matchInfo, setMatchInfo] = useState(null);

  console.debug(
    "MatchDetail",
    "currentUser=",
    currentUser,
    "username=",
    username,
    "user_id=",
    user_id
  );

  useEffect(
    function getPotentialUserMatches() {
      async function getPotentialMatches() {
        let matchInfo = await UrGuideApi.getPotentialMatches(username, user_id);
        console.debug(
          "MatchDetail useEffect getPotentialMatches",
          "matchInfo=",
          matchInfo
        );
        // setMatchInfo(await UrGuideApi.getPotentialMatches(username, user_id));
      }
      getPotentialMatches();
    },
    [username, user_id]
  );

  if (!matchInfo) return <p>Loading...</p>;

  return (
    <div className="MatchDetail">
      <Card>
        <h3 className="text-center">You matched with: {matchInfo.username}</h3>
        <Card.Img variant="top" src={matchInfo.image_url} />
        <Card.Body>
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
        </Card.Body>
      </Card>
    </div>
  );
}

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
