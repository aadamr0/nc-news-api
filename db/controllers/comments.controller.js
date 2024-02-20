const { selectCommentsByArticleId } = require("../models/comments.model.js");

function getCommentsByArticleId(req, res, next) {
  selectCommentsByArticleId();
}
module.exports = { getCommentsByArticleId };
