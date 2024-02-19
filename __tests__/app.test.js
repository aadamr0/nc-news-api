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

describe("GET api/topics", () => {
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

describe("Get: /api", () => {
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

describe("Get: /api/articles/:article_id", () => {
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
