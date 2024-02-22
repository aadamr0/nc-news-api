const db = require("../connection.js");

function selectArticleById(article_id) {
  return db
    .query(
      `SELECT * FROM articles
  WHERE article_id = $1`,
      [article_id]
    )
    .then((article) => {
      if (article.rows.length) return article.rows[0];
      else return Promise.reject({ status: 404, msg: "route does not exist" });
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

function selectArticles() {
  // aim: return articles with no body and a comments count
  // to get information from 2 tables in 1 query you must join them
  // group by: ?
  return db
    .query(
      `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.*) AS comment_count FROM articles
    JOIN comments ON comments.article_id=articles.article_id
    GROUP BY articles.article_id
    ORDER BY created_at DESC;
    `
    )
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err);
    });
}

function updateArticleVotes(article_id, inc_votes) {
  return db
    .query(`SELECT * FROM articles WHERE article_id=$1`, [article_id])
    .then((result) => {
      if (!result.rows.length) {
        return Promise.reject({ status: 404, msg: "resource does not exist" });
      }
    })
    .then(() => {
      return db.query(
        `UPDATE articles SET votes=$1 WHERE article_id=$2 RETURNING *;`,
        [inc_votes, article_id]
      );
    })
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

module.exports = { selectArticleById, selectArticles, updateArticleVotes };
