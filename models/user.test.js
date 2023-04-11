"use strict";

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const db = require("../db.js");
const User = require("./user");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** authenticate */

describe("authenticate", function () {
  test("works", async function () {
    const user = await User.authenticate("jdoe", "password1");
    expect(user).toEqual({
      username: "jdoe",
      firstName: "Jane",
      lastName: "Doe",
      email: "test@email.com",
      isAdmin: false,
    });
  });

  test("unauth if no such user", async function () {
    try {
      await User.authenticate("nope", "password");
      fail();
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });
});

test("throws UnauthorizedError if invalid password", async function () {
  try {
    await User.authenticate("jdoe", "wrongpassword");
    fail();
  } catch (err) {
    expect(err instanceof UnauthorizedError).toBeTruthy();
  }
});

test("throws UnauthorizedError if user is not authenticated", async function () {
  try {
    await User.authenticate("nope", "password");
  } catch (err) {
    expect(err instanceof UnauthorizedError).toBeTruthy();
  }
});

test("throws UnauthorizedError if invalid username", async function () {
  try {
    await User.authenticate("_nope_", "password");
  } catch (err) {
    expect(err instanceof UnauthorizedError).toBeTruthy();
  }
});

// /****************************** register */

describe("register", function () {
  test("works", async function () {
    let newUser = await User.register({
      username: "neuvoPersona",
      password: "neuevo123",
      firstName: "Neuvo",
      lastName: "User",
      email: "hello@gmail.com",
      city: "SF",
      state: "CA",
      zipCode: "94418",
      country: "US",
      latitude: "000000",
      longitude: "100000",
      imageUrl: null,
      hobbies: null,
      interests: null,
      isAdmin: false,
    });
  });

  test("throws BadRequestError on dupe", async function () {
    try {
      await User.register({
        username: "jdoe",
        password: "password1",
        firstName: "Jane",
        lastName: "Doe",
        email: "hello@email.com",
        isAdmin: false,
      });
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });

  test("works: adds a new user", async function () {
    const newUser = await User.register({
      username: "macDre",
      password: "newpassword",
      firstName: "Mac",
      lastName: "Dre",
      email: "newEmail@test.com",
      city: "SF",
      state: "CA",
      zipCode: "94110",
      country: "US",
      latitude: "000000",
      longitude: "100000",
      imageUrl: null,
      hobbies: null,
      interests: null,
      isAdmin: false,
    });
  });

  test("throws BadRequestError with dupe username", async function () {
    try {
      await User.register({
        username: "jdoe",
        password: "password1",
        firstName: "Jane",
        lastName: "Doe",
        email: "dupe@email.com",
        isAdmin: false,
      });
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** update */

describe("update", function () {
  test("works", async function () {
    const updateData = {
      firstName: "Jane",
      lastName: "Doe",
      email: "janedoe@thisworks.com",
    };
  });

  test("works with data", async function () {
    const updateData = {
      firstName: "Jane",
      lastName: "Smith",
      email: "new@email.com",
    };
    let user = await User.update("jdoe", updateData);
    expect(user).toEqual({
      username: "jdoe",
      ...updateData,
      isAdmin: false,
    });
  });

  test("throws NotFoundError if user not found", async function () {
    try {
      await User.update("nonexistentuser", {
        firstName: "Jane",
        lastName: "Doeee",
        email: "test@email.com",
      });
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

test("bad request with no data", async function () {
  try {
    await User.update("jdoe", {});
    fail();
  } catch (err) {
    expect(err instanceof BadRequestError).toBeTruthy();
  }
});

test("not found if no such user", async function () {
  try {
    await User.update("nope", {
      firstName: "Unknown",
      lastName: "User",
    });
    fail();
  } catch (err) {
    expect(err instanceof NotFoundError).toBeTruthy();
  }
});

/************************************** remove */

describe("remove", function () {
  test("works", async function () {
    await User.remove("jdoe");
    const res = await db.query(
      "SELECT username FROM users WHERE username='jdoe'"
    );
    expect(res.rows.length).toEqual(0);
  });
});

test("throws NotFoundError if user not found", async function () {
  try {
    await User.remove("nonexistentuser");
  } catch (err) {
    expect(err instanceof NotFoundError).toBeTruthy();
  }
});

test("not found if no such user", async function () {
  try {
    await User.remove("nope");
    fail();
  } catch (err) {
    expect(err instanceof NotFoundError).toBeTruthy();
  }
});
