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

  static async getCurrentUserById(user_id) {
    let res = await this.request(`users/${user_id}`);
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

  // static async getPotentialMatches(username, data) {
  //   let res = await this.request(`users/${username}/match/:id`, data, "GET");
  //   return res.matches;
  // }

  /** Setup for liking a potential match */

  // static async getPotentialMatches(user_id) {
  //   let res = await this.request(`users/like/match/${user_id}`, {}, "POST");
  //   return res.status;
  // }

  /** Setup for getting a list of potential user matches */

  static async getPotentialMatches(username, user_id) {
    let res = await this.request(
      `users/${username}/match/${user_id}`,
      {},
      "GET"
    );
    return res.matches;
  }

  static async PotentialMatches(username, user_id) {
    let res = await this.request(
      `users/${username}/like/${user_id}`,
      {},
      "POST"
    );
    return res.status;
  }

  /** Like a potential user => match */

  // static async likeMatch(username, data) {
  //   let res = await this.request(`users/like/${username}/:id`, data, "POST");
  //   return res.status;
  // }

  /** Dislike potential user =>un-match  */

  // static async dislikeMatch(username, data) {
  //   let res = await this.request(
  //     `users/dislike/${username}/:user_id`,
  //     data,
  //     "POST"
  //   );
  //   return res.status;
  // }

  /** Guide API routes */

  // static async getGuides(data) {
  //   let res = await this.request(`guides`, data, "GET");
  //   return res.guides;
  // }

  /** GET guide by id */

  // static async getGuide(id, data) {
  //   let res = await this.request(`guides/${id}`, data, "GET");
  //   return res.guide;
  // }

  // static async createGuide(data) {
  //   let res = await this.request(`guides`, data, "POST");
  //   return res.guide;
  // }

  /** GET potential matches for guides */

  // static async getPotentialMatches(id, data = {}) {
  //   let res = await this.request(`users/${id}/matches`, data, "GET");
  //   return res.status;
  // }

  /** GET potential matches for users */

  // static async getPotentialMatches(username, data = {}) {
  //     let res = await this.request(`users/${username}/matches`, data, "GET");
  //     return res.matches;
  // }

  /** GET user's guides */

  // static async getUserGuides(username, data = {}) {
  //   let res = await this.request(`users/${username}/guides`, data, "GET");
  //   return res.guides;
  // }

  /** GET matches for users/guides */

  // static async getMatches(id) {
  //   let res = await this.request(`users/${id}/matches`, {}, "GET");
  //   return res.matches;
  // }

  // /** Like a potential user match */

  // static async likeMatch(id) {
  //   let res = await this.request(`users/${id}/matches`, {}, "POST");
  //   return res.status;
  // }

  // static async dislikeMatch(id) {
  //   let res = await this.request(`users/${id}/matches`, {}, "DELETE");
  //   return res.status;
  // }

  // /** Like a potential guide match */

  // static async likeMatch(id, data) {
  //     let res = await this.request(`guides/${id}/matches`, data, "POST");
  //     return res.match;
  // }

  // /** Dislike potential user match  */

  // static async dislikeMatch(id) {
  //     let res = await this.request(`matches/${id}`, {}, "DELETE");
  //     return res.message;
  // }

  /** GET user's favorite */

  // static async getFavorites(username) {
  //     let res = await this.request(`users/${username}/favorites`, data, "GET");
  //     return res.favorites;
  // }

  // static async deleteFavorite(username, id) {
  //     let res = await this.request(`users/${username}/favorites/${id}`, data, "DELETE");
  //     return res.message;
  // }

  // static async getLikes(id) {
  //     let res = await this.request(`guides/${id}/likes`, data, "GET");
  //     return res.likes;
  // }

  // static async createLike(id, data) {
  //     let res = await this.request(`guides/${id}/likes`, data, "POST");
  //     return res.like;
  // }

  // static async deleteLike(id) {
  //     let res = await this.request(`likes/${id}`, data, "DELETE");
  //     return res.message;
  // }

  /**  */

  // need to add route for uploading images
}

/* ************************************************************* */

// Temporary API token for testing -- CHANGE THIS LATER ONCE EVERYTHING IS WORKING!
UrGuideApi.token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default UrGuideApi;
