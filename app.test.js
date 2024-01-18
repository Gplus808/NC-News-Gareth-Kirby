const request = require("supertest");
const db = require("./db/connection")
const app = require("./app")
const seed = require("./db/seeds/seed")
const data = require("./db/data/test-data/index.js")
const endPoints = require("./endPoints")
require("jest-extended/all")
require('jest-sorted');


beforeEach(() => seed(data));
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
    test('Returns status 200 and an object describing all the available endpoints on your API', () => {
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

describe("GET /api/articles/:article_id", () => {
  test("Returns status 200 and a single article object", () => {
    return request(app)
    .get(`/api/articles/1`)
    .expect(200)
    .then(({body}) => {
    const {article} = body;
    expect(typeof article.title).toBe("string")
    expect(typeof article.topic).toBe("string")
    expect(typeof article.author).toBe("string")
    expect(typeof article.body).toBe("string")
    expect(typeof article.created_at).toBe("string")
    expect(typeof article.votes).toBe("number")
    expect(typeof article.article_img_url).toBe("string")
    expect(typeof article.article_id).toBe("number")

    expect(article.title).toBe("Living in the shadow of a great man")
    expect(article.topic).toBe("mitch")
    expect(article.author).toBe("butter_bridge")
    expect(article.body).toBe("I find this existence challenging")
    expect(article.created_at).toBe("2020-07-09T20:11:00.000Z")
    expect(article.votes).toBe(100)
    expect(article.article_id).toBe(1)
    expect(article.article_img_url).toBe("https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700")
  })
})
test("GET: 404 message sent if given a valid but non-existent ID", () => {
  return request(app)
  .get("/api/articles/69420")
  .expect(404)
  .then((response) => {
    expect(response.notFound).toBe(true)
  })
})
})


describe("GET: /api/articles", () => {
  test("Returns an array of all article objects", () => {
    return request(app)
    .get('/api/articles')
    .expect(200)
    .then(({body}) => {
      const articles = body
      expect(articles.length).toBe(13)
      articles.forEach((article) => {
        expect(typeof article.title).toBe("string")
        expect(typeof article.topic).toBe("string")
        expect(typeof article.author).toBe("string")
        expect(typeof article.body).toBe("undefined")
        expect(typeof article.created_at).toBe("string")
        expect(typeof article.votes).toBe("number")
        expect(typeof article.article_img_url).toBe("string")
        expect(typeof article.article_id).toBe("number")
        expect(typeof Number(article.comment_count)).toBe("number")
      })
    })
  })
  test("Return an array of all artical objects in order of date created", () => {
    return request(app)
    .get('/api/articles')
    .expect(200)
    .then(({body}) => {
      expect(body).toBeSortedBy('created_at', {descending: true})
    })
  })
  test("Return not found if url is incorrect", () => {
    return request(app)
    .get('/api/articulz')
    .expect(404)
    .then((body) => {
    expect(body.notFound).toBe(true)
  })
})
})

describe("GET: /api/articles/:article_id/comments", () => {
  test("Return an array of comments from specified article", () => {
  return request(app)
  .get('/api/articles/9/comments')
  .expect(200)
  .then(({body}) => {
    expect((body.article.length)).toBe(2)
    expect((body.article[0].article_id)).toBe(9)
    expect((body.article[1].article_id)).toBe(9)
    expect(body.article).toBeSortedBy('created_at', {descending: true})
  })
})
  test("Return 404 error if article ID doesnt exist", () => {
    return request(app)
    .get('/api/articles/420420/comments')
    .expect(404)
    .then((body) => {
      expect(body.notFound).toBe(true)
    })
  })
  
  describe("POST: /api/articles/:article_id/comments", () => {
    test("Return new comment to specified article", () => {
      return request(app)
      .post('/api/articles/9/comments')
      .send({body: "Hello", username: "icellusedkars"})
      .expect(201)
      .then(({body}) => {
        expect((expect((body.body)).toBe("Hello")))
        expect((body.author)).toBe("icellusedkars")
      })
    })
    test("Return not found if id is incorrect", () => {
      return request(app)
      .get('/api/articules/3945/comments')
      .expect(404)
      .then((body) => {
      expect(body.notFound).toBe(true)
    })
    })
  })
})
