const { selectCommentsByArticleId, insertCommentByArticleId } = require("../models/comments.model.js");

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

function postCommentByArticleId(req, res, next) {
  const article_id = req.params;
  const body = req.body;
  // console.log(article_id, body);
  insertCommentByArticleId(article_id, username, body)
}

module.exports = { getCommentsByArticleId, postCommentByArticleId };
