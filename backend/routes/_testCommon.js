"use strict";

const db = require("../db.js");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");

const userIds = [];
let getUserToken, adminToken;

const commonBeforeAll = async () => {
  await db.query("DELETE FROM users");

  // await db.query("DELETE FROM likes");
  // await db.query("DELETE FROM test_users");
  // await db.query("DELETE FROM test_likes");

  // await db.query(`
  //   INSERT INTO users (username, password, first_name, last_name, email, is_admin)
  //   VALUES ('testuser1', 'password', 'John', 'Doe', 'new@email.com', true),
  //   ('testuser2', 'password', 'Jane', 'Doe', 'tester@mail.com', false);
  // `);

  // await db.query(`
  //   INSERT INTO likes (user_id, liked_user, liked_username)
  //   VALUES (1, 2, 'testuser2'),
  //   (2, 1, 'testuser1');
  // `);

  // await db.query(`
  //   INSERT INTO test_users (username, password, first_name, last_name, email, is_admin)
  //   VALUES ('testuser1', 'password', 'John', 'Doe', 'johndoe@example.com', true),
  //          ('testuser2', 'password', 'Jane', 'Doe', 'janedoe@example.com', false),
  //          ('testuser3', 'password', 'Bob', 'Smith', 'bobsmith@example.com', false);
  // `);

  // await db.query(`
  //   INSERT INTO test_likes (user_id, liked_user, liked_username)
  //   VALUES (1, 2, 'testuser2'),
  //          (2, 1, 'testuser1');
  // `);

  const createUser = await User.register({
    username: "testuser",
    first_name: "Test",
    last_name: "User",
    email: "test@email.com",
    password: "password",
    is_admin: false,
  });

  userIds.push(createUser.id);

  const result = await db.query(
    `SELECT id, username, first_name, last_name, email, is_admin
    FROM users
    WHERE username = 'testuser'`
  );

  const user = result.rows[0];

  getUserToken = createToken(user);
};

const commonBeforeEach = async () => {
  await db.query("BEGIN");
};

const commonAfterEach = async () => {
  await db.query("ROLLBACK");
};

const commonAfterAll = async () => {
  await db.end();
};

//   await User.register({
//     username: "testuser",
//     first_name: "Test",
//     last_name: "User",
//     email: "test@email.com",
//     password: "password",
//     is_admin: false,
//   });

//   await User.register({
//     username: "johndoe",
//     first_name: "John",
//     last_name: "Doe",
//     email: "johnD@email.com",
//     password: "password",
//     is_admin: false,
//   });

//   await User.register({
//     username: "janeDoe",
//     first_name: "Jane",
//     last_name: "Doe",
//     email: "janeD@test.com",
//     password: "password",
//     is_admin: false,
//   });

//   await User.register({
//     username: "admin",
//     first_name: "Admin",
//     last_name: "User",
//     email: "adminUser@admin.com",
//     password: "password1",
//     is_admin: true,
//   });

//   getUserToken = createToken({ username: "testuser", is_admin: false });
//   adminToken = createToken({ username: "admin", is_admin: true });
// };

// async function commonBeforeEach() {
//   await db.query("BEGIN");
// }

// async function commonAfterEach() {
//   await db.query("ROLLBACK");
// }

// async function commonAfterAll() {
//   await db.end();
// }

module.exports = {
  commonBeforeAll,
  commonAfterEach,
  commonAfterAll,
  commonBeforeEach,
  userIds,
  getUserToken,
  adminToken,
};
