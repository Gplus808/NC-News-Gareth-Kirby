const db = require("../db/connection.js")

exports.fetchTopics = () => {
    return db.query(`SELECT * FROM topics`)
    .then((result) => {
        return result.rows
    })
}

exports.selectArticle = (articleId) => {
    return db.query(`
    SELECT *
    FROM articles
    WHERE articles.article_id = $1`, [articleId])
    .then((response) => {
        if (response.rows[0] === undefined) {
            return Promise.reject({status: 404, msg: 'Not found'})
        }
        return response.rows[0]
        })
    }

exports.fetchAllArticles = () => {
    return db.query(`
    SELECT articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, articles.article_id,
    COUNT(comments.article_id) AS comment_count
    FROM articles
    LEFT JOIN comments on articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY created_at DESC;
    `)
    .then((response) => {
        return response.rows
        })
        .catch((err) => {
            next(err)
        })
    }
