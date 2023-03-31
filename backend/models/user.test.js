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
    const user = await User.authenticate("johndoe", "password");
    expect(user).toEqual({
      username: "johndoe",
      first_name: "John",
      last_name: "Doe",
      email: "test3@email.com",
      is_admin: false,
    });
  });

  test("throws UnauthorizedError if invalid password", async function () {
    expect.assertions(1);
    try {
      await User.authenticate("johndoe", "wrongpassword");
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });

  test("throws NotFoundError if user not found", async function () {
    expect.assertions(1);
    try {
      await User.authenticate("nonexistentuser", "password");
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

describe("create", function () {
  test("works", async function () {
    const newUser = {
      username: "newuser",
      password: "newpassword",
      first_name: "New",
      last_name: "User",
      email: "newuser@example.com",
      is_admin: false,
    };
    const user = await User.create(newUser);
    expect(user).toEqual({
      username: "newuser",
      first_name: "New",
      last_name: "User",
      email: "newuser@example.com",
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
        last_name: "Doe",
        email: "janedoe@example.com",
      });
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
