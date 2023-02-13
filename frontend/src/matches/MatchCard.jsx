import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import UserContext from "../context/UserContext";
import UrGuideApi from "../api";
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

function MatchCard({
  username,
  first_name,
  last_name,
  image_url,
  city,
  state,
  interests,
  hobbies,
  like,
  dislike,
  user_id,
}) {
  const { currentUser } = useContext(UserContext);
  const [matchInfo, setMatchInfo] = useState(null);

  // console.debug(
  //   "MatchCard",
  //   "username=",
  //   "first_name=",
  //   first_name,
  //   "last_name=",
  //   "city=",
  //   city,
  //   "state=",
  //   state,
  //   "interests=",
  //   interests,
  //   "hobbies=",
  //   hobbies,
  //   "like=",
  //   like,
  //   "dislike=",
  //   dislike,
  //   "id=",
  //   id
  // );

  const getPotentialUserMatches = () => {
    async function getPotentialMatches() {
      let matchInfo = await UrGuideApi.getPotentialMatches(
        currentUser.username,
        user_id
      );
      console.debug(
        "MatchCard useEffect getPotentialMatches",
        "matchInfo=",
        matchInfo
      );
      setMatchInfo(matchInfo);
    }
    getPotentialMatches();
  };

  /** Working */

  /** Handle onClick for liking a user */

  // function handleLike(e) {
  //   try {
  //     e.preventDefault();
  //     like(username);
  //   } catch (err) {
  //     console.error("MatchCard like: problem with like", err);
  //   }
  // }

  /** Handle onClick for disliking a user */
  // function handleDislike(e) {
  //   try {
  //     e.preventDefault();
  //     dislike(username);
  //   } catch (err) {
  //     console.error("MatchCard dislike: problem with dislike", err);
  //   }
  // }

  return (
    <div className="MatchCard card" to={`${username}/matches`}>
      <Link to={`users/${currentUser.username}/info/${username}`}>
        <div className="card-body">
          <h3>
            You matched with: {username}
            {user_id}
          </h3>
          <h6 className="card-title">
            {image_url && (
              <img
                src={image_url}
                alt={`User {first_name}`}
                className="float-end ms-5"
              />
            )}
          </h6>
          <p>
            Name: {first_name} {last_name}
          </p>
          <p>City: {city}</p>
          <p>State: {state}</p>
          <p>Interests: {interests}</p>
          <p>Hobbies: {hobbies}</p>
          <Button color="primary" size="sm" onClick={() => like(user_id)}>
            Like
          </Button>{" "}
          <Button color="danger" size="sm" onClick={() => dislike(user_id)}>
            Dislike
          </Button>
        </div>
      </Link>
    </div>
  );
}

export default MatchCard;
