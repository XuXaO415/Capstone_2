import React, { useState, useEffect, useContext } from "react";
import UrGuideApi from "../api";
import UserContext from "../context/UserContext";
import MatchDetail from "./MatchDetail";
import MatchCard from "./MatchCard";

/** Show page with a list of potential matches
 *
 * On mount, loads list of potential matches and updates via setMatches
 * Re-loads list of potential matches upon "like" or "dislike"
 *
 * Routed at /users/:username/matches/user_id
 *
 * Routes -> MatchList -> {MatchDetail, MatchCard}
 *
 */

function MatchList() {
  const { currentUser } = useContext(UserContext);
  const [matches, setMatches] = useState(null);

  console.debug("MatchList", "currentUser=", currentUser, "matches=", matches);

  useEffect(
    function getPotentialUserMatches() {
      async function getPotentialMatches() {
        setMatches(await UrGuideApi.getPotentialMatches(currentUser.username));
      }
      getPotentialMatches();
    },
    [currentUser.username]
  );

  if (!matches) return <p>Loading...</p>;

  return (
    <div className="MatchList">
      <h3 className="text-center">Potential Matches</h3>
      {matches.map((m) => (
        <MatchCard
          key={m.id}
          username={m.username}
          first_name={m.first_name}
          last_name={m.last_name}
          city={m.city}
          image_url={m.image_url}
        />
      ))}
    </div>
  );
}

export default MatchList;
