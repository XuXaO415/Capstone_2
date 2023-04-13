// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { Button } from "react-bootstrap";
// import UserContext from "../context/UserContext";
// import UrGuideApi from "../api";

// /** Component that shows more info on a user when card from match list is clicked on
//  *
//  * Routed at /users/:username/matches/:user_id
//  *
//  * Routes -> MatchList -> MatchCard -> ShowUserInfo
//  *
//  */

// function ShowUserInfo({
//   username,
//   user_id,
//   first_name,
//   last_name,
//   image_url,
//   city,
//   state,
//   interests,
//   hobbies,
// }) {
//   const { currentUser } = useContext(UserContext);

//   /** Handle onClick for liking a user */

//   async function handleLike(evt) {
//     evt.preventDefault();
//     let like = await UrGuideApi.likeUser(currentUser.username, user_id);
//     console.debug("ShowUserInfo handleLike", "like=", like);
//   }
// }

// export default ShowUserInfo;
