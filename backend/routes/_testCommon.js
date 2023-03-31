"use strict";

const db = require("../db.js");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");

const userIds = [];
let getUserToken, adminToken;

const commonBeforeAll = async () => {
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM likes");

  await User.register({
    username: "testuser",
    first_name: "Test",
    last_name: "User",
    email: "test@email.com",
    password: "password",
    is_admin: false,
  });

  await User.register({
    username: "johndoe",
    first_name: "John",
    last_name: "Doe",
    email: "johnD@email.com",
    password: "password",
    is_admin: false,
  });

  await User.register({
    username: "janeDoe",
    first_name: "Jane",
    last_name: "Doe",
    email: "janeD@test.com",
    password: "password",
    is_admin: false,
  });

  await User.register({
    username: "admin",
    first_name: "Admin",
    last_name: "User",
    email: "adminUser@admin.com",
    password: "password1",
    is_admin: true,
  });

  getUserToken = createToken({ username: "testuser", is_admin: false });
  adminToken = createToken({ username: "admin", is_admin: true });
};

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

module.exports = {
  commonBeforeAll,
  commonAfterEach,
  commonAfterAll,
  commonBeforeEach,
  userIds,
  getUserToken,
  adminToken,
};
