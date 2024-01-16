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
    // console.log(endPointsFs)
    return endPointsFs
})

app.get('/api', (req, res) => {
    if (!endPointsFs) {
        res.status(500).send("Endpoint isn't available");
        return
    }
    return res.json(endPointsFs)
})


module.exports = app,  endPointsFs;