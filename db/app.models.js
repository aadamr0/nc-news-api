const fs = require("fs/promises");
const db = require('./connection.js')

function selectTopics() {
  // use psql to get data.
  return db.query(`SELECT * FROM topics`)
  .then((results) => {
    return results.rows
  })
}

function selectApis() {
  return fs.readFile(`${__dirname}/../endpoints.json`, 'utf-8')
  .then((results) => {
    return JSON.parse(results)
  })
  .catch((err) => {
    console.log(err)
    return err
  })
}


module.exports = { selectTopics, selectApis };
