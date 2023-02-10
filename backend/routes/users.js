"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");

const express = require("express");
const {
  ensureCorrectUserOrAdmin,
  ensureAdmin,
  authenticateJWT,
  ensureCorrectUser,
  ensureLoggedIn,
} = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
let { createToken } = require("../helpers/tokens");
const userNewSchema = require("../schemas/userNew.json");
const userUpdateSchema = require("../schemas/userUpdate.json");
const userLikeSchema = require("../schemas/userLike.json");
const userMatchSchema = require("../schemas/userMatch.json");
// const userRegisterSchema = require("../schemas/userRegister.json");

const router = express.Router();

/** POST / { user }  => { user, token }
 *
 * Adds a new user. This is not the registration endpoint --- instead, this is
 * only for admin users to add new users. The new user being added can be an
 * admin.
 *
 * This returns the newly created user and an authentication token for them:
 *  {user: { username, firstName, lastName, email, isAdmin }, token }
 *
 * Authorization required: admin
 **/

router.post("/", ensureAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.register(req.body);
    const token = createToken(user);
    return res.status(201).json({
      user,
      token,
    });
  } catch (err) {
    return next(err);
  }
});

/** POST /users/login { user } => { token }
 *
 * user should be { username, password, firstName, lastName, email, phone, city, country, zipCode, imageUrl, hobbies, interests }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 *  Authorization required: user
 * */

router.post("/login", async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await User.authenticate(username, password);
    const token = createToken(user);
    return res.json({
      token,
    });
  } catch (err) {
    return next(err);
  }
});

/** GET /users => { users: [ { username, firstName, lastName, email, isAdmin }, ...] }
 *
 * Returns list of all users.
 *
 * Authorization required: admin, auth with JWT
 *
 * ensureAdmin, authenticateJWT,
 * */

router.get("/", async function (req, res, next) {
  try {
    const users = await User.findAll();
    return res.json({
      users: users,
    });
  } catch (err) {
    return next(err);
  }
});

/** GET /users/[username] => { user }
 *  *
 * Returns { username, firstName, lastName, email, phone, city, country, zipCode, imageUrl, hobbies, interests, isAdmin }
 *
 * Authorization required: admin or same user-as-:username
 *
 *   ensureCorrectUserOrAdmin,
 *    ensureCorrectUser,
 **/

router.get("/:username", async function (req, res, next) {
  try {
    let user = await User.get(req.params.username, req.params.id);
    return res.json({
      user,
      user_id: req.params.id,
    });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[username] { fld1, fld2, ... } => { user }
 *
 * Data can include: { firstName, lastName, password, email, phone, city, country, zipCode, imageUrl, hobbies, interests, isAdmin }
 *
 * Returns { username, firstName, lastName, email, phone, city, country, zipCode, imageUrl, hobbies, interests, isAdmin }
 *
 * Authorization required: admin or same-user-as:username
 *
 *
 * */

router.patch(
  "/:username",
  ensureCorrectUserOrAdmin,
  async function (req, res, next) {
    try {
      const validator = jsonschema.validate(req.body, userUpdateSchema);
      if (!validator.valid) {
        const errs = validator.errors.map((e) => e.stack);
        throw new BadRequestError(errs);
      }

      const user = await User.update(req.params.username, req.body);
      return res.json({
        user,
      });
    } catch (err) {
      return next(err);
    }
  }
);

/** DELETE /[username]  =>  { deleted: username }
 *
 * Authorization: admin or same-user-as:username
 * */

router.delete(
  "/:username",
  ensureCorrectUserOrAdmin,
  async function (req, res, next) {
    try {
      await User.remove(req.params.username);
      return res.json({
        deleted: req.params.username,
      });
    } catch (err) {
      return next(err);
    }
  }
);

/** GET /users/:username/[user_id] = {user_id}
 *
 * Returns basic user info
 *
 * Authorization required: admin
 * */

router.get("/:username/:user_id", async function (req, res, next) {
  try {
    let user = await User.getUserById(req.params.user_id, req.params.username);
    return res.json({
      currentUser: req.params.username,
      userInfo: user,
      user_id: req.params.user_id,
    });
  } catch (err) {
    return next(err);
  }
});

/** Route for getting a list of potential user (semi-working) */

router.get("/:username/matches", async function (req, res, next) {
  try {
    let user = await User.matchUsers(
      req.body,
      req.params.username,
      req.params.id,
      req.params.user_id
    );
    console.log(req.params.username, req.params.id, req.params.user_id);
    return res.json({
      user,
      currentUser: req.params.username,
      user_id: req.params.id,
    });
  } catch (err) {
    return next(err);
  }
});

router.post("/:username/matches", async function (req, res, next) {
  try {
    let user = await User.matchUsers(req.body, req.params.username);
    return res.json({
      user,
      currentUser: req.params.username,
      user_id: req.params.id,
    });
  } catch (err) {
    return next(err);
  }
});

router.get("/:username/matches/:user_id", async function (req, res, next) {
  try {
    let users = await User.matchUsers(req.params.user_id);
    console.log(req.params.user_id);
    return res.json({
      users,
      currentUser: req.params.username,
      user_id: req.params.user_id,
    });
  } catch (err) {
    return next(err);
  }
});

/** Route for Posting User match */

router.post("/:username/matches/:user_id", async function (req, res, next) {
  try {
    let user = await User.matchUsers(req.body, req.username, req.params.id);
    return res.json({
      user,
      username: req.params.username,
      user_id: req.params.id,
    });
  } catch (err) {
    return next(err);
  }
});

router.get("/:username/matches/like/:user_id", async function (req, res, next) {
  try {
    let user = await User.likeUser(
      req.body,
      req.params.user_id,
      req.params.username,
      req.params.id
    );
    console.log(req.params.user_id);
    return res.json({
      user,
      currentUser: req.params.username,
      user_id: req.params.user_id,
    });
  } catch (err) {
    return next(err);
  }
});

/** Route for POST -- Liking a match */

router.post(
  "/:username/matches/like/:user_id",
  async function (req, res, next) {
    try {
      let user = await User.likeUser(req.body, req.params.id);
      return res.json({
        user,
        username: req.params.username,
        user_id: req.params.id,
      });
    } catch (err) {
      if (err.res) {
        return res.status(err.res.status).json(err.res.data);
        // return next(err);
      }
    }
  }
);

router.get("/:username/matches/liked", async function (req, res, next) {
  try {
    let user = await User.getLikedMatches(req.params.username);
    return res.json({
      user,
      username: req.params.username,
      user_id: req.params.id,
    });
  } catch (err) {
    return next(err);
  }
});

// router.post("/:username/matches/like", async function (req, res, next) {
//   try {
//     let user = await User.likeUser(req.body, req.params.id, req.data);
//     return res.json({
//       user,
//       username: req.params.username,
//       user_id,
//     });
//   } catch (err) {
//     return next(err);
//   }
// });

/** Route for POST -- Disliking a match */

router.post(
  "/:username/matches/dislike/:user_id",
  async function (req, res, next) {
    try {
      let user = await User.dislikeMatch(req.body, req.params.id);
      return res.json({
        user,
        username: req.params.username,
        user_id: req.params.id,
      });
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
