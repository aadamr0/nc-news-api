const request = require("supertest");
const app = require("../db/app.js");
const seed = require("../db/seeds/seed.js");
const {
  topicData,
  userData,
  articleData,
  commentData,
} = require("../db/data/test-data/index.js");
const db = require("../db/connection.js");

beforeEach(() => seed({ topicData, userData, articleData, commentData }));
afterAll(() => db.end());

describe("GET /api/topics", () => {
  describe("Given correct route:", () => {
    it("Returns status 200", () => {
      return request(app).get("/api/topics").expect(200);
    });
    it("Returns a list of all topics in the form of an objects array", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual([
            {
              description: "The man, the Mitch, the legend",
              slug: "mitch",
            },
            {
              description: "Not dogs",
              slug: "cats",
            },
            {
              description: "what books are made of",
              slug: "paper",
            },
          ]);
        });
    });
  });
});
describe("GET /api", () => {
  it("should respond with list of endpoints and information", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        for (const api in response.body.apiObj) {
          expect("description" in response.body.apiObj[api]).toBe(true);
          expect("queries" in response.body.apiObj[api]).toBe(true);
          expect("exampleResponse" in response.body.apiObj[api]).toBe(true);
          expect("requestFormat" in response.body.apiObj[api]).toBe(true);
        }
      });
  });
});
describe("GET /api/articles/:article_id", () => {
  it("should respond with status 200 and the article requested by id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 100,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });
  it("should respond with status 400 if given an invalid ID (eg of type string)", () => {
    return request(app)
      .get("/api/articles/seven")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });
  it("should respond with status 404 if given an id outside the available range", () => {
    return request(app)
      .get("/api/articles/200")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("route does not exist");
      });
  });
});
describe("GET /api/articles", () => {
  it("should respond with a list of all articles, ommitting their body", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        if (response.body.articlesArray.length) {
          // test data types also
          expect("author" in response.body.articlesArray[0]).toBe(true);
          expect("title" in response.body.articlesArray[0]).toBe(true);
          expect("article_id" in response.body.articlesArray[0]).toBe(true);
          expect("topic" in response.body.articlesArray[0]).toBe(true);
          expect("created_at" in response.body.articlesArray[0]).toBe(true);
          expect("votes" in response.body.articlesArray[0]).toBe(true);
          expect("article_img_url" in response.body.articlesArray[0]).toBe(
            true
          );
          expect("comment_count" in response.body.articlesArray[0]).toBe(true);
        }
      });
  });
  it("should sort articles in order of date descending", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        expect(response.body.articlesArray).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
});
describe("GET /api/articles/:article_id/comments", () => {
  it("should respond with an array of comments for the given article_id", () => {
    return request(app)
      .get("/api/articles/3/comments")
      .expect(200)
      .then((response) => {
        response.body.commentsArray.forEach((comment) => {
          expect(comment.hasOwnProperty("comment_id")).toBe(true);
          expect(typeof comment.comment_id).toBe("number");
          expect(comment.hasOwnProperty("body")).toBe(true);
          expect(typeof comment.body).toBe("string");
          expect(comment.hasOwnProperty("article_id")).toBe(true);
          expect(typeof comment.article_id).toBe("number");
          expect(comment.hasOwnProperty("author")).toBe(true);
          expect(typeof comment.author).toBe("string");
          expect(comment.hasOwnProperty("votes")).toBe(true);
          expect(typeof comment.votes).toBe("number");
          expect(comment.hasOwnProperty("created_at")).toBe(true);
          expect(typeof comment.created_at).toBe("string");
        });
      });
  });
  it("should respond with status 404 and an error message when request is for nonexistant resource ", () => {
    return request(app)
      .get("/api/articles/10000/comments")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("resource does not exist");
      });
  });
  it("should respond with status 400 if given an invalid (type of) article_id", () => {
    return request(app)
      .get("/api/articles/invalidrequest/comments")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });
  it("should respond with status 200 and an empty array when requested article has no comments", () => {
    return request(app)
      .get("/api/articles/7/comments")
      .expect(200)
      .then((response) => {
        expect(response.body.commentsArray).toHaveLength(0);
      });
  });
});
describe("POST /api/articles/:article_id/comments", () => {
  it("adds a comment to an article, responding with the comment", () => {
    const newComment = {
      username: "butter_bridge", //must exist (be valid user from users table)
      body: "body1",
    };
    return request(app)
      .post("/api/articles/3/comments")
      .send(newComment)
      .expect(201)
      .then((res) => {
        expect(res.body.commentObj.author).toBe("butter_bridge");
        expect(res.body.commentObj.body).toBe("body1");
      });
  });
  it("should return status 400 and error msg when given malformed body", () => {
    const newComment = {
      body: "body1",
    };
    return request(app)
      .post("/api/articles/3/comments")
      .send(newComment)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("bad request");
      });
  });
  it("should return status 400 when given a valid body with inappropriate values (faliing schema validation)", () => {
    const newComment = {
      username: 2,
      body: "body1",
    };
    return request(app)
      .post("/api/articles/3/comments")
      .send(newComment)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("bad request");
      });
  });
});
describe("PATCH /api/articles/:article_id", () => {
  it("update an article by article_id, changing its number of votes, responsing with the updated article", () => {
    const update = { inc_votes: 100 };
    return request(app)
      .patch("/api/articles/3")
      .send(update)
      .expect(200)
      .then((res) => {
        expect(res.body.article.votes).toBe(100);
      });
  });
  it("should return status 400 and error msg when given malformed body", () => {
    const update = {
      body: "body1",
    };
    return request(app)
      .patch("/api/articles/3")
      .send(update)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("bad request");
      });
  });
  it("should return status 400 when given a valid body with inappropriate values (faliing schema validation)", () => {
    const update = { inc_votes: "seven" };
    return request(app)
      .patch("/api/articles/3")
      .send(update)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("bad request");
      });
  });
});
describe("DELETE /api/comments/:comment_id", () => {
  it("should delete the comment given by comment_id, responding with status 204 and no content", () => {
    const comment_id = 4;
    return request(app)
      .delete(`/api/comments/${comment_id}`)
      .expect(204)
      .then((res) => {
        expect(res.body).toEqual({});
      })
      .then(() => {
        return db.query(`SELECT * FROM comments`);
      })
      .then((results) => {
        results.rows.forEach((comment) => {
          expect(comment.comment_id).not.toBe(comment_id);
        });
      });
  });
  it("should respond with status 404 if given out-of-range comment_id", () => {
    return request(app)
      .delete("/api/comments/4000")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("not found");
      });
  });
  it("should respond with status 400 if given invalid type of arg for comment_id", () => {
    return request(app)
      .delete("/api/comments/seven")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("bad request");
      });
  });
});
describe("Non existant URL reponds with 404 error", () => {
  it("Returns status 404 and error message.", () => {
    return request(app)
      .get("/api/invalidroute")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("route does not exist");
      });
  });
});
