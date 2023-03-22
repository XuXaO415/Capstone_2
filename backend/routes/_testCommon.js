"use strict";

const db = require("../db.js");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");

const userIds = [];

// async function commonBeforeAll() {
//   await db.query("DELETE FROM users");
//   await db.query("DELETE FROM likes");

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

  // userIds.[0] = (await User.register({
  //     username: "user1",
  //     first_name: "User",
  //     last_name: "One",
  //     email: "theOneUser@test@email.com",
  //     password: "password",
  //     is_admin: false,
  // }));
  // userIds.[1] = await User.register({
  //     username: "user2",
  //     first_name: "User",
  //     last_name: "Two",
  //     email: "theTwoUser@email.com",
  //     password: "password",
  //     is_admin: false,
  // });

  await User.register({
    username: "admin",
    first_name: "Admin",
    last_name: "User",
    email: "adminUser@admin.com",
    password: "password1",
    is_admin: true,
  });

  async function commonBeforeEach() {
    await db.query("BEGIN");
  }

  async function commonAfterEach() {
    await db.query("ROLLBACK");
  }

  async function commonAfterAll() {
    await db.end();
  }

  const getUserToken = createToken({ username: "testuser", is_admin: false });
  const adminToken = createToken({ username: "admin", is_admin: true });
};

module.exports = {
  commonBeforeAll,
  commonAfterEach,
  commonAfterAll,
  getUserToken,
  userIds,
  adminToken,
};
