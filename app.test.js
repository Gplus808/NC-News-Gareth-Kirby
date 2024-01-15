const request = require("supertest");
const db = require("./db/connection")

const app = require("./app")
const seed = require("./db/seeds/seed")
const testData = require("./db/data/test-data")

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('/api/topics', () => {
    test('GET:200 sends an array of topic objects to the client', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then((response) => {
            console.log(response.body.topics)
            expect(response.body.topics.length).toBe(3);
            response.body.topics.forEach((topic) => {
                expect(typeof topic.description).toBe('string');
                expect(typeof topic.slug).toBe('string');
            });
        });
    });
});