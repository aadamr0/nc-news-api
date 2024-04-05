const {
  selectCommentsByArticleId,
  insertCommentByArticleId,
  deleteCommentFromDb,
} = require("../models/comments.model.js");

function getCommentsByArticleId(req, res, next) {
  //call articles model get article by id. run multiple promises, ues promise.all in the contorller. and write a test for it.
  const { article_id } = req.params;
  selectCommentsByArticleId(article_id)
    .then((commentsArray) => {
      res.status(200).send({ commentsArray });
    })
    .catch((err) => {
      next(err);
    });
}

function postCommentByArticleId(req, res, next) {
  const { article_id } = req.params;
  const { username, body } = req.body;

  insertCommentByArticleId(article_id, username, body)
    .then((commentObj) => {
      res.status(201).send({ commentObj });
    })
    .catch((err) => {
      next(err);
    });
}

function deleteCommentById(req, res, next) {
  const {comment_id} = req.params
  deleteCommentFromDb(comment_id).then(() => {
    res.status(204).send({});
  })
  .catch((err) => {
    next(err)
  })
}

module.exports = {
  getCommentsByArticleId,
  postCommentByArticleId,
  deleteCommentById,
};
