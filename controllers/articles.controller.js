const { selectArticle } = require("../models/topics.models")



exports.getArticle = (req, res) => {
    const {article_id} = req.params
    selectArticle(article_id)
        .then((data) => {
            const article = data
            res.status(200).send({article})
        })
        .catch((err) => {
           res.status(404).send(err)
        })
}