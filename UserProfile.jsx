import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UrGuideApi from "../api";

const UserProfile = ({}) => {
  const { user_id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUserInfo() {
      try {
        const user = await UrGuideApi.getMatchInfo(user_id);
        setUser(user);
      } catch (error) {
        console.error(error);
      }
    }

    getUserInfo();
  }, [user_id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="UserProfile">
      <h1>{user.username}</h1>
      <p>First Name: {user.first_name}</p>
    </div>
  );
};

export default UserProfile;
