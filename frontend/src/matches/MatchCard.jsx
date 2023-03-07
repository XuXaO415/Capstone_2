import React, { Component, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import UrGuideApi from "../api";
import Alert from "../common/Alert";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import "./MatchCard.css";

/** Show limited information about a user
 *
 * Rendered by MatchList to show a "card" for each user
 *
 * Routes -> MatchList -> MatchCard
 *
 * Routed at /users/:username/matches
 *
 */

const MatchCard = ({
  username,
  user_id,
  first_name,
  last_name,
  image_url,
  city,
  state,
  interests,
  hobbies,
  like,
  dislike,
}) => {
  const { currentUser } = useContext(UserContext);

  const history = useHistory();

  /** Handle user like button when user likes a user */
  function handleLike(e) {
    e.preventDefault();
    console.log("MatchCard handleLike: user_id=", user_id, "was liked");
    like(user_id);
    history.push(`/users/${currentUser.username}/matches/user/${user_id}`);
  }

  /** Handle onClick for disliking a user */
  function handleDislike(e) {
    try {
      e.preventDefault();
      dislike(user_id);
    } catch (err) {
      console.log("MatchCard dislike: problem with dislike", err);
    }
  }

  return (
    <div className="MatchCard card" to={`${username}/matches `}>
      <div className="card-body">
        <h3>
          {/* <Link to={`users/${currentUser.username}/matches/user/${user_id}`}> */}
          You matched with: {username},
          <br />
          user_id:{user_id}
          {/* </Link> */}
        </h3>
        <h6 className="card-title">
          {image_url && (
            <img
              src={image_url}
              alt={`User ${first_name} ${last_name}}`}
              className="float-end ms-5"
            />
          )}
        </h6>
        <p>Name: {first_name}</p>
        <p>Interests: {interests}</p>
        <p>Hobbies: {hobbies}</p>
        <Button color="primary" size="sm" onClick={handleLike}>
          Like
        </Button>{" "}
        <Button color="danger" size="sm" onClick={handleDislike}>
          Dislike
        </Button>{" "}
        <footer className="user-info-pill">
          <Badge pill bg="light" text="white" position="right">
            <Link to={`users/${currentUser.username}/matches/user/${user_id}`}>
              user info
            </Link>
          </Badge>
        </footer>
      </div>
    </div>
  );
};

// function MatchCard({
//   username,
//   user_id,
//   first_name,
//   last_name,
//   image_url,
//   city,
//   state,
//   interests,
//   hobbies,
//   like,
//   dislike,
// }) {
//   const { currentUser } = useContext(UserContext);
//   const [matchInfo, setMatchInfo] = useState(null);

//   // const history = useHistory();

//   /** Handle user like button when user likes a user */
//   function handleLike(e) {
//     e.preventDefault();
//     console.log("MatchCard handleLike: user_id=", user_id, "was liked");
//     like(user_id);
//     // history.push(`/users/${currentUser.username}/matches/user/${user_id}`);
//   }

//   /** Handle onClick for disliking a user */
//   function handleDislike(e) {
//     try {
//       e.preventDefault();
//       dislike(user_id);
//     } catch (err) {
//       console.log("MatchCard dislike: problem with dislike", err);
//     }
//   }

//   // <Button onClick={() => history.goBack()}>Go Back</Button>;

//   return (
//     <div className="MatchCard card" to={`${username}/matches `}>
//       {/* <Link to={`users/${currentUser.username}/matches/user/${user_id}`}>
//         More info
//       </Link> */}
//       <div className="card-body">
//         <h3>
//           <Link to={`users/${currentUser.username}/matches/user/${user_id}`}>
//             You matched with: {username},
//             <br />
//             user_id:{user_id}
//           </Link>
//         </h3>
//         <h6 className="card-title">
//           {image_url && (
//             <img
//               src={image_url}
//               alt={`User ${first_name} ${last_name}}`}
//               className="float-end ms-5"
//             />
//           )}
//         </h6>
//         <p>Name: {first_name}</p>
//         {/* <p>City: {city}</p>
//         <p>State: {state}</p> */}
//         <p>Interests: {interests}</p>
//         <p>Hobbies: {hobbies}</p>
//         <Button color="primary" size="sm" onClick={handleLike}>
//           Like
//         </Button>{" "}
//         <Button color="danger" size="sm" onClick={handleDislike}>
//           Dislike
//         </Button>
//       </div>
//       {/* </Link> */}
//     </div>
//   );
// }

export default MatchCard;
