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

function MatchDetail() {
  const { user_id } = useParams();
  const { currentUser } = useContext(UserContext);
  const [matchInfo, setMatchInfo] = useState(null);

  console.debug(
    "MatchDetail=",
    "matchInfo=",
    "currentUser=",
    currentUser,
    "user_id=",
    user_id
  );

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

  useEffect(
    function getMatchInfo() {
      async function getMatchInfo() {
        let matchInfo = await UrGuideApi.getMatchInfo(
          currentUser.username,
          user_id
        );
        console.debug(
          "MatchDetail useEffect getMatchInfo",
          "matchInfo=",
          matchInfo
        );
        setMatchInfo(matchInfo);
      }
      getMatchInfo();
    },
    [user_id, currentUser.username]
  );

  return (
    <div className="MatchDetail">
      <Card>
        <Card.Body>
          <Card.Title>Match Details</Card.Title>
        </Card.Body>
        <h3 className="text-center">
          <Link to={`/matches`}>Back to Matches</Link>
        </h3>
        {currentUser && currentUser.username ? (
          <p className="lead">
            Welcome, {currentUser.username}. You clicked on {user_id}!
          </p>
        ) : (
          <p className="lead">Welcome!</p>
        )}
        {matchInfo && matchInfo.length ? (
          matchInfo.map((u) => (
            <div key={u.user_id} className="MatchDetail-list">
              <div className="MatchDetail-card">User: {user_id.username}</div>
              <div className="MatchDetail-card">
                <Card.Img variant="top" src={user_id.image_url} />
                <Card.Body>
                  <Card.Title>{user_id.username}</Card.Title>
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
}

export default MatchDetail;
