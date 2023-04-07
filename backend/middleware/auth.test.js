"use strict";

const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../expressError");

const {
  authenticateJWT,
  ensureLoggedIn,
  ensureAdmin,
  ensureCorrectUserOrAdmin,
} = require("./auth");

const { SECRET_KEY } = require("../config");
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
      // console.log("res.locals.user", res.locals.user);
      ensureLoggedIn(req, res, next);
    });
  });

  test("unauth if no login", function () {
    expect.assertions(1);
    const req = {};
    const res = { locals: {} };
    const next = function (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    ensureLoggedIn(req, res, next);
  });
});

describe("ensureAdmin", function () {
  test("works", function () {
    expect.assertions(1);
    const req = { params: { username: "admin" } };
    const res = { locals: { user: { username: "admin", isAdmin: true } } };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    ensureAdmin(req, res, next);
  });

  test("unauth if not admin", function () {
    expect.assertions(2);
    const req = { params: { username: "test" } };
    const res = { locals: { user: { username: "test", isAdmin: false } } };
    const next = function (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    ensureAdmin(req, res, next);
  });

  test("unauth if not logged in", function () {
    expect.assertions(1);
    const req = {};
    const res = { locals: {} };
    const next = function (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    ensureAdmin(req, res, next);
  });

  test("unauth if anon user", function () {
    expect.assertions(1);
    const req = {};
    const res = { locals: {} };
    const next = function (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    ensureAdmin(req, res, next);
  });

  describe("ensureCorrectUserOrAdmin", function () {
    test("works: admin", function () {
      expect.assertions(1);
      const req = { params: { username: "test" } };
      const res = { locals: { user: { username: "admin", isAdmin: true } } };
      const next = function (err) {
        expect(err).toBeFalsy();
      };
      ensureCorrectUserOrAdmin(req, res, next);
    });

    test("works: same user", function () {
      expect.assertions(1);
      const req = { params: { username: "test" } };
      const res = { locals: { user: { username: "test", isAdmin: false } } };
      const next = function (err) {
        expect(err).toBeFalsy();
      };
      ensureCorrectUserOrAdmin(req, res, next);
    });

    test("unauth if not same user", function () {
      expect.assertions(1);
      const req = { params: { username: "wrong" } };
      const res = { locals: { user: { username: "test", isAdmin: false } } };
      const next = function (err) {
        expect(err instanceof UnauthorizedError).toBeFalsy();
      };
      ensureCorrectUserOrAdmin(req, res, next);
    });
  });

  test("unauth if not logged in", function () {
    expect.assertions(1);
    const req = { params: { username: "test" } };
    const res = { locals: {} };
    const next = function (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    ensureCorrectUserOrAdmin(req, res, next);
  });
});
