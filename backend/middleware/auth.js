"use strict";

/** Convenience middleware to handle common auth cases in routes. */

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");

// function authenticateJWT(req, res, next) {
//   try {
//     const authHeader = req.headers && req.headers.authorization;
//     if (authHeader) {
//       const token = authHeader.replace(/^[Bb]earer /, "").trim();
//       res.locals.user = jwt.verify(token, SECRET_KEY);
//     }
//     return next();
//   } catch (err) {
//     return next();
//   }
// }

/** Tweaked code line 30  */

function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, "").trim();
      res.locals.user = jwt.verify(token, SECRET_KEY);
      req.username = res.locals.user.username; // this makes req.username available to other middleware functions
    }
    return next();
  } catch (err) {
    return next();
  }
}

function ensureLoggedIn(req, res, next) {
  try {
    if (!res.locals.user?.username === undefined) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
}

function ensureCorrectUser(req, res, next) {
  try {
    const user = res.locals.user;
    if (!(user && user.username === req.params.username)) {
      throw new UnauthorizedError();
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

/** Tweaked code */

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

/** Middleware to use when they be logged in as an admin user.
 *
 *  If not, raises Unauthorized.
 */

function ensureAdmin(req, res, next) {
  try {
    if (!res.locals.user || !res.locals.user.isAdmin) {
      throw new UnauthorizedError();
    }
    return next();
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
    if (!(user && (user.isAdmin || user.username === req.params.username))) {
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
