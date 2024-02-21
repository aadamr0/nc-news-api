const db = require("../connection.js");

function selectCommentsByArticleId(article_id) {
  const promises = [];
  promises.push(
    db.query(
      `SELECT * FROM comments
    WHERE article_id=$1
    ORDER BY created_at ASC`,
      [article_id]
    )
  );
  promises.push(
    db.query(
      `SELECT * FROM articles
  WHERE article_id=$1`,
      [article_id]
    )
  );
  return Promise.all(promises)
  .then((results) => {
    // is this the correct way to do it?
    if (!results[0].rows.length && !results[1].rows.length) {
      return Promise.reject({status: 404, msg: 'resource does not exist'})
    } else {
      return results[0].rows
    }
  })
}

function insertCommentByArticleId(article_id, username, body) {
  console.log("hello");
  console.log(article_id, username, body);
  return Promise.resolve({ status: 200, msg: "resolved" });
}

module.exports = { selectCommentsByArticleId, insertCommentByArticleId };
