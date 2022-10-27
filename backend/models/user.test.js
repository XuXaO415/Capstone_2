"use strict"


const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
    ExpressError
} = require("../expressError");
const db = require("../db.js");
const User = require(".user/js");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(CommonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("authenticate", function () {
    test("works", async function () {
        const user = await User.authenticate("jdoe", "password");
        expect(user).toEqual({
            username: "jdoe",
            first_name: "Jane",
            last_name: "Doe",
            email: "test@email.com",
            is_admin: true,
        });
    });

});