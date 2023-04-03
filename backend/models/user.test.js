"use strict";

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const db = require("../db.js");
const User = require("./user");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("authenticate", function () {
  test("works", async function () {
    const user = await User.authenticate("jdoe", "password");
    expect(user).toEqual({
      username: "jdoe",
      first_name: "Jane",
      last_name: "Doe",
      email: "test@email.com",
      is_admin: false,
    });
  });
});

test("throws UnauthorizedError if invalid password", async function () {
  expect.assertions(1);
  try {
    await User.authenticate("nope", "wrongpassword");
  } catch (err) {
    expect(err instanceof UnauthorizedError).toBeTruthy();
  }
});

test("throws UnauthorizedError if invalid username", async function () {
  expect.assertions(1);
  try {
    await User.authenticate("_nope_", "password");
  } catch (err) {
    expect(err instanceof UnauthorizedError).toBeTruthy();
  }
});

describe("register", function () {
  test("works", async function () {
    let user = await User.register({
      username: "newuser",
      password: "newpassword",
      first_name: "New",
      last_name: "User",
      email: "hello@gmail.com",
    });
    expect(user).toEqual({
      username: "newuser",
      first_name: "New",
      last_name: "User",
      email: "hello@gmail.com",
      is_admin: false,
    });

    const found = await db.query(
      "SELECT username, first_name, last_name, email, is_admin FROM users WHERE username = 'newuser'"
    );
    expect(found.rows.length).toEqual(1);
    expect(found.rows[0]).toEqual({
      username: "newuser",
      first_name: "New",
      last_name: "User",
      email: "hello@gmail.com",
      is_admin: false,
    });
  });

  test("throws BadRequestError if missing required fields", async function () {
    expect.assertions(1);
    try {
      await User.create({
        username: "newuser",
        password: "newpassword",
        first_name: "New",
        last_name: "User",
      });
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

describe("get", function () {
  test("works", async function () {
    const user = await User.get("johndoe");
    expect(user).toEqual({
      username: "johndoe",
      first_name: "John",
      last_name: "Doe",
      email: "test3@email.com",
      is_admin: false,
    });
  });

  test("throws NotFoundError if user not found", async function () {
    expect.assertions(1);
    try {
      await User.get("nonexistentuser");
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

describe("update", function () {
  test("works", async function () {
    const updateData = {
      first_name: "Jane",
      last_name: "Doe",
      email: "janedoe@example.com",
    };
    const user = await User.update("johndoe", updateData);
    expect(user).toEqual({
      username: "johndoe",
      first_name: "Jane",
      last_name: "Doe",
      email: "janedoe@example.com",
      is_admin: false,
    });
  });

  test("throws NotFoundError if user not found", async function () {
    expect.assertions(1);
    try {
      await User.update("nonexistentuser", {
        first_name: "Jane",
        last_name: "Doeee",
        email: "test@email.com",
      });
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

describe("remove", function () {
  test("works", async function () {
    await User.remove("testuser");
    const res = await db.query(
      "SELECT username FROM users WHERE username='testuser'"
    );
    expect(res.rows.length).toEqual(0);
  });

  test("throws NotFoundError if user not found", async function () {
    expect.assertions(1);
    try {
      await User.remove("nonexistentuser");
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
