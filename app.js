const express = require('express');
const {getTopics} = require('./controllers/topics.controller');
const {getArticle, getAllArticles, getComments, insertComment, patchArticleVotes, deleteComment} = require('./controllers/articles.controller')
const fs = require('fs');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.get('/api/topics', getTopics)

let endPointsFs;

fs.readFile('endpoints.json', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading endpoints.json", err);
        return err;
    }
    endPointsFs = JSON.parse(data)
    return endPointsFs
})
app.get('/api/', (req, res) => {
    return res.json(endPointsFs)
})

app.get("/api/articles", getAllArticles)

app.get('/api/articles/:article_id', getArticle)

app.get('/api/articles/:article_id/comments', getComments)

app.post('/api/articles/:article_id/comments', insertComment)

app.patch('/api/articles/:article_id', patchArticleVotes)

app.delete('/api/comments/:comment_id', deleteComment)

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.status && err.msg) {
    return res.status(err.status).send({ msg: err.msg });
  } else if (err.code === '23503' && err.detail.includes('article_id')) {
    return res.status(400).send({ status: 400, msg: 'not an id' });
  } else if (err.detail && err.detail.includes("is not present in table \"users\"")) {
    return res.status(404).send({ msg: 'Username doesn\'t exist' });
  } else {
    return next(err);
  }
});


module.exports = app;