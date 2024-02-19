const { selectTopics } = require("./app.models.js");

function getTopics(req, res, next) {
    //call select topics an send, pass any error with next
    selectTopics()
    .then((results) => {
        console.log(results);
        res.status(200).send(results)
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = {
  getTopics,
};
