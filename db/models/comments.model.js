const db = require("../connection.js");

function selectCommentsByArticleId(article_id) {
  return db
    .query(
      `SELECT * FROM comments
    WHERE article_id=$1
    ORDER BY created_at ASC`,
      [article_id]
    )
    .then((result) => {
        if (!result.rows.length) {
            return Promise.reject({status: 404, msg: 'resource does not exist'})
        }
      return result.rows;
    })

}

module.exports = { selectCommentsByArticleId };
