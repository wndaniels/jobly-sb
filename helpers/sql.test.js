const { sqlForPartialUpdate } = require("./sql");

describe("sqlForPartialUpdate", function () {
  test("success: 1 update", () => {
    const dataToUpdate = { firstName: "Testy" };
    const jsToSql = { firstName: "first_name", lastName: "last_name" };
    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);
    expect(result).toEqual({
      setCols: '"first_name"=$1',
      values: ["Testy"],
    });
  });
  test("success: 2 update", () => {
    const dataToUpdate = { firstName: "Test", lastName: "Tester" };
    const jsToSql = { firstName: "first_name", lastName: "last_name" };
    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);
    expect(result).toEqual({
      setCols: '"first_name"=$1, "last_name"=$2',
      values: ["Test", "Tester"],
    });
  });
});
