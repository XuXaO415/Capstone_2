"use strict";

const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../expressError");

const {
  authenticateJWT,
  ensureLoggedIn,
  ensureCorrectUser,
} = require("./auth");

const { SECRET_KEY } = require("../config");
// const testJwt = jwt.JsonWebTokenError;
const testToken = jwt.sign({ username: "test", isAdmin: false }, SECRET_KEY);
const badToken = jwt.sign({ username: "test", isAdmin: false }, "wrong");

describe("authenticateJWT", function () {
  test("works: via header", function () {
    expect.assertions(2);
    const req = { headers: { authorization: `Bearer ${testToken}` } };
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({
      user: {
        iat: expect.any(Number),
        username: "test",
        isAdmin: false,
      },
    });
  });

  test("works: no header", function () {
    expect.assertions(2);
    const req = {};
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({});
  });

  test("works: invalid token", function () {
    expect.assertions(2);
    const req = { headers: { authorization: `Bearer ${badToken}` } };
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({});
  });

  describe("ensureLoggedIn", function () {
    test("works", function () {
      expect.assertions(1);
      const req = {};
      const res = { locals: { user: { username: "test", is_admin: false } } };
      const next = function (err) {
        expect(err).toBeFalsy();
      };
      ensureLoggedIn(req, res, next);
    });
  });
});
