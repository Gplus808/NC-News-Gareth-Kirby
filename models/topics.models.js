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
            if (response.rows[0] === undefined) {
                return Promise.reject({status: 404, msg: 'Not found'})
            }
            return response.rows
            })
    }

    exports.selectComments = (articleId) => {
        return db.query(`
        SELECT *
        FROM comments
        WHERE comments.article_id = $1
        ORDER BY created_at DESC;`, [articleId])
        .then((response) => {
            if (response.rows[0] === undefined) {
                return Promise.reject({status: 404, msg: 'Not found'})
            }
            return response.rows
            })
        }
      
    
    exports.postComment = (username, body, article_id) => {
        return db.query(`
          INSERT INTO comments (author, body, article_id)
          VALUES ($1, $2, $3)
          RETURNING *`, [username, body, article_id])
        .then(({rows}) => {
            if (rows === undefined) {
                return Promise.reject({status: 404, msg: 'Not found'})
            }
          return rows[0]
        })
      }

    exports.editVotes = (inc_votes, article_id) => {
        return db.query(`
        UPDATE articles
        SET votes = votes + $1
        WHERE
        article_id = $2
        RETURNING *
        `, [inc_votes, article_id])
        .then(({rows}) => {
        if (rows.length === 0) {
          return Promise.reject({status: 404, msg : 'Article not found'})
        }
        return rows[0]
      })
    }

    exports.destroyComment = (comment_id) => {
        console.log(comment_id)
        return db.query(`
        DELETE FROM comments
        WHERE comment_id = $1
        RETURNING *`, [comment_id])
        .then(({rows}) => {
            console.log(rows[0], 'rows')
            if (rows[0] === undefined) {
              return Promise.reject({status: 404, msg : 'Comment not found'})
            }
            return rows[0]
          })
    }