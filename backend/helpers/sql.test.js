const { sqlForPartialUpdate } = require("./sql");

describe("sqlForPartialUpdate", function () {
  test("works: 1 item", function () {
    const result = sqlForPartialUpdate(
      { firstName: "Mac", lastName: "Dre" },
      {
        firstName: "first_name",
        lastName: "last_name",
        isAdmin: "is_admin",
      }
    );
    expect(result).toEqual({
      setCols: '"first_name"=$1, "last_name"=$2',
      values: ["Mac", "Dre"],
    });
  });
});

test("works: 2 items", function () {
  const result = sqlForPartialUpdate(
    { firstName: "Mac", lastName: "Dre", isAdmin: true },
    {
      firstName: "first_name",
      lastName: "last_name",
      isAdmin: "is_admin",
    }
  );
  expect(result).toEqual({
    setCols: '"first_name"=$1, "last_name"=$2, "is_admin"=$3',
    values: ["Mac", "Dre", true],
  });
});
