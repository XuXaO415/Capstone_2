const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

/** Common setup for all tests; add data to db. */

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");

  await db.query(
    `
        INSERT INTO users (first_name, last_name, username, password, email, is_admin)
        VALUES('Jane', 'Doe', 'jdoe', 'password', 'test@email.com', true),
                ('John', 'Doe', 'johndoe', 'password2', 'test2@email.com', false))
        RETURNING username`,
    [
      await bcrypt.hash("password", BCRYPT_WORK_FACTOR),
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
