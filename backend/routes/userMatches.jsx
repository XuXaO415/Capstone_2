"use strict";

/** Routes for user matches */

const express = require("express");
const jsonschema = require("jsonschema");

const { BadRequestError } = require("../expressError");
const {
  ensureCorrectUserOrAdmin,
  ensureAdmin,
  authenticateJWT,
  ensureCorrectUser,
  ensureLoggedIn,
} = require("../middleware/auth");
const UserMatches = require("../models/user");
const userMatchesNewSchema = require("../schemas/userMatches.json");
const userMatchesUpdateSchema = require("../schemas/userMatchesUpdate.json");

const router = new express.Router();

/** Get list of users that are potential friends for the current user. */

router.get("/", async function (req, res, next) {
  try {
    const userMatches = await UserMatches.findAll();
    return res.json({ userMatches });
  } catch (err) {
    return next(err);
  }
});

/** Potential friends are ones where:
 * - current user has not already liked/disliked
 * - other user has not already disliked
 * - other user has not already liked current user
 * - other user has at least one hobby in common with current user
 * - other user has at least one interest in common with current user
 *
 * If no potential friends are found, return JSON with empty array.
 * Authorization required: none
 *
 * @param {string} username - username of current user
 * @param {string} hobbies - hobbies of current user
 * @param {string} interests - interests of current user
 *
 * @returns {array} - array of potential friends for current user with the following properties:
 * - username
 * - city
 * - hobbies
 * - interests
 *
 * @example
 * GET /userMatches
 *
 * @example
 * {
 *  "userMatches": [
 *   { "username": "testuser1", "city": "San Francisco", "hobbies": "hiking, biking", "interests": "reading, music" },
 *  { "username": "testuser2", "city": "San Francisco", "hobbies": "biking, traveling", "interests": "gaming, dancing" }
 * ]
 * }
 */

module.exports = router;
