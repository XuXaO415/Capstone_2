import React, { useState, useEffect, useContext } from "react";
import UrGuideApi from "../api";
import UserContext from "../context/UserContext";
import MatchDetail from "./MatchDetail";

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

export default MatchList;
