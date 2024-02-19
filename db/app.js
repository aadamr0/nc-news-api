const express = require("express");
const { getTopics, getApi } = require("./app.controller.js");

const app = express();

app.get("/api/topics", getTopics);

app.get("/api", getApi);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "route does not exist" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Server Error!");
});

module.exports = app;
