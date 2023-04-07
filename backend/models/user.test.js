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
    const user = await User.authenticate("jdoe", "password1");
    expect(user).toEqual({
      username: "jdoe",
      firstName: "Jane",
      lastName: "Doe",
      email: "test@email.com",
      isAdmin: false,
    });
  });

  test("unauth if no such user", async function () {
    try {
      await User.authenticate("nope", "password");
      fail();
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });
});

// test("throws UnauthorizedError if user is not authenticated", async function () {
//   expect.assertions(1);
//   try {
//     await User.authenticate("nope", "password");
//   } catch (err) {
//     expect(err instanceof UnauthorizedError).toBeTruthy();
//   }
// });

// test("unauth if no such user", async function () {
//   try {
//     await User.authenticate("nope", "password");
//     fail();
//   } catch (err) {
//     expect(err instanceof UnauthorizedError).toBeTruthy();
//   }
// });

// test("throws UnauthorizedError if invalid password", async function () {
//   expect.assertions(1);
//   try {
//     await User.authenticate("nope", "wrongpassword");
//   } catch (err) {
//     expect(err instanceof UnauthorizedError).toBeTruthy();
//   }
// });

// test("throws UnauthorizedError if invalid username", async function () {
//   expect.assertions(1);
//   try {
//     await User.authenticate("_nope_", "password");
//   } catch (err) {
//     expect(err instanceof UnauthorizedError).toBeTruthy();
//   }
// });

// /****************************** register */

// describe("register", function () {
//   test("works", async function () {
//     let newUser = await User.register({
//       username: "newuser",
//       password: "newpassword",
//       firstName: "New",
//       lastName: "User",
//       email: "hello@gmail.com",
//       city: "SF",
//       state: "CA",
//       zipCode: "94418",
//       country: "US",
//       latitude: "000000",
//       longitude: "100000",
//       imageUrl: null,
//       hobbies: null,
//       interests: null,
//       isAdmin: false,
//     });
//   });

//   test("throws BadRequestError on dupe", async function () {
//     expect.assertions(1);
//     try {
//       await User.register({
//         username: "jdoe",
//         password: "password1",
//         first_name: "Jane",
//         last_name: "Doe",
//         email: "hello@email.com",
//         isAdmin: false,
//       });
//     } catch (err) {
//       expect(err instanceof BadRequestError).toBeTruthy();
//     }
//   });

//   test("works: adds a new user", async function () {
//     const newUser = await User.register({
//       username: "newuser",
//       password: "newpassword",
//       firstName: "New",
//       lastName: "User",
//       email: "newEmail@test.com",
//       city: "Oakland",
//       state: "CA",
//       zipCode: "94110",
//       country: "US",
//       latitude: "000000",
//       longitude: "100000",
//       imageUrl: null,
//       hobbies: null,
//       interests: null,
//       isAdmin: false,
//     });
//   });

//   test("throws BadRequestError with dupe username", async function () {
//     expect.assertions(1);
//     try {
//       await User.register({
//         username: "jdoe",
//         password: "password1",
//         first_name: "Jane",
//         last_name: "Doe",
//         email: "dupe@email.com",
//         isAdmin: false,
//       });
//     } catch (err) {
//       expect(err instanceof BadRequestError).toBeTruthy();
//     }
//   });
// });

// test("throws NotFoundError if user not found", async function () {
//   expect.assertions(1);
//   try {
//     await User.get("nonexistentuser");
//   } catch (err) {
//     expect(err instanceof NotFoundError).toBeFalsy();
//   }
// });

// describe("update", function () {
//   test("works", async function () {
//     const updateData = {
//       first_name: "Jane",
//       last_name: "Doe",
//       email: "janedoe@example.com",
//     };
//   });

//   test("throws NotFoundError if user not found", async function () {
//     expect.assertions(1);
//     try {
//       await User.update("nonexistentuser", {
//         first_name: "Jane",
//         last_name: "Doeee",
//         email: "test@email.com",
//       });
//     } catch (err) {
//       expect(err instanceof NotFoundError).toBeTruthy();
//     }
//   });
// });

// test("not found if no such user", async function () {
//   try {
//     await User.update("nope", {
//       first_name: "Jane",
//       last_name: "Doeee",
//     });
//     fail();
//   } catch (err) {
//     expect(err instanceof NotFoundError).toBeTruthy();
//   }
// });

// test("throws NotFoundError if user not found", async function () {
//   expect.assertions(1);
//   try {
//     await User.remove("nonexistentuser");
//   } catch (err) {
//     expect(err instanceof NotFoundError).toBeTruthy();
//   }
// });

// test("bad request with no data", async function () {
//   try {
//     await User.update("jdoe", {});
//     fail();
//   } catch (err) {
//     expect(err instanceof BadRequestError).toBeTruthy();
//   }
// });
