"use strict";

const db = require("../db.js");
const User = require("../models/user");
// const User = require("../routes/users");
const { createToken } = require("../helpers/tokens");

const userIds = [];
// let getUserToken, adminToken;

async function commonBeforeAll() {
  // await db.query("DELETE FROM users");
  // await db.query(
  //   `INSERT INTO users(username, password, first_name, last_name, email, city, state, zip_code, country, latitude, longitude, image_url, hobbies, interests)
  //       VALUES('jdoe', 'password', 'Jane', 'Doe', 'test@email.com', 'SF', 'CA', '94110', 'US', '000000', '000000', NULL,  NULL, NULL),
  //             ('newuser', 'password2', 'New', 'User', 'test2@email.com', 'Oakland', 'CA', '94601', 'US', '100000', '100000', NULL,  NULL, NULL)
  //       RETURNING username`
  // );
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
  username: "jdoe",
  // password: "password",
  isAdmin: false,
});

module.exports = {
  commonBeforeAll,
  commonAfterEach,
  commonAfterAll,
  commonBeforeEach,
  adminToken,
  getUserToken,
  userIds,
};
