// static async getUserInfo(user_id) {
//   const result = await db.query(
//     `SELECT id AS "user_id", username, first_name, city, state, country, zip_code, image_url, hobbies, interests
//     FROM users
//     WHERE image_url IS NOT NULL
//     AND id = $1
//     ORDER BY id LIMIT 1`,
//     [user_id]
//   );
//   let user = result.rows[0];
//   if (!user) throw new NotFoundError(`No user`);
//   return user;
// }

// static async getLikedUsers() {
//   const result = await db.query(
//     `SELECT id AS "user_id", username, first_name, last_name, hobbies, interests
//     FROM users
//     JOIN likes ON users.id = likes.liked_user_id
//     WHERE likes.user_id = $1`
//   );
//   let users = result.rows;
//   if (!users) throw new NotFoundError(`No users`);
//   return users;
// }

// static async getUserInfo(user_id) {
//   const result = await db.query(
//     `SELECT id AS "user_id", username, first_name, city, state, country, zip_code, image_url, hobbies, interests
//           FROM users
//           WHERE id = $1`,
//     [user_id]
//   );
//   let user = result.rows[0];
//   if (!user) throw new NotFoundError(`No user found`);
//   return user;
// }

// static async getUserById(user_id) {
//   const result = await db.query(
//     `SELECT id AS "user_id", username
//           FROM users
//           WHERE id = $1`,
//     [user_id]
//   );
//   let user = result.rows[0];
//   if (!user) throw new NotFoundError(`No user found`);
//   return user;
// }

// `SELECT u.username, u.city, u.state, u.hobbies, u.interests, l.liked_user
//   FROM users u
//   JOIN likes l ON u.id = l.user_id`

// static async getLikes(user_id) {
//   const result = await db.query(
//     `SELECT * FROM likes
//         JOIN users ON likes.liked_user = users.id
//         WHERE likes.user_id = $1`,
//     [user_id]
//   );
//   let users = result.rows;
//   if (!users) throw new NotFoundError(`No users found`);
//   return users;
// }

// static async getLikes() {
//   const result = await db.query(
//     `SELECT MIN(likes.id) AS id, likes.user_id, likes.liked_user, likes.liked_username, users.username, users.first_name, users.image_url, users.hobbies, users.interests
//           FROM likes
//           JOIN users ON likes.liked_user = users.id
//           GROUP BY likes.user_id, likes.liked_user, likes.liked_username,  users.username, users.first_name, users.image_url, users.hobbies, users.interests
//           ORDER BY array_agg(likes.id) DESC LIMIT 5`
//   );

//   let users = result.rows;

//   if (!users) throw new NotFoundError(`No users found`);
//   return users;
// }

// static async getLikes() {
//   // const result = await db.query(`SELECT * FROM likes`);

//   const result = await db.query(
//     `SELECT MIN(likes.id) AS id, likes.user_id, likes.liked_user
//           FROM likes
//           JOIN users ON likes.liked_user = users.id
//           GROUP BY likes.user_id, likes.liked_user
//           ORDER BY array_agg(likes.id) DESC LIMIT 5`
//   );
//   let users = result.rows;
//   if (!users) throw new NotFoundError(`No users found`);
//   return users;
// }

// static async likeUser(user_id, liked_user_id) {
//   const result = await db.query(
//     `INSERT INTO likes (user_id, liked_user_id)
//     VALUES ($1, $2)
//     RETURNING user_id, liked_user_id`,
//     [user_id, liked_user_id]
//   );
//   const like = result.rows[0];
//   if (!like) throw new NotFoundError(`No like found`);
//   return like;
// }

// static async dislikeMatch(id, user_id) {
//   const result = await db.query(
//     `INSERT INTO dislikes (user_id, disliked_user)
//           VALUES ($1, $2, (SELECT username FROM users WHERE id = $2))
//           ON CONFLICT (user_id, disliked_user)
//           DO UPDATE SET disliked_user = $2
//           RETURNING user_id`,
//     [id, user_id]
//   );
//   let user = result.rows[0];
//   if (!user) throw new NotFoundError(`No user: ${id}`);
//   return user;
// }



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
