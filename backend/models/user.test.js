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

test("should authenticate a user", () => {
  const user = User.authenticate("johndoe", "password");
  expect(user).toBe({
    username: "testuser",
    first_name: "Test",
    last_name: "User",
    email: "test@email.com",
    is_admin: false,
  });

  test("should not authenticate a user", () => {
    try {
      User.authenticate("johndoe", "password");
      fail();
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });

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

    // test("unauthorized if no such user", async function () {
    //   try {
    //     await User.authenticate("nope", "password");
    //     fail();
    //   } catch (err) {
    //     expect(err instanceof UnauthorizedError).toBeTruthy();
    //   }
    // });

    // test("unauthorized if wrong password", async function () {
    //   try {
    //     await User.authenticate("jdoe", "wrong");
    //     fail();
    //   } catch (err) {
    //     expect(err instanceof UnauthorizedError).toBeTruthy();
    //   }
    // });

    // // /** test register/signup */
    // describe("register", function () {
    //   const newUser = {
    //     username: "new",
    //     password: "password",
    //     first_name: "Test",
    //     last_name: "User",
    //     email: "test@gmail.com",
    //     isAdmin: false,
    //   };

    //   test("works", async function () {
    //     let user = await User.register({ ...newUser, password: "password" });
    //     expect(user).toEqual(newUser);
    //     const found = await db.query("SELECT * FROM users WHERE username = 'new'");
    //     expect(found.rows.length).toEqual(1);
    //     expect(found.rows[0].is_admin).toEqual(false);
    //     expect(found.rows[0].password.startsWith(`$2b$`)).toEqual(true);
    //   });

    //   test("bad request with dupe data", async function () {
    //     try {
    //       await User.register({
    //         ...newUser,
    //         username: "jdoe",
    //         password: "password",
    //       });
    //       await User.register({
    //         ...newUser,
    //         username: "jdoe",
    //         password: "password",
    //       });
    //       fail();
    //     } catch (err) {
    //       expect(err instanceof BadRequestError).toBeTruthy();
    //     }
    //   });
    // });

    // describe("get", function () {
    //   test("works", async function () {
    //     let user = await User.get("jdoe");
    //     expect(user).toEqual({
    //       username: "jdoe",
    //       first_name: "Jane",
    //       last_name: "Doe",
    //       email: "test@email.com",
    //       is_admin: true,
    //     });
    //   });

    //   test("not found if no such user", async function () {
    //     try {
    //       await User.get("nope");
    //       fail();
    //     } catch (err) {
    //       expect(err instanceof NotFoundError).toBeTruthy();
    //     }
    //   });
  });
});
