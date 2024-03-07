const db = require("../connection.js");

function selectTopics() {
  return db.query(`SELECT * FROM topics`).then((results) => {
    return results.rows;
  });
}

module.exports = {selectTopics}