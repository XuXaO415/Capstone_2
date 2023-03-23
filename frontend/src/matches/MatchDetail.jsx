import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import UrGuideApi from "../api";
import UserContext from "../context/UserContext";
import { Card } from "react-bootstrap";
import "./MatchDetail.css";

/** Match Detail page
 *
 * Renders a potential match's profile
 *
 * Routed at users/username/matches/:user_id
 *
 * Routes -> MatchDetail -> MatchList
 */

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
      {/* <div className="card-container"> */}
      <div className="user-image">
        {matchInfo && matchInfo.user && (
          <Card.Img variant="top" src={matchInfo.user.image_url} />
        )}
      </div>
      <div className="user-info">
        {currentUser && currentUser.username ? (
          <p className="lead">Here's more info on {user_id}!</p>
        ) : (
          <p>Loading...</p>
        )}

        {matchInfo && matchInfo.user ? (
          <div key={matchInfo.user.user_id} className="MatchDetail-list">
            <Card.Body>
              <Card.Title>Name: {matchInfo.user.first_name}</Card.Title>
              <Card.Text>
                <strong>City:</strong> {matchInfo.user.city}
              </Card.Text>
              <Card.Text>
                <strong>State:</strong> {matchInfo.user.state}
              </Card.Text>
              <strong>Country:</strong> {matchInfo.user.country}
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
            {/* <div className="user-card">
                User: {user_id}
                <br></br>
                Username: {matchInfo.user.username}
                <br></br>
                City: {matchInfo.user.city}, State: {matchInfo.user.state}
              </div> */}
            {/* <button className="dislike-button" onClick={handleDislike}>
                Dislike
              </button> */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
    // </div>
  );
}

export default MatchDetail;
