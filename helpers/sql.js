const { BadRequestError } = require("../expressError");

// Helper function that builds a SQL query for matched schema data.
// If data passed does match or is null, ExpressError is thrown
//
// e.g. dataToUpdate = {"firstName": "Testy", "lastName": "Tester"} => JS to newValue
// e.g. jsToSql = {"firstName": "first_name", "lastName": "last_name"} => JS to SQL col
//
// e.g. return {
//    setCols: '"first_name"=$1, "last_name"=$2',
//    values: ["Test", "Tester"],
// }

module.exports = { sqlForPartialUpdate };

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map(
    (colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
