// const MatchCard = ({
//   username,
//   user_id,
//   first_name,
//   image_url,
//   country,
//   city,
//   state,
//   zip_code,
//   interests,
//   hobbies,
//   // like,
//   // dislike,
// }) => {
//   const { currentUser } = useContext(UserContext);
//   const [matches, setMatches] = useState(null);
//   const [matchInfo, setMatchInfo] = useState(null);
//   const [error, setError] = useState(null);

//   const like = async (user_id) => {
//     try {
//       let matchInfo = await UrGuideApi.likeMatch(currentUser.username, user_id);
//       setMatchInfo(matchInfo);
//       setMatches((m) => m.filter((match) => match.user_id !== user_id));
//       setTimeout(() => {
//         setMatchInfo(user_id);
//       }, 2000);
//     } catch (errors) {
//       setError(errors);
//     }
//   };

//   const dislike = async (user_id) => {
//     try {
//       let matchInfo = await UrGuideApi.dislikeMatch(
//         currentUser.username,
//         user_id
//       );
//       setMatchInfo(matchInfo);
//       setMatches((m) => m.filter((match) => match.user_id !== user_id));
//       setTimeout(() => {
//         setMatchInfo(user_id);
//       }, 2000);
//     } catch (errors) {
//       setError(errors);
//     }
//   };

//   function likeMatch({ user_id, like }) {
//     const handleLike = (e) => {
//       e.preventDefault();
//       console.log("MatchCard handleLike: user_id=", user_id, "was liked");
//       like(user_id);
//     };

//     return (
//       <Button
//         variant="primary"
//         size="sm"
//         className="float-end"
//         onClick={handleLike}
//       >
//         Like
//       </Button>
//     );
//   }

//   // function handleLike(e) {
//   //   e.preventDefault();
//   //   console.log("MatchCard handleLike: user_id=", user_id, "was liked");
//   //   like(user_id);
//   // }

//   // function handleDislike(e) {
//   //   e.preventDefault();
//   //   console.log("MatchCard dislike: user_id=", user_id, "was disliked");
//   //   dislike(user_id);
//   // }

//   function dislikeMatch({ user_id, dislike }) {
//     const handleDislike = (e) => {
//       e.preventDefault();
//       console.log("MatchCard handleDislike: user_id=", user_id, "was disliked");
//       dislike(user_id);
//     };

//     return (
//       <Button
//         variant="danger"
//         size="sm"
//         className="float-end"
//         onClick={handleDislike}
//       >
//         Dislike
//       </Button>
//     );
//   }

//   return (
//     <div
//       className="MatchCard card"
//       to={`users/${username}/matches/user/${user_id} `}
//     >
//       <div className="card-body">
//         <h3>
//           You matched with: {username},
//           <br />
//           {/* user_id:{user_id} */}
//         </h3>
//         <h6 className="card-title">
//           {image_url && (
//             <img
//               src={image_url}
//               alt={`User ${username} profile pic`}
//               className="float-end ms-5"
//             />
//           )}
//         </h6>
//         <p>Name: {first_name}</p>
//         <p>City: {city}</p>
//         <p>State: {state}</p>
//         <p>Country: {country}</p>
//         <p>Zip Code: {zip_code}</p>
//         <p>Interests: {interests}</p>
//         <p>Hobbies: {hobbies}</p>
//         {likeMatch({ user_id, like })}
//         <span> </span>
//         {/* <Button color="primary" size="sm" onClick={handleLike}>
//           Like
//         </Button>{" "} */}
//         {/* <Button color="danger" size="sm" onClick={handleDislike}>
//           Dislike
//         </Button>{" "} */}
//         {dislikeMatch({ user_id, dislike })}
//         <div className="user-info-pill">
//           <Badge pill bg="light" text="white" position="right">
//             <Link to={`users/${currentUser.username}/matches/user/${user_id}`}>
//               user info
//             </Link>{" "}
//           </Badge>
//         </div>
//       </div>
//     </div>
//   );
// };
