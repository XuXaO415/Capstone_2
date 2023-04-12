// import { useEffect, useState, useEffect } from "react";
// import UrGuideApi from "../api";
// import UserProfileContext from "../context/UserProfileContext";

// function UserProfile({ username, user_id }) {
//   const { userProfile, setUserProfile } = useContext(UserProfileContext);

//   useEffect(() => {
//     async function getUser() {
//       let user = await UrGuideApi.getMatchInfo(username, user_id);
//       const data = await user.json();
//       setUser(data.user);
//     }
//     getUser();
//   }, [username, user_id]);

//   if (!user) {
//     return <div>Loading user info...</div>;
//   }

//   return <div></div>;
// }

// export default UserProfile;
