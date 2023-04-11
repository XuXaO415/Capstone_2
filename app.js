"use strict";

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");

const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

app.use("/", usersRoutes);
app.use("/auth", authRoutes);
app.use("/auth/register", authRoutes);
app.use("/users", usersRoutes);
app.use("/users/:username", usersRoutes);
app.use("/users/username/:user_id", usersRoutes);
app.use("/users/:username/matches", usersRoutes);
app.use("/users/:username/matches/users", usersRoutes);
app.use("/users/:username/matches/:user_id", usersRoutes);
app.use("/users/:username/matches/user/:user_id", usersRoutes);
app.use("/users/:username/matches/likes", usersRoutes);
app.use("/users/:username/matches/like/:user_id", usersRoutes);
app.use("/users/:username/matches/dislike/:user_id", usersRoutes);

//Handles 404 errors
app.use(function (req, res, next) {
  const notFoundError = new NotFoundError();
  return next(notFoundError);
});

//Generic error handler
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: {
      message,
      status,
    },
  });
});

module.exports = app;
