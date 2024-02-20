const {
  selectTopics,
  selectApis,
  selectArticleById,
  selectArticles,
} = require("./app.models.js");

function getTopics(req, res, next) {
  //call select topics an send, pass any error with next
  selectTopics()
    .then((topicsArray) => {
      res.status(200).send(topicsArray);
    })
    .catch((err) => {
      next(err);
    });
}

function getApi(req, res, next) {
  selectApis().then((apiObj) => {
    res.status(200).send({ apiObj });
  });
}

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
  });
}

module.exports = {
  getTopics,
  getApi,
  getArticleById,
  getArticles,
};
