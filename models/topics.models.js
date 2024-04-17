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

exports.fetchAllArticles = (topic, sort_by = "created_at", order = "desc", limit, p = 0) => {
  const validSortBy = ["article_id", "title", "topic", "author", "created_at", "votes", "article_img_url", "comment_count"];
  const validOrder = ["ASC", "asc", "DESC", "desc"];
  if (!validSortBy.includes(sort_by)) return Promise.reject({ status: 400, msg: "Invalid column for sorting" });
  if (!validOrder.includes(order)) return Promise.reject({ status: 400, msg: "Invalid sorting order" });

  const parameters = [];

  let query = `SELECT a.article_id, a.title, a.topic, a.author, a.created_at, a.votes, a.article_img_url, COUNT(c.comment_id) comment_count`;
  limit ? (query += `, ${limit} total_count`) : (query += `, (SELECT COUNT(*) FROM articles) total_count`);
  query += ` FROM articles a LEFT OUTER JOIN comments c on c.article_id = a.article_id`;

  if (topic) {
    query += ` WHERE a.topic = $1`;
    parameters.push(topic);
  }

  query += ` GROUP BY a.article_id ORDER BY ${sort_by} ${order}`;

  if (limit) query += ` LIMIT ${limit} OFFSET ${p}`;

  console.log(query);

  return db.query(query, parameters);
};
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
      
    
    exports.postComment = (body, article_id) => {
        return db.query(`
          INSERT INTO comments (body, article_id)
          VALUES ($1, $2)
          RETURNING *`, [body, article_id])
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
        return db.query(`
        DELETE FROM comments
        WHERE comment_id = $1
        RETURNING *`, [comment_id])
        .then(({rows}) => {
            if (rows[0] === undefined) {
              return Promise.reject({status: 404, msg : 'Comment not found'})
            }
            return rows[0]
          })
    }