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
  const {article_id} = req.params
  const {username, body} = req.body
  

  insertCommentByArticleId(article_id, username, body)
  .then((commentObj) => {
    res.status(201).send({commentObj})
  })
  .catch((err) => {
    next(err)
  })
}

module.exports = { getCommentsByArticleId, postCommentByArticleId };
