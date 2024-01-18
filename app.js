const express = require('express');
const {getTopics} = require('./controllers/topics.controller');
const {getArticle, getAllArticles, getComments} = require('./controllers/articles.controller')
const fs = require('fs');
const app = express();


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


module.exports = app;