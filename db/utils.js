const format = require("pg-format");
const db = require("./connection.js");

function checkExists(table, column, value) {
  let queryStr = format(`SELECT * FROM %I WHERE %I=$1`, table, column);

  return db.query(queryStr, [value]).then((result) => {
    if (result.rows.length === 0) {
      return false;
      return Promise.reject({ status: 400, msg: "bad request" });
    }
    return true;
  });
}

module.exports = checkExists;
