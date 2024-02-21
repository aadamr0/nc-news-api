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
describe("GET /api/:article_id/comments", () => {
  it("should respond with an array of comments for the given article_id", () => {
    return request(app)
      .get("/api/1/comments")
      .expect(200)
      .then((response) => {
        expect(response.body.commentsArray).toEqual([
          {
            comment_id: 9,
            body: "Superficially charming",
            article_id: 1,
            author: "icellusedkars",
            votes: 0,
            created_at: "2020-01-01T03:08:00.000Z",
          },
          {
            comment_id: 4,
            body: " I carry a log — yes. Is it funny to you? It is not to me.",
            article_id: 1,
            author: "icellusedkars",
            votes: -100,
            created_at: "2020-02-23T12:01:00.000Z",
          },
          {
            comment_id: 3,
            body: "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
            article_id: 1,
            author: "icellusedkars",
            votes: 100,
            created_at: "2020-03-01T01:13:00.000Z",
          },
          {
            comment_id: 12,
            body: "Massive intercranial brain haemorrhage",
            article_id: 1,
            author: "icellusedkars",
            votes: 0,
            created_at: "2020-03-02T07:10:00.000Z",
          },
          {
            comment_id: 6,
            body: "I hate streaming eyes even more",
            article_id: 1,
            author: "icellusedkars",
            votes: 0,
            created_at: "2020-04-11T21:02:00.000Z",
          },
          {
            comment_id: 8,
            body: "Delicious crackerbreads",
            article_id: 1,
            author: "icellusedkars",
            votes: 0,
            created_at: "2020-04-14T20:19:00.000Z",
          },
          {
            comment_id: 7,
            body: "Lobster pot",
            article_id: 1,
            author: "icellusedkars",
            votes: 0,
            created_at: "2020-05-15T20:19:00.000Z",
          },
          {
            comment_id: 13,
            body: "Fruit pastilles",
            article_id: 1,
            author: "icellusedkars",
            votes: 0,
            created_at: "2020-06-15T10:25:00.000Z",
          },
          {
            comment_id: 18,
            body: "This morning, I showered for nine minutes.",
            article_id: 1,
            author: "butter_bridge",
            votes: 16,
            created_at: "2020-07-21T00:20:00.000Z",
          },
          {
            comment_id: 2,
            body: "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
            article_id: 1,
            author: "butter_bridge",
            votes: 14,
            created_at: "2020-10-31T03:03:00.000Z",
          },
          {
            comment_id: 5,
            body: "I hate streaming noses",
            article_id: 1,
            author: "icellusedkars",
            votes: 0,
            created_at: "2020-11-03T21:00:00.000Z",
          },
        ]);
      });
  });
  it("should respond with 404 and error message when request for nonexistant resource ", () => {
    return request(app)
    .get('/api/10000/comments')
    .expect(404)
    .then((response) => {
      expect(response.body.msg).toBe('resource does not exist')
    })
  });
  it('should respond with 400 error if given an invalid (type of) id', () => {
    return request(app)
    .get('/api/invalidrequest/comments')
    .expect(400)
    .then((response) => {
      expect(response.body.msg).toBe('bad request')
    })
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
