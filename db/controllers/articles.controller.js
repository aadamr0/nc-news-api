const {
  selectArticleById,
  selectArticles,
  updateArticleVotes,
} = require("../models/articles.model");

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

function patchArticleByArticleId(req, res, next) {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  updateArticleVotes(article_id, inc_votes)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      console.log(err, "err passed to controller");
      next(err);
    });
}

module.exports = { getArticleById, getArticles, patchArticleByArticleId };
