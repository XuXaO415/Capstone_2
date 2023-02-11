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

  static async getCurrentUserById(id) {
    let res = await this.request(`users/${id}`, {}, "GET");
    return res.user;
  }

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

  /** Setup for potential matches */

  // static async getPotentialUserMatches(user_id) {
  //   let res = await this.request(`matches/${user_id}`, "GET");
  //   return res.matches;
  // }

  // static async getPotentialMatches(username, data) {
  //   let res = await this.request(`users/${username}/match/:id`, data, "GET");
  //   return res.users;
  // }

  /** Get details on potential matches by username/ user_id */

  static async matchList(username) {
    let res = await this.request(`users/${username}/matches`);
    return res.users;
  }

  /** Get details on potential matches by username/ user_id */

  static async getPotentialMatches(username, user_id) {
    let res = await this.request(`users/${username}/matches/${user_id}`);
    console.log(
      "res users",
      res.users,
      "username",
      username,
      "res.currentUser= ",
      res.currentUser,
      "res.currentUser.username= ",
      res.currentUser.username
    );
    return res.users;
  }

  /** like user match -- POST matched user data */

  static async likeMatch(currentUser, username) {
    let res = await this.request(
      `users/${currentUser}/matches/like/${username}`,
      "POST"
    );
    return res.status;
  }

  // static async likeMatch(username, user_id) {
  //   let res = await this.request(
  //     `users/${username}/matches/like/${user_id}`,
  //     "POST"
  //   );
  //   return res.status;
  // }

  /** Setup for return all user's liked matches */

  static async getLikedMatches(username) {
    let res = await this.request(`users/${username}/matches/liked`, "GET");
    return res.users;
  }

  /* Setup for liking a potential match */

  // static async likeMatch(username, data) {
  //   let res = await this.request(
  //     `users/${username}/matches/like`,
  //     data,
  //     "POST"
  //   );
  //   return res.status;
  // }

  /** Setup disliking a matched user */

  static async dislikeMatch(username, id, data) {
    let res = await this.request(
      `users/${username}/matches/dislike/${id}`,
      data,
      "POST"
    );
    return res.status;
  }

  /** Setup for liking a potential match */

  // static async getPotentialMatches(user_id) {
  //   let res = await this.request(`users/like/match/${user_id}`, {}, "POST");
  //   return res.status;
  // }

  /** Setup for getting a list of potential user matches */

  // static async getPotentialMatches(username, user_id) {
  //   let res = await this.request(
  //     `users/${username}/match/${user_id}`,
  //     {},
  //     "GET"
  //   );
  //   return res.user;
  // }

  // static async PotentialMatches(username, user_id) {
  //   let res = await this.request(
  //     `users/${username}/like/${user_id}`,
  //     {},
  //     "POST"
  //   );
  //   return res.status;
  // }

  /** Like a potential user => match */

  // static async likeMatch(username, data) {
  //   let res = await this.request(`users/like/${username}/:id`, data, "POST");
  //   return res.status;
  // }

  /** Dislike potential user => un-match   */

  // static async dislikeMatch(username, data) {
  //   let res = await this.request(
  //     `users/unlike/${username}/:user_id`,
  //     data,
  //     "POST"
  //   );
  //   return res.status;
  // }
}

/* ************************************************************* */

// Temporary API token for testing -- CHANGE THIS LATER ONCE EVERYTHING IS WORKING!
UrGuideApi.token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default UrGuideApi;
