const { selectApis } = require('../models/api.model.js')

function getApi(req, res, next) {
  selectApis().then((apiObj) => {
    res.status(200).send({ apiObj });
  });
}

module.exports = {getApi}