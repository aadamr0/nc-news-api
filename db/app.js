const express = require("express");
const { getTopics } = require("./controllers/topics.controller.js");
const { getApi } = require("./controllers/api.controller.js");
const {
  getArticleById,
  getArticles,
} = require("./controllers/articles.controller.js");
const { getCommentsByArticleId } = require("./controllers/comments.controller.js");

const app = express();

app.get("/api/topics", getTopics);

app.get("/api", getApi);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getArticles);

app.get("/api/:article_id/comments", getCommentsByArticleId);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "route does not exist" });
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "bad request" });
  }
  next(err);
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
  next(err);
});

app.use((err, req, res, next) => {
  res.status(500).send("Server Error!");
});

module.exports = app;
