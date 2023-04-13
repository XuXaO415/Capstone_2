import axios from "axios";
import { TOKEN_STORAGE_ID } from "./App";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class UrGuideApi {
  // store API token here
  static token;

  static async request(endpoint, data = {}, method = "GET") {
    console.debug("API Call:", endpoint, data, method);

    const _token = localStorage.getItem(TOKEN_STORAGE_ID);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = {
      Authorization: `Bearer ${UrGuideApi.token}`,
    };
    const response = await axios({
      url,
      data,
      method,
      headers,
    });
    const params = method === "GET" ? data : {};
    console.debug("API Response:", response.data, params);

    try {
      return (
        await axios({
          url,
          method,
          data,
          params,
          headers,
        })
      ).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API calls

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  // static async getCurrentUserById(currentUser, user_id) {
  //   let res = await this.request(`users/${currentUser}/${user_id}`, "GET");
  //   return res.user;
  // }

  /** auth methods */

  static async login(data) {
    let res = await this.request(`auth/token`, data, "POST");
    console.debug(res, "res from login was successful");
    return res.token;
  }



  static async signup(data) {
    let res = await this.request(`auth/register`, data, "POST");
    console.log(res, "res from signup was successful");
    return res.token;
  }

  /** Create a new user  */

  static async createUser(data) {
    let res = await this.request(`users`, data, "POST");
    return res.user;
  }

  /* Update user profile */

  static async updateProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "PATCH");
    console.log(res, "res from updateProfile was successful");
    return res.user;
  }

  /** Upload user image */

  // static async uploadImage(data) {
  //   let headers = {
  //     "Content-Type": "multipart/form-data",
  //     Authorization: `Bearer ${UrGuideApi.token}`,
  //   };
  //   let res = await axios.post(`${BASE_URL}/users/upload`, data, { headers });
  //   console.log(res, "res from uploadImage was successful");
  //   return res.data;
  // }

  // static async matchList(currentUser) {
  //   let res = await this.request(`users/${currentUser}/matches`, {});
  //   console.log(
  //     "res from matchList is working:",
  //     Boolean(res.users),
  //     "🥳",
  //     "😭"
  //   );
  //   return res.users;
  // }

  static async getMatchInfo(currentUser, user_id) {
    let res = await this.request(
      `users/${currentUser}/matches/user/${user_id}`,
      {},
      "GET"
    );
    return res;
  }

  static async getPotentialMatches(currentUser) {
    let res = await this.request(`users/${currentUser}/matches/users`, {});
    console.log(
      "res from getPotentialMatches:",
      res,
      Boolean(res.users) ? "working properly...🥳" : "fix this...😭"
    );
    return res.users;
  }
  static async getLikedMatches(currentUser) {
    let res = await this.request(
      `users/${currentUser}/matches/likes`,
      {},
      "GET"
    );
    console.log(
      "res from getLikedMatches:",
      res,
      "currentUser:",
      currentUser,
      Boolean(res.users) ? "🥳" : "doh...😭"
    );
    return res.users;
  }

  static async likeMatch(currentUser, user_id) {
    let res = await this.request(
      `users/${currentUser}/matches/like/${user_id}`,
      {},
      "POST"
    );
    console.log("POST was successful and", { currentUser }, "liked", {
      user_id,
    });
    return res.status;
  }

  static async dislikeMatch(currentUser, user_id) {
    let res = await this.request(
      `users/${currentUser}/matches/dislike/${user_id}`,
      {},
      "POST"
      // { currentUser, user_id }
    );
    // console.log("currentUser:", currentUser, "user_id:", user_id);
    console.log("res from dislikeMatch:", res, { currentUser }, "disliked", {
      user_id,
    });
    return res.status;
  }
}

/* ************************************************************* */

// Temporary API token for testing -- CHANGE THIS LATER ONCE EVERYTHING IS WORKING!
UrGuideApi.token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default UrGuideApi;
