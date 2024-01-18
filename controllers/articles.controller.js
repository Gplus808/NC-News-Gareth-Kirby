const { selectArticle, fetchAllArticles, selectComments } = require("../models/topics.models")


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


