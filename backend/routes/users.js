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

// router.get(
//   "/login/user",
//   ensureCorrectUserOrAdmin,
//   async function (req, res, next) {
//     try {
//       const user = await User.get(req.user.username);
//       return res.json({
//         user,
//       });
//     } catch (err) {
//       return next(err);
//     }
//   }
// );

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
    let user = await User.get(req.params.username);
    return res.json({
      user,
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
 * Removed  for now
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

module.exports = router;
