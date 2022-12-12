"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config");

/** Create matches from data, update db, return data for new matches.
 *  (will add/remove to this later, but for now it just returns the potential matches for a user to validate frontend is working)
 *
 * Returns {
 * username, city, country, zip_code, latitude, longitude, image_url, hobbies, interests, is_match, is_liked, is_disliked, is_guide, is_tourist}
 *
 *  Throws BadRequestError on duplicates or if there are no potential matches.
 *
 */

class createMatches {
  static async createMatches(username) {
    const result = await db.query(
      `SELECT username, city, country, zip_code, latitude, longitude, image_url, hobbies, interests, is_match, is_liked, is_disliked, is_guide, is_tourist
      FROM users
      WHERE username = $1`,
      [username]
    );

    const potentialMatches = result.rows[0];

    if (potentialMatches) {
      return potentialMatches;
    }
    throw new BadRequestError("Sorry, no matches available");
  }
}

module.exports = createMatches;
