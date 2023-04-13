"use strict";

const db = require("../db.js");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");


// let getUserToken, adminToken;

async function commonBeforeAll() {
  // await db.query("DELETE FROM users");
  // await db.query(
  //   `INSERT INTO users(username, password, first_name, last_name, email, city, state, zip_code, country, latitude, longitude, image_url, hobbies, interests)
  //       VALUES('u1', $1, 'U1F', 'U1F', 'user1@user.com', 'SF', 'CA', '94110', 'US', '000000', '000000', NULL,  NULL, NULL),
  //             ('u2', $2, 'UF2', 'UF2', 'user2@user.com', 'Oakland', 'CA', '94601', 'US', '100000', '100000', NULL,  NULL, NULL)
  //       RETURNING username`
  // );

  // await User.register({
  //   username: "u1",
  //   firstName: "U1F",
  //   lastName: "U1L",
  //   email: "user1@user.com",
  //   password: "password1",
  //   isAdmin: false,
  // });
  // await User.register({
  //   username: "u2",
  //   firstName: "U2F",
  //   lastName: "U2L",
  //   email: "user2@user.com",
  //   password: "password2",
  //   isAdmin: false,
  // });
}

async function commonBeforeEach() {
  await db.query("BEGIN");
  // console.log("Test starting");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

const adminToken = createToken({
  username: "admin",
  password: "admin",
  isAdmin: true,
});
const getUserToken = createToken({
  username: "u1",
  password: "password1",
  isAdmin: false,
});

module.exports = {
  commonBeforeAll,
  commonAfterEach,
  commonAfterAll,
  commonBeforeEach,
  adminToken,
  getUserToken,
};
