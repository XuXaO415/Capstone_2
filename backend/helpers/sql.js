const { BadRequestError } = require("../expressError");

/** Helper for making selective update queries.
 *
 * The calling function can use it to make the SET clause of an SQL UPDATE statement.
 *
 * @param dataToUpdate {Object} {field1: newVal, field2: newVal, ...}
 * @param jsToSql {Object} maps js-style data fields to database column names,
 *  like { firstName: "first_name", city: "city" }
 *
 * @returns {Object} {sqlSetCols, dataToUpdate}
 *
 * @example {firstName: 'Chrissy', city; 'Oakland'} =>
 *  {setCols: '"first_name"=$1, "city"=$2',
 *  values: ['Chrissy', 'Oakland']}
 *
 */

// function sqlForPartialUpdate(dataToUpdate, jsToSql) {
//   const keys = Object.keys(dataToUpdate);
//   if (keys.length === 0) throw new BadRequestError("No data");

//   const cols = keys.map(
//     (colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`
//   );

//   return {
//     setCols: cols.join(", "),
//     values: Object.values(dataToUpdate),
//   };
// }

// function addUserId(user_id, dataToUpdate, jsToSql) {
//   const updateData = {
//     user_id,
//   };

//   const toSql = {
//     user_id: "user_id",
//   };

//   const sqlData = sqlForPartialUpdate(updateData, toSql);

//   return {
//     setCols: sqlData.setCols,
//     values: [...sqlData.values, ...dataToUpdate.values],
//   };
// }

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Chrissy', city; 'Oakland'} => ['"first_name"=$1', '"city"=$2']
  const cols = keys.map(
    (colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = {
  sqlForPartialUpdate,
};
