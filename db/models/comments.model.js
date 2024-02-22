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
  return Promise.all(promises).then((results) => {
    // is this the correct way to do it?
    if (!results[0].rows.length && !results[1].rows.length) {
      return Promise.reject({ status: 404, msg: "resource does not exist" });
    } else {
      return results[0].rows;
    }
  });
}

function insertCommentByArticleId(article_id, username, body) {
  if (!article_id || !username || !body) {
    return Promise.reject({ status: 400, msg: "bad request" });
  }
  // why can't we put something equivalent to this ^ in the controller? doesn't seem to work.

  return db
    .query(
      `INSERT INTO comments (body, article_id, author)
  VALUES ($1, $2, $3)
  RETURNING *`,
      [body, article_id, username]
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

function deleteCommentFromDb(comment_id) {
  //cehck if comment id is in range
  return db
    .query(`SELECT * FROM comments WHERE comment_id=$1`, [comment_id])
    .then((result) => {
      if (!result.rows.length) {
        return Promise.reject({ status: 404, msg: "not found" });
      }
    })
    .then(() => {
      return db.query(`DELETE FROM comments where comment_id=$1`, [comment_id]);
    });
}

module.exports = {
  selectCommentsByArticleId,
  insertCommentByArticleId,
  deleteCommentFromDb,
};
