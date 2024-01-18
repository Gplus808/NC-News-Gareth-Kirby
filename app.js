const express = require('express');
const {getTopics} = require('./controllers/topics.controller');
const {getArticle, getAllArticles, getComments, insertComment} = require('./controllers/articles.controller')
const fs = require('fs');
const app = express();

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


module.exports = app;