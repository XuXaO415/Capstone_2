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
            [username],
        );

        const user = result.rows[0];

        if (user) {
            const isValid = await bcrypt.compare(password, user.password);
            if(isValid === true) {
                delete user.password;
                return user;
            }
        }
        throw new UnauthorizedError("Invalid username/password");
    }

    /** Register user with data. 
     * 
     * Returns { username, first_name, last_name, email, phone, city, country, zip_code, latitude, longitude, image_url, hobbies, interests, is_admin, is_guide, is_tourist } 
     * 
     * Throws BadRequestError on duplicates.
     */

    static async register(
        { username, password, firstName, lastName, email, phone, city, country, zipCode, latitude, longitude, imageUrl, hobbies, interests, isAdmin, isGuide, isTourist }) {
        const duplicateCheck = await db.query(
            `SELECT username
            FROM users
            WHERE username = $1`,
            [username],
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
            phone,
            city,
            country,
            zip_code,
            latitude,
            longitude,
            image_url,
            hobbies,
            interests,
            is_admin,
            is_guide,
            is_tourist)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
            RETURNING username, first_name AS "firstName", last_name AS "lastName", email, phone, city, country, zip_code AS "zipCode", latitude, longitude, image_url AS "imageUrl", hobbies, interests, is_admin AS "isAdmin", is_guide AS "isGuide", is_tourist AS "isTourist"`,
            [
                username,
                hashedPassword,
                firstName,
                lastName,
                email,
                phone,
                city,
                country,
                zipCode,
                latitude,
                longitude,
                imageUrl,
                hobbies,
                interests,
                isAdmin,
                isGuide,
                isTourist
            ],
        );
        const user = result.rows[0];

        return user;
    }

    /** Find all users.
     * 
     * Returns [{ username, first_name, last_name, email, phone, city, country, zip_code, latitude, longitude, image_url, hobbies, interests, is_admin, is_guide, is_tourist }, ...]
     * 
     * Throws NotFoundError if no users found.
     * */

    static async findAll() {
        const result = await db.query(
            `SELECT username,
            first_name AS "firstName",
            last_name AS "lastName",
            email,
            phone,
            city,
            country,
            zip_code AS "zipCode",
            latitude,
            longitude,
            image_url AS "imageUrl",
            hobbies,
            interests,
            is_admin AS "isAdmin",
            is_guide AS "isGuide",
            is_tourist AS "isTourist"
            FROM users
            ORDER BY username`,
        );

        return result.rows;
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

    const { setCols, values } = sqlForPartialUpdate(
        data,
        {
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
   * 
   *
   **/
  
    static async remove(username) {
        let result = await db.query(
            `DELETE
            FROM users
            WHERE username = $1
            RETURNING username`,
            [username],
        ); 
        const user = result.rows[0];

        if(!user) throw new NotFoundError(`No user: ${username}`);
    }
}



module.exports = User;