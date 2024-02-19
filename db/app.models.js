const fs = require("fs/promises");
const db = require("./connection.js");
const pg = require("pg");

function selectTopics() {
  // use psql to get data.
  return db.query(`SELECT * FROM topics`).then((results) => {
    return results.rows;
  });
}

function selectApis() {
  return fs
    .readFile(`${__dirname}/../endpoints.json`, "utf-8")
    .then((results) => {
      return JSON.parse(results);
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

function selectArticleById(article_id) {
  return db
    .query(
      `SELECT * FROM articles
  WHERE article_id = $1`,
      [article_id]
    )
    .then((article) => {
      if (article.rows.length) return article.rows[0];
      else return Promise.reject({status: 404, msg: 'route does not exist'})
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

module.exports = { selectTopics, selectApis, selectArticleById };
