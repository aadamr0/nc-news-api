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
      else return Promise.reject({ status: 404, msg: "route does not exist" });
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

function selectArticles() {
  // aim: return articles with no body and a comments count

  const articlesPromise = db
    .query(
      `SELECT author, title, article_id, topic, created_at, votes, article_img_url FROM articles
      ORDER BY created_at DESC`
    )
    .then((results) => results.rows);

  const commentCountsPromise = db
    .query(`SELECT article_id FROM articles`)
    .then((results) => {
      //get array of article ids
      return results.rows.map((article_id_obj) => {
        return article_id_obj.article_id;
      });
    })
    .then((articleIdsArr) => {
      //iterate over, making getting information on each comment thread
      const commentsById = [];
      for (const articleId of articleIdsArr) {
        commentsById.push(
          db
            .query(`SELECT * FROM comments WHERE article_id=$1`, [articleId])
            .then((comments) => comments.rows)
        );
      }
      return Promise.all(commentsById);
    })
    .then((commentThreads) => {
      const commentCounts = [];
      for (let i = 1; i < commentThreads.length; i++) {
        commentCounts.push({
          articleId: i,
          commentCount: commentThreads[i - 1].length,
        });
      }
      return commentCounts;
    });

  return Promise.all([articlesPromise, commentCountsPromise]).then(
    (results) => {
      const selectedArticles = [];
      for (let i = 0; i < results[0].length; i++) {
        //for every article
        for (let c = 0; c < results[1].length; c++) {
          // for every commentCount
          if (results[0][i].article_id === results[1][c].articleId) {
            // if article ids match
            // add the comment count property
            // push into selectedArticles (array to be returned)
            // console.log(results[0][i], results[1][c]);
            results[0][i].comment_count = results[1][c].commentCount;
            selectedArticles.push(results[0][i]);
          }
        }
      }
      return selectedArticles;
    }
  );
}

module.exports = {
  selectTopics,
  selectApis,
  selectArticleById,
  selectArticles,
};
