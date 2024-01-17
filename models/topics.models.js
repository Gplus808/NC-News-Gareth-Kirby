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
        if (response.rows.length === 0) {
            return Promise.reject({ msg: "Article not found"})
        } else {
        return response.rows[0]
        }
    })
}