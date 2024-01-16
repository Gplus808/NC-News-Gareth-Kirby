const express = require('express');
const { getTopics } = require('./Controllers/topics.controller');
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


module.exports = app;