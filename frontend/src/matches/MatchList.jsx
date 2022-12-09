import * as React from "react";
import { Link, NavLink, Switch, Route, Redirect } from "react-router-dom";
import UserContext from "../context/UserContext";
import MatchDetail from "./MatchDetail";

function MatchList({ like, dislike }) {
  const { potentialMatches } = React.useContext(UserContext);
  const [userIdx, setUserIdx] = React.useState(0);

  const matchInfo = potentialMatches[userIdx];
  const totalNum = potentialMatches.length;

  /** Oof,  I'm having trouble with my MatchList component.
   * I'm trying to create a list of potential matches for the user, but I'm not sure how to display the list correctly.
   * I'm also not sure how to display the list of potential matches/guides in the MatchDetail component.
   * I'm not sure if I should be using a map function or if I should be using a for loop.
   *
   * This is the code I have so far:
   *
   **/

  // allows user to like a potential match or guide
  function handleLike(e) {
    like(matchInfo);
    setUserIdx((userIdx + 1) % totalNum);
  }

  //allows user to dislike a potential match or guide
  function handleDislike(e) {
    dislike(matchInfo);
    //Is this the correct way to go through the list of potential matches/guides? Is this the best way to do this logic wise?
    setUserIdx((userIdx + 1) % totalNum); // this allows the user to go through the list of potential matches/guides
  }

  //if not matches are found, display message
  if (totalNum === 0) {
    return (
      <div className="MatchList">
        <h1>No matches found!</h1>
      </div>
    );
  }

  return (
    <div className="MatchList">
      <h1>Here are some of your matches</h1>
      <MatchDetail
        matchInfo={matchInfo}
        currNum={userIdx + 1}
        totalNum={totalNum}
      />
      <button onClick={handleLike}>Like</button>
      <button onClick={handleDislike}>Dislike</button>
    </div>
  );
}

export default MatchList;
