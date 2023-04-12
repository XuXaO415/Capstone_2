//Get user_ids from sql likes table matching user_id this is routed from router.get("/:username/matches/like/:user_id").
//This is the route that will be used to get user_id from sql likes table and then we can use that user_id to match users to username

/** Match users randomly by their user id */
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

// static async getUserLikes(id) {
//   const result = await db.query(
//     `SELECT user_id, liked_user
//           FROM likes
//           WHERE user_id = $1`,
//     [id]
//   );
//   let users = result.rows;
//   if (!users) throw new NotFoundError(`No users found`);
//   return users;
// }

//define user id like like user_id and pass that in so we can make a sql query and pull out user_id from sql likes table.

// Define user by their user_id so we can pull it from SQL and database. Once you get user_id, you can use it to match users to username, we then want to insert user_id and liked_user_id into database.

// static async addUserLikes(user_id, liked_user) {
//   const result = await db.query(
//     `INSERT INTO likes (user_id, liked_user)
//           VALUES ($1, $2)
//           RETURNING user_id, liked_user`,
//     [user_id, liked_user]
//   );
//   const user = result.rows[0];
//   if (!user) throw new NotFoundError(`No user: ${user_id}`);
//   return user;
// }

/* Match users randomly */
// static async matchUsers(id) {
//   const result = await db.query(
//     `SELECT username, first_name AS "firstName", last_name AS "lastName", email, city, state, country, zip_code AS "zipCode", latitude, longitude, image_url AS "imageUrl", hobbies, interests, is_admin AS "isAdmin"
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

// static async matchUsers(user_id) {
//   const sqlData = sqlForPartialUpdate({ user_id: user_id }, {});
//   const result = await db.query(
//     `SELECT username, first_name AS "firstName", last_name AS "lastName", email, city, state, country, zip_code AS "zipCode", latitude, longitude, image_url AS "imageUrl", hobbies, interests, is_admin AS "isAdmin"
//           FROM users
//           WHERE user_id = $${sqlData.values.length + 1}
//           ORDER BY RANDOM()
//           LIMIT 3`,
//     [...sqlData.values, user_id]
//   );
//   let users = result.rows;
//   if (!users) throw new NotFoundError(`No users found`);
//   return users;
// }
