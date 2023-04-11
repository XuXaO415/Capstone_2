"use strict";

const db = require("../db.js");
const User = require("../models/user");
// const User = require("../routes/users");
const { createToken } = require("../helpers/tokens");

const userIds = [];
// let getUserToken, adminToken;

async function commonBeforeAll() {
  // await db.query("DELETE FROM users");
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
