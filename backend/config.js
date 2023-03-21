"use strict";

require("dotenv").config();
require("colors");

// const { Pool } = require("pg");

// const pool = new Pool({
//   user: "testuser",
//   host: "localhost",
//   database: "urguide_test",
//   password: "123123123",
//   port: 5000,
// });

async function seed() {
  const sql = fs.readFileSync("./urguide-seed.sql").toString();
  await pool.query(sql);
}

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";

const PORT = +process.env.PORT || 3001;

function getDatabaseUri() {
  return process.env.NODE_ENV === "test"
    ? "urguide_test"
    : process.env.DATABASE_URL || "urguide";
}

const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://localhost:5000/urguide_test";

const BCRYPT_WORK_FACTOR = process.env.BCRYPT_WORK_FACTOR || 12;

// const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

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
  DATABASE_URL,
  BCRYPT_WORK_FACTOR,
  seed,
};
