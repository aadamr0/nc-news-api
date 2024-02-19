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
  describe('Given incorrect route:', () => {
    it('Returns status 404 and error message.', () => {
        return request(app).get('/api/invalidroute').expect(404)
        .then((response) => {
            // console.log(response);
            expect(response.body.msg).toBe('route does not exist')
        })
    });
  });
});
