const express = require("express");
const { getTopics } = require("./controllers/topics.controller.js");
const { getApi } = require("./controllers/api.controller.js");
const {
  getArticleById,
  getArticles,
  patchArticleByArticleId,
} = require("./controllers/articles.controller.js");
const {
  getCommentsByArticleId,
  postCommentByArticleId,
  deleteCommentById,
} = require("./controllers/comments.controller.js");

const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api", getApi);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postCommentByArticleId);

app.patch("/api/articles/:article_id", patchArticleByArticleId);

app.delete("/api/comments/:comment_id", deleteCommentById);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "route does not exist" });
});

app.use((err, req, res, next) => {
  if (err.code === "22P02" || err.code === "23503" || err.code === "23502") {
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
