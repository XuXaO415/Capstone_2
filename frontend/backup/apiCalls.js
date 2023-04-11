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