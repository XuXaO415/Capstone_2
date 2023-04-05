// "use strict";

// const request = require("supertest");

// const db = require("../db.js");
// const app = require("../app");
// const User = require("../models/user");
// // const User = require("../routes/users");

// const {
//   commonBeforeAll,
//   commonBeforeEach,
//   commonAfterEach,
//   commonAfterAll,
//   // getUserToken,
//   // adminToken,
// } = require("./_testCommon");

// beforeAll(commonBeforeAll);
// beforeEach(commonBeforeEach);
// afterEach(commonAfterEach);
// afterAll(commonAfterAll);

// describe("GET /users", function () {
//   test("works for users", async function () {
//     const resp = await request(app).get("/users");

//     expect(resp.body).toEqual({
//       users: [
//         {
//           username: "jdoe",
//           first_name: "Jane",
//           last_name: "Doe",
//           email: "test@email.com",
//           is_admin: false,
//         },
//         {
//           username: "johndoe",
//           first_name: "John",
//           last_name: "Doe",
//           email: "joeDoe@email.com",

//           is_admin: false,
//         },
//         {
//           username: "admin",
//           first_name: "Admin",
//           last_name: "Doe",
//           email: "admin@admin.com",

//           is_admin: true,
//         },
//       ],
//     });
//   });
// });
"use strict";
const request = require("supertest");
const app = require("../app");
const db = require("../db");
const User = require("../models/user");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  adminToken,
  getUserToken,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

// beforeAll(async function () {
//   await db.query(
//     `CREATE TABLE users (
//       user_id SERIAL PRIMARY KEY,
//       first_name TEXT NOT NULL,
//       last_name TEXT NOT NULL,
//       username TEXT NOT NULL UNIQUE,
//       email TEXT NOT NULL UNIQUE,
//       password TEXT NOT NULL,
//       city TEXT NOT NULL,
//       state TEXT NOT NULL,
//       zip_code TEXT NOT NULL,
//       country TEXT NOT NULL,
//       latitude TEXT NOT NULL,
//       longitude TEXT NOT NULL,
//       image_url TEXT,
//       hobbies TEXT,
//       interests TEXT,
//       is_admin BOOLEAN NOT NULL DEFAULT false
//   )`
//   );
// });

afterAll(async function () {
  await db.end();
});

describe("GET /users/", function () {
  test("works for admin", async function () {
    const resp = await request(app)
      .get("/users")
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.body).toEqual({
      users: [
        {
          username: "jdoe",
          firstName: "Jane",
          lastName: "Doe",
          email: "test@email.com",
          isAdmin: false,
        },
        {
          username: "newUser",
          firstName: "New",
          lastName: "User",
          email: "test2@mail.com",
          isAdmin: false,
        },
      ],
    });
  });
});

test("unauth for non-admin", async function () {
  const resp = await request(app)
    .get("/users")
    .set("authorization", `Bearer ${getUserToken}`);
  expect(resp.statusCode).toEqual(401);
});

test("unauth for anon", async function () {
  const resp = await request(app).get("/users");
  expect(resp.statusCode).toEqual(401);
});

// describe("GET /users/:username", function () {
//   test("works for admin", async function () {
//     const resp = await request(app)
//       .get("/users/Channel2live")
//       .set("authorization", `Bearer ${adminToken}`);
//     expect(resp.body).toEqual({
//       user: {
//         username: "Channel2live",
//         firstName: "Izm",
//         lastName: "Mad",
//         email: "bombBeatz@gmail.com",
//         isAdmin: true,
//       },
//     });
//   });

test("works for user", async function () {
  const resp = await request(app)
    .get("/users/jdoe")
    .set("authorization", `Bearer ${getUserToken}`);
  expect(resp.body).toEqual({
    user: {
      username: "jdoe",
      firstName: "Jane",
      lastName: "Doe",
      email: "test@email.com",
      isAdmin: false,
    },
  });
});

test("works for same user", async function () {
  const resp = await request(app)
    .get("/users/jdoe")
    .set("authorization", `Bearer ${getUserToken}`);
  expect(resp.body).toEqual({
    user: {
      username: "jdoe",
      firstName: "Jane",
      lastName: "Doe",
      email: "test@email.com",
      isAdmin: false,
    },
  });
});
