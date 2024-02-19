const fs = require("fs/promises");
const db = require('./connection.js')

function selectTopics() {
  // use psql to get data.
  return db.query(`SELECT * FROM topics`)
  .then((results) => {
    return results.rows
  })
}


module.exports = { selectTopics };
