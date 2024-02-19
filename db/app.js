const express = require("express");
const { getTopics } = require("./app.controller.js");

const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "route does not exist" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Server Error!");
});

module.exports = app;
