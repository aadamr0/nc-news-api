const {selectArticleById, selectArticles} = require("../models/articles.model");

function getArticleById(req, res, next) {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then((article) => {
      res.status(200).send(article);
    })
    .catch((err) => {
      next(err);
    });
}

function getArticles(req, res, next) {
  selectArticles().then((articlesArray) => {
    res.status(200).send({ articlesArray });
    // 500 status error means nothing is being sent - controller not sending anything... problem in model
  });
}

module.exports = { getArticleById, getArticles };
