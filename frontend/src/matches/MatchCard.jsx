import React from "react";
import { Link } from "react-router-dom";

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
}) {
  console.debug("MatchCard", "username=", username);

  return (
    <div className="MatchCard" to={`/users/${username}/matches`}>
      <Link to={`/users/${username}/matches`}>
        <div className="card-body">
          <h3>
            You matched with: {first_name} {last_name}
          </h3>
          <h6 className="card-title">
            {username}
            {image_url && (
              <img
                src={image_url}
                alt={first_name}
                className="float-end ms-5"
              />
            )}
          </h6>
          <p>First Name: {first_name}</p>
          <p>City: {city}</p>
          <p>State: {state}</p>
          <p>Hobbies: {hobbies}</p>
          <p>Interests: {interests}</p>
          <p>Hobbies: {hobbies}</p>
        </div>
      </Link>
    </div>
  );
}

export default MatchCard;

//{
/* <h3 className="text-center">
        {first_name} {last_name}
      </h3> */
//}
//{
/* <img src={image_url} alt={first_name} />
      <p>
        <li className="list-group">
          <strong>City:</strong> {city}
        </li>

        <li className="list-group">
          <strong>Username:</strong> {username}
        </li>
      </p> */
//}
