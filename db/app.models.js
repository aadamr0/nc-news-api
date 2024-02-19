const fs = require('fs/promises')

function selectTopics() {
    // is this the right way to read the correct file? It doesn't look like I can hard code the path to the data, because it will change for testing / development... but I don't remember doing anything like this previously...
    

    return require(`${__dirname}/data/${process.env.NODE_ENV}-data/topics.js`)

    // return fs.readFile(`${__dirname}/data/${process.env.NODE_ENV}-data/topics.js`, 'utf8', (err, data) => {
    //     console.log(data, 'data'); // also - why isn't this logging?
    // })
    // .then((results) => {
    //     console.log(JSON.parse(results), 'parsed');
    //     return JSON.parse(results)
    // })
    // .catch((err) => {
    //     console.log(err, 'err in selectTopics()');
    //     return err
    // })
}

module.exports = { selectTopics }