const fs = require("fs/promises");

function selectApis() {
  return fs
    .readFile(`${__dirname}/../../endpoints.json`, "utf-8")
    .then((results) => {
      return JSON.parse(results);
    })
    .catch((err) => {
      return err;
    });
}

module.exports = { selectApis };
