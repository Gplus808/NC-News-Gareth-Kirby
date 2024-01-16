const request = require("supertest");
const db = require("./db/connection")
const app = require("./app")
const seed = require("./db/seeds/seed")
const testData = require("./db/data/test-data")
const fs = require('fs').promises;
const endPoints = require("./endPoints")


beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('/api/topics', () => {
    test('GET:200 sends an array of topic objects to the client', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then((response) => {
            expect(response.body.topics.length).toBe(3);
            response.body.topics.forEach((topic) => {
                expect(typeof topic.description).toBe('string');
                expect(typeof topic.slug).toBe('string');
            });
        });
    });
});

describe('/api/', () => {
    test('GET:200 returns an object describing all the available endpoints on your API', () => {
      return request(app)
      .get('/api/')
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(endPoints)
        })
        .catch((err) => {
          console.error('Error', err);
          return err;
    });
      })
});
