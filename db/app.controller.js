const {
  selectTopics,
  selectApis,
  selectArticleById,
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
  // select from list of api endpoints json file
  selectApis().then((apiObj) => {
    console.log(apiObj);
    res.status(200).send({apiObj});
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

module.exports = {
  getTopics,
  getApi,
  getArticleById,
};
