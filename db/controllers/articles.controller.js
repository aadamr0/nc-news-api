const {
  selectArticleById,
  selectArticles,
  updateArticleVotes,
} = require("../models/articles.model");
const { selectTopics } = require("../models/topics.model");

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
  const { topic } = req.query;
  const promises = [];
  if (!topic) {
    selectArticles()
    .then((articlesArray) => {
      res.status(200).send({articlesArray})
    })
    .catch((err) => {
      next(err)
    })
  } else {
    promises.push(selectTopics());
    
    promises.push(selectArticles(topic));
  
    Promise.all(promises).then((results) => {
      const topicExists = !results[0].every(
        (topicObj) => topicObj.slug !== topic
      );
      const articlesArray = results[1];
  
      if (!topicExists && results[1].length === 0) {
        next({ status: 400, msg: "bad request" });
      } else {
        res.status(200).send({ articlesArray });
      }
    });
  }
}

function patchArticleByArticleId(req, res, next) {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  updateArticleVotes(article_id, inc_votes)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getArticleById, getArticles, patchArticleByArticleId };
