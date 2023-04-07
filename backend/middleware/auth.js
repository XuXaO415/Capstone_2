"use strict";

/** Convenience middleware to handle common auth cases in routes. */

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");

function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, "").trim();
      res.locals.user = jwt.verify(token, SECRET_KEY);
      req.username = res.locals.user.username;
    }
    return next();
  } catch (err) {
    return next();
  }
}

function ensureLoggedIn(req, res, next) {
  try {
    // if (!res.locals.user?.username === undefined) throw new UnauthorizedError();
    if (!res.locals.user) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
}

function ensureCorrectUser(req, res, next) {
  try {
    const user = res.locals.user;
    // if (!(user && user.currentUser === req.params.currentUser)) {
    if (!(user && user.username === req.params.username)) {
      throw new UnauthorizedError();
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

// function ensureCorrectUser(req, res, next) {
//   try {
//     let jwtStr = req.body._token || req.query._token;
//     let token = jwt.verify(jwtStr, SECRET_KEY);
//     req.username = token.username;
//     if (!(req.username === req.params.username)) {
//       throw new UnauthorizedError();
//     } else {
//       return next();
//     }
//   } catch (err) {
//     return next(err);
//   }
// }

/** Middleware to use when they are logged in as an admin user.
 *
 *  If not, raises Unauthorized.
 *
 */

function ensureAdmin(req, res, next) {
  try {
    if (res.locals.user.username === req.params.username) {
      return next();
    } else if (!res.locals.user.isAdmin) {
      throw new UnauthorizedError();
    }
    // if (!res.locals.user || !res.locals.user.isAdmin) {
    //   throw new UnauthorizedError();
    else return next();
  } catch (err) {
    return next(err);
  }
}

/** Middleware to use when they must provide a valid token & be user matching
 *  username provided as route param.
 *
 *  If not, raises Unauthorized.
 */

function ensureCorrectUserOrAdmin(req, res, next) {
  try {
    const user = res.locals.user;
    // if (!(user && (user.isAdmin || user.username === req.params.username))) {
    if (
      !(user && (user.isAdmin || user.currentUser === req.params.currentUser))
    ) {
      throw new UnauthorizedError();
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  ensureCorrectUser,
  ensureAdmin,
  ensureCorrectUserOrAdmin,
};
