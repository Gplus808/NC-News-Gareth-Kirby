const { selectArticle, fetchAllArticles, selectComments, postComment } = require("../models/topics.models")


exports.getAllArticles = (req, res, next) => {
    fetchAllArticles()
    .then((data) => {
        res.status(200).send(data)
    })
    .catch((err) => {
        next(err)
    })
}

exports.getArticle = (req, res, next) => {
    const {article_id} = req.params
    selectArticle(article_id)
    .then((data) => {
        const article = data
        res.status(200).send({article})
    })
    .catch((err) => {
            next(err)
        })
}

exports.getComments = (req, res, next) => {
    const {article_id} = req.params
    selectComments(article_id)
    .then((data) => {
        const article = data
        res.status(200).send({article})
    })
    .catch((err) => {
        next(err)
    })
}

exports.insertComment = (req, res, next) => {
    const {username, body} = req.body
    const {article_id} = req.params
    postComment(username, body, article_id)
    .then((data) => {
        res.status(201).send(data)
    })
    .catch((err) => {
        next(err)
    })
}


