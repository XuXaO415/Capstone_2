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

class User {
  /** Authenticate user using username and password.
   * Returns { first_name, last_name, username, email, is_admin }.
   *
   * Throws UnauthorizedError if user not found or wrong password.
   */

  static async authenticate(username, password) {
    const result = await db.query(
      `SELECT username,
            password,
            first_name AS "firstName",
            last_name AS "lastName",
            email,
            is_admin AS "isAdmin"
            FROM users
            WHERE username = $1`,
      [username]
    );

    const user = result.rows[0];

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }
    throw new UnauthorizedError("Invalid username/password");
  }

  /** Given a user_id, return data about user
   * Returns { username, first_name, last_name, email }
   *
   * Throws NotFoundError if user not found.
   */

  // static async getUserById(user_id) {
  //   const userRes = await db.query(
  //     `SELECT username, first_name AS "firstName", last_name AS "lastName", email
  //           FROM users
  //           WHERE user_id = $1`,
  //     [user_id]
  //   );

  //   const user = userRes.rows[0];

  //   if (!user) throw new NotFoundError(`No user: ${user_id}`);

  //   return user;
  // }

  /** Given a username, return data about users
   * Returns { username, first_name, last_name, email, is_admin }
   *
   * Throws NotFoundError if user not found.
   *
   */

  // static async get(username, id) {
  //   const userRes = await db.query(
  //     `SELECT username, id
  //           FROM users
  //           WHERE username = $1 AND id = $2`,
  //     [username, id]
  //   );

  //   const user = userRes.rows[0];

  //   if (!user) throw new NotFoundError(`No user: ${username}`);

  //   return user;
  // }

  static async get(username) {
    const userRes = await db.query(
      `SELECT username, first_name AS "firstName", last_name AS "lastName", email, is_admin AS "isAdmin"
            FROM users
            WHERE username = $1`,
      [username]
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    return user;
  }

  /** Get user by their id  */

  static async getUserById(id) {
    const userRes = await db.query(
      `SELECT id AS "user_id", username, first_name AS "firstName", last_name AS "lastName", email, is_admin AS "isAdmin"
            FROM users
            WHERE id = $1`,
      [id]
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user id: ${id}`);

    return user;
  }

  /** Register user with data.
   *
   * Returns { username, first_name, last_name, city, country, zipCode, latitude, longitude, image_url, hobbies, interests, is_admin }
   *
   * Throws BadRequestError on duplicates.
   */

  static async register({
    username,
    password,
    firstName,
    lastName,
    email,
    city,
    state,
    country,
    zipCode,
    latitude,
    longitude,
    imageUrl,
    hobbies,
    interests,
    isAdmin,
  }) {
    const duplicateCheck = await db.query(
      `SELECT username
            FROM users
            WHERE username = $1`,
      [username]
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users
            (username,
            password,
            first_name,
            last_name,
            email,
            city,
            state,
            country,
            zip_code,
            latitude,
            longitude,
            image_url,
            hobbies,
            interests,
            is_admin
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
            RETURNING username, first_name AS "firstName", last_name AS "lastName", email, city, state, country, zip_code AS "zipCode", latitude, longitude, image_url AS "imageUrl", hobbies, interests, is_admin AS "isAdmin"`,
      [
        username,
        hashedPassword,
        firstName,
        lastName,
        email,
        city,
        state,
        country,
        zipCode,
        latitude,
        longitude,
        imageUrl,
        hobbies,
        interests,
        isAdmin,
      ]
    );
    const user = result.rows[0];

    return user;
  }

  /** Find all users.
   *
   * Returns [{ username, first_name, last_name, email, city, state, country, zip_code, latitude, longitude, image_url, hobbies, interests, is_admin, is_guide, is_tourist }, ...]
   *
   * Throws NotFoundError if no users found.
   *
   * Left state in for now
   * */

  static async findAll() {
    const result = await db.query(
      `SELECT username,
            first_name AS "firstName",
            last_name AS "lastName",
            email,
            city,
            state,
            country,
            zip_code AS "zipCode",
            latitude,
            longitude,
            image_url AS "imageUrl",
            hobbies,
            interests
            FROM users
            ORDER BY username`
    );

    return result.rows;
    // return result.rows[0].id;
  }

  /** Update user data with `data`.
   *
   * This is a temporary method until we build on the front end.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { firstName, lastName, password, email, isAdmin }
   *
   * Returns { username, firstName, lastName, email, isAdmin }
   *
   * Throws NotFoundError if not found.
   *
   * WARNING: this function can set a new password or make a user an admin.
   * Callers of this function must be certain they have validated inputs to this
   * or a serious security risks are opened.
   */

  static async update(username, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    const { setCols, values } = sqlForPartialUpdate(data, {
      username: "username",
      firstName: "first_name",
      lastName: "last_name",
      isAdmin: "is_admin",
    });
    const usernameVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE username = ${usernameVarIdx} 
                      RETURNING username,
                                first_name AS "firstName",
                                last_name AS "lastName",
                                email,
                                is_admin AS "isAdmin"`;
    const result = await db.query(querySql, [...values, username]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    delete user.password;
    return user;
  }

  /** Delete a given user from the database; returns a message stating 'User not found'
   *
   * Throws NotFoundError if user not found.
   *
   **/

  static async remove(username) {
    let result = await db.query(
      `DELETE
            FROM users
            WHERE username = $1
            RETURNING username`,
      [username]
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);
  }

  /** Check if user exists */
  static async checkUserExists(username) {
    const result = await db.query(
      `SELECT username
          FROM users
          WHERE username = $1`,
      [username]
    );
    const user = result.rows[0];
    if (!user) throw new NotFoundError(`No user: ${username}`);
  }

  // static async findByUserId(id) {
  //   const result = await db.query(
  //     `SELECT username, first_name AS "firstName", last_name AS "lastName", email, city, state, country, zip_code AS "zipCode", latitude, longitude, image_url AS "imageUrl", hobbies, interests, is_admin AS "isAdmin"
  //           FROM users
  //           WHERE id = $1`,
  //     [id]
  //   );
  //   const user = result.rows[0];
  //   if (!user) throw new NotFoundError(`No user: ${id}`);
  //   return user;
  // }

  // static async matchUsers(username, id) {
  //   const result = await db.query(
  //     `SELECT id AS "user_id", username, first_name AS "firstName", last_name AS "lastName", email, city, state, country, zip_code AS "zipCode", latitude, longitude, image_url AS "imageUrl", hobbies, interests, is_admin AS "isAdmin"
  //           FROM users
  //           WHERE id != $2 AND id IN (SELECT user_id FROM likes WHERE liked_user = $2) AND id NOT IN (SELECT user_id FROM likes WHERE liked_user = $2 AND user_id = $1)
  //           ORDER BY RANDOM()
  //           LIMIT 3`,
  //     [username, id]
  //   );
  //   let users = result.rows;
  //   if (!users) throw new NotFoundError(`No users found`);
  //   return users;
  // }

  // static async userMatches(user_id) {
  //   const result = await db.query(
  //     `SELECT id AS "user_id", username
  //           FROM likes
  //           WHERE user_id = $1 AND liked_user = $2`,
  //     [username, user_id]
  //   );
  //   let users = result.rows;
  //   if (!users) throw new NotFoundError(`No users found`);
  //   return users;
  // }

  /** This kinda works */
  // static async matchUsers() {
  //   const result = await db.query(
  //     `SELECT id AS "user_id", username, first_name AS "firstName", last_name AS "lastName", email, city, state, country, zip_code AS "zipCode", latitude, longitude, image_url AS "imageUrl", hobbies, interests, is_admin AS "isAdmin"
  //           FROM users
  //           ORDER BY RANDOM()
  //           LIMIT 3`
  //   );
  //   let users = result.rows;
  //   if (!users) throw new NotFoundError(`No users found`);
  //   return users;
  // }

  static async matchUsers() {
    const result = await db.query(
      //This query show user images
      // `SELECT * FROM users ORDER BY RANDOM() LIMIT 5`
      `SELECT id AS "user_id", username, "first_name" AS "firstName", image_url AS "imageUrl", hobbies, interests
      FROM users
      ORDER BY RANDOM() LIMIT 5`
    );
    let users = result.rows;
    if (!users) throw new NotFoundError(`No users found`);
    return users;
  }

  /** When user clicks on a match, show more info about user */
  static async getInfo(id) {
    const result = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);
    let user = result.rows[0];
    if (!user) throw new NotFoundError(`No user found`);
    return user;
  }

  /** Get a user by id */

  // static async getUserById(id) {
  //   const result = await db.query(`SELECT id FROM users WHERE id = $1`, [id]);
  //   const user = result.rows[0];
  //   if (!user) throw new NotFoundError(`No user: ${id}`);
  //   return user;
  // }

  // static async getUserById(user_id) {
  //   const result = await db.query(
  //     `SELECT id AS "user_id", username
  //           FROM users
  //           WHERE id = $1`,
  //     [user_id]
  //   );
  //   const user = result.rows[0];
  //   if (!user) throw new NotFoundError(`No user: ${user_id}`);
  //   return user;
  // }

  /** GET a list of potential matches */

  // static async getUsers(id) {
  //   const result = await db.query(
  //     `SELECT id AS "user_id", username, first_name AS "firstName", last_name AS "lastName", email, city, state, country, zip_code AS "zipCode", latitude, longitude, image_url AS "imageUrl", hobbies, interests, is_admin AS "isAdmin"
  //           FROM users
  //           WHERE id != $1
  //           ORDER BY RANDOM()
  //           LIMIT 3`,
  //     [id]
  //   );
  //   let users = result.rows;
  //   if (!users) throw new NotFoundError(`No users found`);
  //   return users;
  // }

  /** Get a user by their ID */

  static async getUserById(user_id) {
    const result = await db.query(
      `SELECT id AS "user_id", username
            FROM users
            WHERE id = $1`,
      [user_id]
    );
    let user = result.rows[0];
    if (!user) throw new NotFoundError(`No user found`);
    return user;
  }

  static async findByUserId(user_id) {
    const result = await db.query(
      `SELECT id AS "user_id", username, first_name AS "firstName", last_name AS "lastName", email, city, state, country, zip_code AS "zipCode", latitude, longitude, image_url AS "imageUrl", hobbies, interests, is_admin AS "isAdmin"
            FROM users
            WHERE id = $1`,
      [user_id]
    );
    let user = result.rows[0];
    if (!user) throw new NotFoundError(`No user found`);
    return user;
  }

  static async getLikes(currentUsername, user_id) {
    const currentUser = await this.get(currentUsername);
    const likedUser = await this.findByUserId(user_id);
    const getUserLikes = await this.getLikedMatches(currentUsername);
    const getLikedUserLikes = await this.getLikedMatches(user_id);

    return {
      currentUser,
      likedUser,
      getUserLikes,
      getLikedUserLikes,
    };
  }

  /** Return user's likes */

  // static async getUserLikes() {
  //   const result = await db.query(
  //     `SELECT user_id, liked_user
  //           FROM likes
  //           ORDER BY user_id`
  //   );
  //   let users = result.rows;
  //   if (!users) throw new NotFoundError(`No users found`);
  //   return users;
  // }

  // static async getUserLikes(id) {
  //   const result = await db.query(
  //     `SELECT * FROM likes
  //         WHERE liked_user IS NOT NULL
  //         // AND user_id = $1 AND liked_user = $2
  //         ORDER BY user_id`,
  //     [id]
  //   );
  //   let users = result.rows;
  //   if (!users) throw new NotFoundError(`No users found`);
  //   return users;
  // }

  //** Retrieve from urguide database user likes */

  /** User likes a match */
  // static async likeMatch(id, username) {
  //   const result = await db.query(
  //     `INSERT INTO likes (user_id, liked_user)
  //           VALUES ($1, $2)
  //           RETURNING user_id, liked_user`,
  //     [id, username]
  //   );
  //   const user = result.rows[0];
  //   if (!user) throw new NotFoundError(`No user: ${id}`);
  //   return user;
  // }

  /** This call works better than the above code */

  static async likeMatch(id) {
    const result = await db.query(
      `INSERT INTO likes (user_id)
            VALUES ($1)
            RETURNING user_id`,
      [id]
    );
    const user = result.rows[0];
    if (!user) throw new NotFoundError(`No user: ${id}`);
    return user;
  }

  /** POST dislike user and their user_id */

  static async dislikeMatch(id) {
    const result = await db.query(
      `DELETE FROM likes
            WHERE user_id = $1
            RETURNING user_id`,
      [id]
    );
    const user = result.rows[0];
    if (!user) throw new NotFoundError(`No user: ${id}`);
    return user;
  }

  /** remove and delete disliked user match */

  static async removeMatch(id) {
    const result = await db.query(
      `DELETE FROM likes
            WHERE user_id = $1
            RETURNING user_id`,
      [id]
    );
    const user = result.rows[0];
    if (!user) throw new NotFoundError(`No user: ${id}`);
    return user;
  }

  /** Delete Match */

  static async deleteMatch(id) {
    const result = await db.query(
      `DELETE FROM likes
            WHERE user_id = $1
            RETURNING user_id`,
      [id]
    );
    const user = result.rows[0];
    if (!user) throw new NotFoundError(`No user: ${id}`);

    return user;
  }

  /** User dislikes a match */
  // static async dislikeMatch(id) {
  //   const result = await db.query(
  //     `INSERT INTO dislikes (user_id)
  //           VALUES ($1)
  //           RETURNING user_id`,
  //     [id]
  //   );
  //   const user = result.rows[0];
  //   if (!user) throw new NotFoundError(`No user: ${id}`);
  //   return user;
  // }

  static async getLikedMatches(username, id) {
    const result = await db.query(
      `SELECT user_id
            FROM likes
            WHERE user_id = $1`,
      [username, id]
    );
    let users = result.rows;
    if (!users) throw new NotFoundError(`No users found`);
    return users;
  }

  /** Return user's liked matches */
  // static async getLikedMatches(id) {
  //   const result = await db.query(
  //     `SELECT user_id
  //           FROM likes
  //           WHERE id = $1`,
  //     [id]
  //   );
  //   let users = result.rows;
  //   if (!users) throw new NotFoundError(`No users found`);
  //   return users;
  // }

  // static async deleteMatch(username, id) {
  //   const result = await db.query(
  //     `DELETE FROM likes
  //           WHERE user_id = $1 AND id = $2
  //           RETURNING user_id, id`,

  //     [username, id]
  //   );
  //   const user = result.rows[0];
  //   if (!user) throw new NotFoundError(`No user: ${id}`);
  //   return user;
  // }
}

module.exports = User;
