const {selectTopics} = require('../models/topics.model.js')

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

module.exports = {getTopics}