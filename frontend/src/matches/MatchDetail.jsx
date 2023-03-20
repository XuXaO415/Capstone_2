import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
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

// function MatchDetail() {
//   const { user_id } = useParams();
//   const { currentUser } = useContext(UserContext);
//   const [matchInfo, setMatchInfo] = useState(null);

//   console.debug(
//     "MatchDetail=",
//     "matchInfo=",
//     "currentUser=",
//     currentUser,
//     "user_id=",
//     user_id
//   );

// useEffect(
//   function getPotentialUserMatches() {
//     async function getPotentialMatches() {
//       let matchInfo = await UrGuideApi.getPotentialMatches(
//         currentUser.username,
//         user_id
//       );
//       console.debug(
//         "MatchDetail useEffect getPotentialMatches",
//         "matchInfo=",
//         matchInfo
//       );
//     }
//     getPotentialMatches();
//   },
//   [user_id, currentUser.username]
// );

// useEffect(
//   function getMatchInfo() {
//     async function getMatchInfo() {
//       let matchInfo = await UrGuideApi.getMatchInfo(
//         currentUser.username,
//         user_id
//       );
//       console.debug(
//         "MatchDetail useEffect getMatchInfo",
//         "matchInfo=",
//         matchInfo
//       );

//       setMatchInfo(matchInfo);
//     }
//     getMatchInfo();
//   },
//   [user_id, currentUser.username]
// );

//   return (
//     <div className="MatchDetail">
//       <Card>
//         <Card.Body>
//           <Card.Title>Match Details</Card.Title>
//         </Card.Body>
//         <h3 className="text-center">
//           <Link to={`/matches`}>Back to Matches</Link>
//         </h3>
//         {currentUser && currentUser.username ? (
//           <p className="lead">
//             Welcome, {currentUser.username}. You clicked on {user_id}! more
//             details coming soon... {user_id.username}
//           </p>
//         ) : (
//           <p className="lead">Welcome!! HERE are your matches</p>
//         )}
//         {matchInfo && matchInfo.length ? (
//           matchInfo.map((user) => (
//             <div key={user.user_id} className="MatchDetail-list">
//               <div className="MatchDetail-card">User: {user_id.username}</div>
//               <div className="MatchDetail-card">
//                 <Card.Img variant="top" src={user_id.image_url} />
//                 <Card.Body>
//                   <Card.Title>{user_id.username}</Card.Title>
//                 </Card.Body>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>Loading...</p>
//         )}
//       </Card>
//     </div>
//   );
// }

function MatchDetail() {
  let { currentUser } = useContext(UserContext);
  let { user_id } = useParams();

  let [matchInfo, setMatchInfo] = useState([]);

  // useEffect(() => {
  //   async function getMatchInfo() {
  //     await UrGuideApi.getMatchInfo(currentUser.username, user_id);
  //     const matchInfo = [user];
  //     setMatchInfo(matchInfo);
  //   }

  useEffect(() => {
    async function getMatchInfo() {
      try {
        let { user } = await UrGuideApi.getMatchInfo(
          currentUser.username,
          user_id
        );
        let matchInfo = { currentUser, user, user_id };
        setMatchInfo(matchInfo);
      } catch (err) {
        console.error(
          "MatchDetail useEffect getMatchInfo: problem loading",
          err
        );
      }
    }
    getMatchInfo();
  }, [currentUser, currentUser.username, user_id]);

  // const handleDislike = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await UrGuideApi.dislikeUser(currentUser.username, user_id);
  //     setMatchInfo((matchInfo) =>
  //       matchInfo.filter((u) => u.user_id !== user_id)
  //     );
  //   } catch (err) {
  //     console.error("MatchDetail handleDislike: problem loading", err);
  //   }
  // };

  return (
    <div className="MatchDetail">
      <div className="card-container">
        <div className="user-image">
          {matchInfo && matchInfo.user && (
            <Card.Img variant="top" src={matchInfo.user.image_url} />
          )}
        </div>
        <div className="user-info">
          {currentUser && currentUser.username ? (
            <p className="lead">Here's more info on {user_id}!</p>
          ) : (
            <p className="lead">Welcome!! HERE are your matches</p>
          )}

          {matchInfo && matchInfo.user ? (
            <div key={matchInfo.user.user_id} className="MatchDetail-list">
              <Card.Body>
                <Card.Title>Name: {matchInfo.user.first_name}</Card.Title>
                <Card.Text>
                  <strong>City:</strong> {matchInfo.user.city}
                </Card.Text>
                <Card.Text>
                  <Card.Text>
                    <strong>State:</strong> {matchInfo.user.state}
                  </Card.Text>
                  <strong>Country:</strong> {matchInfo.user.country}
                </Card.Text>
                <Card.Text>
                  <strong>Zip Code:</strong> {matchInfo.user.zip_code}
                </Card.Text>
                <Card.Text>
                  <strong>Hobbies:</strong> {matchInfo.user.hobbies}
                </Card.Text>
                <Card.Text>
                  <strong>Interests:</strong> {matchInfo.user.interests}
                </Card.Text>
              </Card.Body>
              <div className="user-card">
                User: {user_id}
                <br></br>
                Username: {matchInfo.user.username}
                <br></br>
                City: {matchInfo.user.city}, State: {matchInfo.user.state}
              </div>
              {/* <button className="dislike-button" onClick={handleDislike}>
                Dislike
              </button> */}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="MatchDetail">
  //     <Card>
  //       <Card.Header as="h1">Match Details</Card.Header>
  //       <Card.Body>
  //         <Card.Title className="text-center">
  //           Here's some more info about me
  //         </Card.Title>
  //       </Card.Body>

  //       {currentUser && currentUser.username ? (
  //         <p className="lead">Here's more info on {user_id}!</p>
  //       ) : (
  //         <p className="lead">Welcome!! HERE are your matches</p>
  //       )}

  //       {matchInfo && matchInfo.user ? (
  //         <div key={matchInfo.user.user_id} className="MatchDetail-list">
  //           <div className="MatchDetail-card">
  //             <Card.Img variant="top" src={matchInfo.user.image_url} />
  //           </div>
  //           <Card.Body>
  //             <Card.Title>Name: {matchInfo.user.first_name}</Card.Title>
  //             <Card.Text>
  //               <strong>City:</strong> {matchInfo.user.city}
  //             </Card.Text>
  //             <Card.Text>
  //               <Card.Text>
  //                 <strong>State:</strong> {matchInfo.user.state}
  //               </Card.Text>
  //               <strong>Country:</strong> {matchInfo.user.country}
  //             </Card.Text>
  //             <Card.Text>
  //               <strong>Zip Code:</strong> {matchInfo.user.zip_code}
  //             </Card.Text>
  //             <Card.Text>
  //               <strong>Hobbies:</strong> {matchInfo.user.hobbies}
  //             </Card.Text>
  //             <Card.Text>
  //               <strong>Interests:</strong> {matchInfo.user.interests}
  //             </Card.Text>
  //           </Card.Body>
  //           <div className="MatchDetail-card">
  //             User: {user_id}
  //             <br></br>
  //             Username: {matchInfo.user.username}
  //             <br></br>
  //             City: {matchInfo.user.city}, State: {matchInfo.user.state}
  //             <div className="MatchDetail-card">
  //               <Card.Img variant="top" src={matchInfo.user.image_url} />
  //             </div>
  //           </div>
  //         </div>
  //       ) : (
  //         <p>Loading...</p>
  //       )}
  //     </Card>
  //   </div>
  // );
}

export default MatchDetail;
