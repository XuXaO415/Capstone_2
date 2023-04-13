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
        console.log("password comparison is true");
        delete user.password;
        return user;
      }
    }
    throw new UnauthorizedError("Invalid username/password");
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
    // const duplicateCheck = await db.query(
    //   `SELECT username, last_name
    //         FROM users
    //         WHERE username = $1 OR last_name = $2`,
    //   [username, lastName]
    // );
    // only check for duplicate username
    const duplicateCheck = await db.query(
      `SELECT username
            FROM users
            WHERE username = $1`,
      [username],
    );

    //     const duplicateCheck = await db.query(
    //   `SELECT lastName
    //         FROM users
    //         WHERE lastName = $1`,
    //   [lastName],
    // );


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

  static async get(username) {
    const userRes = await db.query(
      `SELECT id AS "user_id", username, first_name AS "firstName", last_name AS "lastName", email, is_admin AS "isAdmin"
            FROM users
            WHERE username = $1`,
      [username]
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    return user;
  }

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
  }

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

  static async matchUsers() {
    const result = await db.query(
      `SELECT id AS "user_id", username, first_name, city, state, country, zip_code, image_url, hobbies, interests
      FROM users
      WHERE image_url IS NOT NULL 
      ORDER BY RANDOM() LIMIT 5`
    );
    let users = result.rows;
    if (!users) throw new NotFoundError(`No users found`);
    if (users.length < 5)
      throw new BadRequestError(`Not enough users to match`);

    if (!users[0].zip_code) {
      users[0].zip_code = users[0].state;
      users[0].message = "No zip code for this country";
    }

    // if (users[0].country !== users[1].country) {
    //   users[1].zip_code = 0;
    //   users[1].message = "No zip code for this country";
    // }

    return users;
  }

  static async getUserInfo(user_id) {
    try {
      const result = await db.query(
        `SELECT id AS "user_id", username, first_name, city, state, country, zip_code, image_url, hobbies, interests
      FROM users
      WHERE id = $1
      ORDER BY id LIMIT 1`,
        [user_id]
      );
      console.log(result.rows);
      let user = result.rows[0];
      if (!user) throw new NotFoundError(`No user`);
      return user;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  static async getLikes() {
    const result = await db.query(
      `SELECT  u.username, u.first_name, u.city, u.state, u.country, u.zip_code, u.hobbies, u.interests, u.image_url, l.liked_user, l.user_id
      FROM users u
      LEFT JOIN likes l ON u.id = l.user_id
      WHERE l.user_id IS NOT NULL
      ORDER BY l.id DESC LIMIT 5`
    );
    console.log(result.rows);
    let users = result.rows;
    if (!users) throw new NotFoundError(`No users found`);
    return users;
  }

  // static async unlikeMatch(id, user_id) {
  //   const result = await db.query(
  //     `DELETE FROM likes
  //           WHERE user_id = $1 AND liked_user = $2
  //           RETURNING user_id`,
  //     [id, user_id]
  //   );
  //   console.log(result.rows);
  //   let user = result.rows[0];
  //   if (!user) throw new NotFoundError(`No user: ${id}`);
  //   return user;
  // }

  // static async unlikeMatch(id, user_id) {
  //   const result = await db.query(
  //     `DELETE FROM likes
  //           WHERE user_id = $1 AND liked_user = $2
  //           RETURNING user_id`,
  //     [id, user_id]
  //   );
  //   console.log(result.rows);
  //   let user = result.rows[0];
  //   if (!user) throw new NotFoundError(`No user: ${id}`);
  //   return user;
  // }

  static async likeMatch(id, user_id) {
    const result = await db.query(
      `INSERT INTO likes (user_id, liked_user, liked_username) 
            VALUES ($1, $2, (SELECT username FROM users WHERE id = $2))
            RETURNING user_id`,
      [id, user_id]
    );
    let user = result.rows[0];
    if (!user) throw new NotFoundError(`No user: ${id}`);
    return user;
  }

  // static async unlikeMatch(id, user_id) {
  //   const result = await db.query(
  //     `DELETE FROM likes (user_id, liked_user, liked_username)
  //           VALUES ($1, $2, (SELECT username FROM users WHERE id = $2))
  //           RETURNING user_id`,
  //     [id, user_id]
  //   );
  //   console.log(result.rows);
  //   let user = result.rows[0];
  //   if (!user) throw new NotFoundError(`No user: ${id}`);
  //   return user;
  // }

  // static async unlikeMatch(id, user_id) {
  //   const result = await db.query(
  //     `DELETE FROM likes l.liked_user, l.user_id
  //           WHERE user_id = $1 AND liked_user = $2
  //           RETURNING user_id`,
  //     [id, user_id]
  //   );
  //   console.log(result.rows);
  //   let user = result.rows[0];
  //   if (!user) throw new NotFoundError(`No user: ${id}`);
  //   return user;
  // }

  // static async unlikeMatch(id, user_id) {
  //   const result = await db.query(
  //     `DELETE FROM likes (user_id, liked_user, liked_username)
  //           VALUES ($1, $2, (SELECT username FROM users WHERE id = $2))
  //           RETURNING user_id`,
  //     [id, user_id]
  //   );
  //   console.log(result.rows);
  //   let user = result.rows[0];
  //   if (!user) throw new NotFoundError(`No user: ${id}`);
  //   return user;
  // }

  static async unlikeMatch(liked_user, user_id) {
    const result = await db.query(
      `DELETE FROM likes
            WHERE user_id = $1 AND liked_user = $2
            RETURNING user_id`,
      [liked_user, user_id]
    );
    console.log(result.rows);
    let user = result.rows[0];
    if (!user) throw new NotFoundError(`No user: ${id}`);
    return user;
  }

  // static async unlikeMatch(user_id, liked_user) {
  //   const result = await db.query(
  //     `SELECT FROM likes
  //           WHERE user_id = $1
  //           AND liked_user = $2
  //           RETURNING user_id`,
  //     [user_id, liked_user]
  //   );
  //   console.log(result.rows);
  //   let user = result.rows[0];
  //   if (!user) throw new NotFoundError(`No user: ${id}`);
  //   return user;
  // }

  // static async unlikeMatch(user_id, liked_user) {
  //   const result = await db.query(
  //     `DELETE  user_id FROM likes
  //         WHERE user_id = $1
  //         AND liked_user = $2
  //         RETURNING user_id`,
  //     [user_id, liked_user]
  //   );
  //   console.log(result.rows);
  //   let user = result.rows[0];
  //   if (!user) throw new NotFoundError(`No user: ${id}`);
  //   return user;
  // }

  // static async dislikeMatch(id, user_id) {
  //   const result = await db.query(
  //     `INSERT INTO dislikes (user_id, disliked_user, disliked_username)
  //           VALUES ($1, $2, (SELECT username FROM users WHERE id = $2))
  //           RETURNING user_id`,
  //     [id, user_id]
  //   );
  //   let user = result.rows[0];
  //   if (!user) throw new NotFoundError(`No user: ${id}`);
  //   return user;
  // }

  static async updateDislikedMatch(id, user_id) {
    const result = await db.query(
      `INSERT INTO dislikes
            SET user_id = $1
            WHERE disliked_user = $2
            RETURNING user_id`,
      [id, user_id]
    );
    let user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);
    return user;
  }

  static async removeDislikedUser(user_id, disliked_user) {
    let result = await db.query(
      `DELETE
            FROM dislikes
            WHERE user_id = $1 AND disliked_user = $2
            RETURNING user_id`,
      [user_id, disliked_user]
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    return user;
  }
}

module.exports = User;
