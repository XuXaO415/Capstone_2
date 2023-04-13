"use strict";

/** Routes for authentication. */

const jsonschema = require("jsonschema");

const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/tokens");
const userAuthSchema = require("../schemas/userAuth.json");
const userRegisterSchema = require("../schemas/userRegister.json");
const { BadRequestError } = require("../expressError");

/** POST /auth/token:  { username, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/token", async function(req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, userAuthSchema);
        if (!validator.valid) {
            const errs = validator.errors.map((e) => e.stack);
            throw new BadRequestError(errs);
        }

        const { username, password } = req.body;
        const user = await User.authenticate(username, password);
        const token = createToken(user);
        console.log("token created successfully:", token, "user is =", user);
        return res.json({ token });
    } catch (err) {
        return next(err);
    }
});

/** POST /auth/register:   user => { token }
 * user must include { username, password, firstName, lastName, email, etc }
 * Returns JWT token which can be used to authenticate further requests.
 * Authorization required: none
 */

router.post("/register", async function(req, res, next) {
    try {
        // const validator = jsonschema.validate(req.body, userRegisterSchema);
        // if (!validator.valid) {
        //   const errs = validator.errors.map((e) => e.stack);
        //   throw new BadRequestError(errs);
        // }

        const checkFields = [
            "username",
            "password",
            "firstName",
            "lastName",
            "email",
            "city",
            "state",
            "country",
            "zipCode",
            "hobbies",
            "interests",
        ];
        checkFields.forEach((field) => {
            if (!req.body[field]) {
                throw new BadRequestError(`Missing ${field} in request body.`);
            }
        });

        const newUser = await User.register({
            ...req.body,
            isAdmin: false,
        });

        const token = createToken(newUser);
        return res.status(201).json({
            token,
        });
    } catch (err) {
        return next(err);
    }
});

// router.delete(
//   "/:username/matches/delete/:user_id",
//   async function (req, res, next) {
//     try {
//       const { username, user_id } = req.params;
//       const user = await User.removeMatch(username, user_id);
//       return res.json({ user });
//     } catch (err) {
//       return next(err);
//     }
//   }
// );

module.exports = router;