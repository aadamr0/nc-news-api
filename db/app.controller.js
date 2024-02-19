const { selectTopics, selectApis } = require("./app.models.js");

function getTopics(req, res, next) {
    //call select topics an send, pass any error with next
    selectTopics()
    .then((topicsArray) => {
        res.status(200).send(topicsArray)
    })
    .catch((err) => {
        next(err)
    })
}

function getApi(req, res, next){
    // select from list of api endpoints json file
    selectApis().then((apiObj) => {
        res.status(200).send(apiObj)
    })
}

module.exports = {
  getTopics,
  getApi
};
