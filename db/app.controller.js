const { selectTopics } = require('./app.models.js')

function getTopics(req, res, next) {
  const topics = selectTopics()
  res.status(200).send(topics)

  //not sure about error handling here?^
}

module.exports = {
  getTopics,
};
