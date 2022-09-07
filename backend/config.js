"use strict"

require("colors");

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";

const PORT = +process.env.PORT || 3001;

function getDatabaseUri() {
    return (process.env.NODE_ENV === "test") ?
        "urguide_test" :
        process.env.DATABASE_URL || "urguide";
}

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

console.log("urGuide Config:".green);
console.log("SECRET_KEY:".red, SECRET_KEY);
console.log("PORT:".red, PORT.toString());
console.log("BCRYPT_WORK_FACTOR:".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".red, getDatabaseUri());
console.log("----------------------------------");

module.exports = {
    SECRET_KEY,
    PORT,
    getDatabaseUri,
    BCRYPT_WORK_FACTOR,
};