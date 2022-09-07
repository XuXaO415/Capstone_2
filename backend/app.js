"use strict"

const express = require("express");
const cors = require("cors");

const {
    NotFoundError
} = require("./expressError");

const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

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
            status
        },
    });
});

module.exports = app;