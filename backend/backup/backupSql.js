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

// static async addLike(username, user_id) {
//   const result = await db.query(
//     `INSERT INTO likes
//           (username, user_id)
//           VALUES ($1, $2)
//           RETURNING username, user_id`,
//     [username, user_id]
//   );
//   const user = result.rows[0];

//   if (!user) throw new NotFoundError(`No user: ${username}`);
// }

/** Omg, this is the actually correct way this is supposed to look in db */
// static async dislikeMatch(id, user_id) {
//   const result = await db.query(
//     `INSERT INTO dislikes (user_id, disliked_user)
//           VALUES ($1, $2)
//           RETURNING user_id`,
//     [id, user_id]
//   );
//   const user = result.rows[0];
//   if (!user) throw new NotFoundError(`No user: ${id}`);
//   return user;
// }

// static async updateDislikedMatch(id, user_id) {
//   const result = await db.query(
//     `UPDATE dislikes
//           SET disliked_user = $1
//           WHERE user_id = $2
//           RETURNING user_id`,
//     [id, user_id]
//   );
//   const user = result.rows[0];

//   if (!user) throw new NotFoundError(`No user: ${username}`);
//   return user;
// }

// static async updateDislikedMatch(id, user_id) {
//   const result = await db.query(
//     `UPDATE dislikes
//           SET disliked_user = $1
//           WHERE user_id = $2
//           RETURNING user_id`,
//     [id, user_id]
//   );
//   const user = result.rows[0];

//   if (!user) throw new NotFoundError(`No user: ${username}`);
//   return user;
// }
// static async updateDislikedMatch(id, user_id, disliked_user) {
//   let result = await db.query(
//     `UPDATE dislikes
//           SET user_id = $1, disliked_user = $2
//           WHERE id = $3
//           RETURNING id, user_id, disliked_user`,
//     [id, _user_id, _disliked_user]
//   );
//   const user = result.rows[0];

//   if (!user) throw new NotFoundError(`No user: ${username}`);
//   return user;
// }

// static async removeDislike(id, user_id) {
//   let result = await db.query(
//     `DELETE FROM dislikes
//           WHERE id = $1 AND user_id = $2
//           RETURNING id`,
//     [id, user_id]
//   );
//   const user = result.rows[0];

//   if (!user) throw new NotFoundError(`No user: ${username}`);
// }

// static async removeDislikedMatch(id, user_id) {
//   const result = await db.query(
//     `DELETE FROM dislikes
//           WHERE user_id = $1, disliked_user = $2
//           RETURNING user_id`,
//     [id, user_id]
//   );
//   const user = result.rows[0];
//   if (!user) throw new NotFoundError(`No user: ${id}`);
//   return user;
// }

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

// static async likeMatch(id, user_id) {
//   const result = await db.query(
//     `INSERT INTO likes (user_id, liked_user )
//           VALUES ($1, $2)
//           RETURNING user_id`,
//     [id, user_id]
//   );
//   const user = result.rows[0];
//   if (!user) throw new NotFoundError(`No user: ${id}`);
//   return user;
// }

// static async getUserInfo(id) {
//   const result = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);
//   let user = result.rows[0];
//   if (!user) throw new NotFoundError(`No user found`);
//   return user;
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



  /** Get a list of the user's liked matches */
  static async getLikes(user_id) {
    const result = await db.query(
      `SELECT likes.user_id, likes.liked_user, users.username, users.first_name, users.last_name, users.image_url
            FROM likes
            JOIN users ON likes.liked_user = users.id
            WHERE likes.user_id = $1`,
      [user_id]
    );
    let users = result.rows;
    if (!users) throw new NotFoundError(`No users found`);
    return users;
  }




  // static async matchUser(user_id) {
  //   const result = await db.query(
  //     `SELECT id AS "user_id", username, first_name, image_url, hobbies, interests
  //           FROM users
  //           WHERE id = $1`,
  //     [user_id]
  //   );
  //   let user = result.rows[0];
  //   if (!user) throw new NotFoundError(`No user found`);
  //   return user;
  // }
