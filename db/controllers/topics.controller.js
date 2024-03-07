const { selectTopics } = require("../models/topics.model.js");

function getTopics(req, res, next) {
  selectTopics()
    .then((topicsArray) => {
      res.status(200).send(topicsArray);
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getTopics };
