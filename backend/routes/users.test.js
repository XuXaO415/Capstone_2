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
  userIds,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /users */

describe("POST /users", function () {
  test("works for admins: create non-admin", async function () {
    const resp = await request(app)
      .post("/users")
      .send({
        username: "u-new",
        firstName: "First-new",
        lastName: "Last-newL",
        email: "new@email.com",
        // password: "password-new",
        // city: "SF",
        // state: "CA",
        // country: "US",
        // zipCode: "94110",
        // latitude: "000000",
        // longitude: "000000",
        // interests: "hiking",
        // hobbies: "swimming",
        isAdmin: false,
      })
      .set("authorization", `Bearer ${adminToken}`);
    expect(201);
    expect(resp.body).toEqual({
      user: {
        username: "u-new",
        firstName: "First-new",
        lastName: "Last-newL",
        email: "new@email.com",
        isAdmin: false,
      },
      token: expect.any(String),
    });
  });

  // test("works for admins: create admin", async function () {
  //   const res = await request(app)
  //     .post("/users")
  //     .send({
  //       username: "u-new",
  //       firstName: "First-new",
  //       lastName: "Last-newL",
  //       password: "password-new",
  //       email: "new@email.com",
  //       city: "SF",
  //       state: "CA",
  //       country: "US",
  //       zipCode: 94110,
  //       isAdmin: true,
  //     })
  //     .set("authorization", `Bearer ${adminToken}`);
  //   expect(201);
  //   expect(res.body).toEqual({
  //     user: {
  //       username: "u-new",
  //       firstName: "First-new",
  //       lastName: "Last-newL",
  //       password: "password-new",
  //       email: "new@email.com",
  //       city: "SF",
  //       state: "CA",
  //       country: "US",
  //       zipCode: 94110,
  //     },
  //     token: expect.any(String),
  //   });
  //   expect(201);
  // });

  test("unauth for non-admins", async function () {
    const resp = await request(app).post("/users").send({
      username: "u-new",
      firstName: "First-new",
      lastName: "Last-newL",
      password: "password-new",
      email: "new@email.com",
      isAdmin: true,
    });
    expect(401);
  });

  test("bad request with missing data", async function () {
    const resp = await request(app).post("/users").send({
      username: "u-new",
    });
    expect(400);
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app)
      .post("/users")
      .send({
        username: "u-new",
        firstName: "First-new",
        lastName: "Last-newL",
        password: "password-new",
        email: "not-an-email",
        isAdmin: true,
      })
      .set("authorization", `Bearer ${adminToken}`);
    expect(400);
  });
});

/************************************** GET /users */

describe("GET /users", function () {
  test("works for admins", async function () {
    const resp = await request(app)
      .get("/users")
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.body).toEqual({
      users: [
        {
          username: "u1",
          firstName: "U1F",
          lastName: "U1L",
          email: "user1@user.com",
          isAdmin: false,
        },
        {
          username: "u2",
          firstName: "U2F",
          lastName: "U2L",
          email: "user2@user.com",
          isAdmin: false,
        },
        {
          username: "u3",
          firstName: "U3F",
          lastName: "U3L",
          email: "user3@user.com",
          isAdmin: false,
        },
      ],
    });
  });

  test("unauth for non-admin users", async function () {
    const resp = await request(app)
      .get("/users")
      .set("authorization", `Bearer ${getUserToken}`);
    expect(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app).get("/users");
    expect(401);
  });

  test("fails: test next() handler", async function () {
    await db.query("DROP TABLE users CASCADE");
    const resp = await request(app)
      .get("/users")
      .set("authorization", `Bearer ${adminToken}`);
    expect(500);
  });
});

describe("GET /users/:username/matches/users", function () {
  test("works for users", async () => {
    const users = await request(app)
      .get("/u1/matches/users")
      .set("authorization", `Bearer ${getUserToken}`);

    expect(users).toEqual([
      {
        username: "u1",
        firstName: "U1F",
        lastName: "U1L",
        email: "user1@user.com",
        isAdmin: false,
      },
      {
        username: "u2",
        firstName: "U2F",
        lastName: "U2L",
        email: "user2@user.com",
        isAdmin: false,
      },
    ]);
  });
});

// describe("GET /users/:username/matches/users", function () {
//   test("works for users", async function () {
//     const resp = await request(app)
//       .get("/u1/matches/users")
//       .set("authorization", `Bearer ${getUserToken}`);
//     expect(resp.body).toContain({
//       users: [
//         {
//           // user_id: userIds[1],
//           username: "jdoe",
//           firstName: "Jane",
//           lastName: "Doe",
//           city: "SF",
//           country: "US",

//           hobbies: null,
//           imageUrl: null,
//           interests: null,

//           latitude: "000000",
//           longitude: "000000",
//           state: "CA",
//           username: "jdoe",
//           zipCode: "94110",
//           isAdmin: false,
//         },
//       ],
//     });
//     expect(200);
//   });
// });
