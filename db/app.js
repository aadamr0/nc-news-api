const express = require("express");
const { getTopics } = require("./app.controller.js");

const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);

app.use((err, req, res, next) => {
    console.log(err);
})

module.exports = app