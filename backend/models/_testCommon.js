const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");

  await db.query(
    `INSERT INTO users(username, password, first_name, last_name, email, city, state, zip_code, country, latitude, longitude, image_url, hobbies, interests)
        VALUES('jdoe', $1, 'Jane', 'Doe', 'test@email.com', 'SF', 'CA', '94110', 'US', '000000', '000000', NULL,  NULL, NULL),
              ('newuser', $2, 'New', 'User', 'test2@email.com', 'Oakland', 'CA', '94601', 'US', '100000', '100000', NULL,  NULL, NULL)
        RETURNING username`,
    [
      await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
      await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
    ]
  );
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
};
