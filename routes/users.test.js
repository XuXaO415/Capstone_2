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

  // test("bad request with invalid data", async function () {
  //   const resp = await request(app)
  //     .post("/users")
  //     .send({
  //       username: "u-new",
  //       firstName: "First-new",
  //       lastName: "Last-newL",
  //       password: "password-new",
  //       email: "not-an-email",
  //       isAdmin: true,
  //     })
  //     .set("authorization", `Bearer ${adminToken}`);
  //   expect(400);
  // });


/************************************** GET /users */

  test("unauth for non-admin users", async function () {
    const resp = await request(app)
      .get("/users")
      .set("authorization", `Bearer ${getUserToken}`);
   expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app).get("/users");
    expect(401);
  });




