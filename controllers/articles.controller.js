const { selectArticle, fetchAllArticles, selectComments, postComment, editVotes, destroyComment } = require("../models/topics.models")


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
    const {body} = req.body
    const {article_id} = req.params
    postComment( body, article_id)
    .then((data) => {
        res.status(201).send(data)
    })
    .catch((err) => {
        next(err)
    })
}

exports.patchArticleVotes = (req, res, next) => {
    const {inc_votes} = req.body
    const {article_id} = req.params
    editVotes(inc_votes, article_id)
    .then((data) => {
        res.status(200).send(data)
    })
    .catch((err) => {
        next(err)
    })
}

exports.deleteComment = (req, res, next) => {
    const {comment_id} = req.params
    destroyComment(comment_id)
    .then((data) => {
        res.status(204).send(data)
    })
    .catch((err) => {
        next(err)
    })
}


