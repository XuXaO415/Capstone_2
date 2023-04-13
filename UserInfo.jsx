import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import UserContext from "../context/UserContext";
import UrGuideApi from "../api";

/** UserInfo component
 *
 * Shows user's profile page
 *
 * Routes -> MatchList -> UserInfo
 *
 * Routed at /users/:username/matches/user/:user_id
 *
 */

function UserInfo(props) {
  let { user_id } = useParams();
  const { currentUser } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(
    function getUserInfo() {
      async function getUserInfo() {
        try {
          let userInfo = await UrGuideApi.getMatchInfo(
            currentUser.username,
            user_id
          );
          setUserInfo(userInfo);

          console.debug("UserInfo useEffect getUserInfo", "userInfo=");
        } catch (err) {
          console.error("UserInfo useEffect getUserInfo: problem loading", err);
          setUserInfo(null);
        }
      }
      getUserInfo();
    },
    [currentUser, user_id]
  );

  if (!userInfo) return <p>Loading...</p>;

  return (
    <div>
      {userInfo.map((user) => (
        <div key={user.user_id}>
          {/* <Link to={`/${currentUser.username}/matches/user/${user_id}/${user.username}`}>{user.username}</Link>; */}
          <img src={user.image_url} alt={user.username} />
          <h1>{user.username}</h1>
          <p>Name: {user.first_name}</p>
          <p>City: {user.city}</p>
          <p>State: {user.state}</p>
          <p>Country: {user.country}</p>
          <p>Interests: {user.interests}</p>
          <p>Hobbies: {user.hobbies}</p>
        </div>
      ))}
    </div>
  );
}

// const UserInfo = () => {
//   const { currentUser, user_id } = useContext(UserContext);
//   const [userInfo, setUserInfo] = useState(null);

//   useEffect(
//     function getUserInfo() {
//       async function getUserInfo() {
//         try {
//           let userInfo = await UrGuideApi.getMatchInfo(
//             currentUser.username,
//             user_id
//           );
//           setUserInfo(userInfo);

//           console.debug("UserInfo useEffect getUserInfo", "userInfo=");
//         } catch (err) {
//           console.error("UserInfo useEffect getUserInfo: problem loading", err);
//           setUserInfo(null);
//         }
//       }
//       getUserInfo();
//     },
//     [currentUser, user_id]
//   );

//   if (!userInfo) return <p>Loading...</p>;

//   return userInfo.map((user) => (
//     <div key={user.user_id}>
//       {/* <Link to={`/${currentUser.username}/matches/user/${user_id}/${user.username}`}>{user.username}</Link>; */}
//       <img src={user.image_url} alt={user.username} />
//       <h1>{user.username}</h1>
//       <p>Name: {user.first_name}</p>
//       <p>City: {user.city}</p>
//       <p>State: {user.state}</p>
//       <p>Country: {user.country}</p>
//       <p>Interests: {user.interests}</p>
//       <p>Hobbies: {user.hobbies}</p>
//     </div>
//   ));
// };

export default UserInfo;
