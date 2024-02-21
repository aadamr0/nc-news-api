const { selectCommentsByArticleId } = require("../models/comments.model.js");

function getCommentsByArticleId(req, res, next) {
  const {article_id} = req.params
  selectCommentsByArticleId(article_id)
  .then((commentsArray) => {
    res.status(200).send({commentsArray})
  })
  .catch((err) => {
    next(err)
  })
}
module.exports = { getCommentsByArticleId };
