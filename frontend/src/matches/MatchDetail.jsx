import * as React from "react";
import { Link, NavLink, Switch, Route, Redirect } from "react-router-dom";

function MatchDetail({ UserMatchInfo, currNum, totalNum }) {
  const {
    username,
    first_name,
    last_name,
    hobbies,
    interests,
    city,
    country,
    zipCode,
    // latitude,
    // longitude,
    image_url,
  } = UserMatchInfo;

  return (
    <div className="MatchDetail">
      <h1>
        Here are some of your matches {currNum} of {totalNum}
      </h1>
      <h2>
        {first_name} {last_name}
      </h2>
      <p className="MatchDetail-card-title">Username: {username}</p>
      <p className="MatchDetail-card-title">My hobbies: {hobbies}</p>
      <p className="MatchDetail-card-title">My interests: {interests}</p>
      <p className="MatchDetail-card-title">
        I'm from {city}, {country}, {zipCode}
      </p>
      <img className="MatchDetail-card-img" src={image_url} alt="user-img" />
    </div>
  );
}

export default MatchDetail;
