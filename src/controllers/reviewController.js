const reviewModel = require('../model/reviewModel')

const createReview = async (req, res) => {
    try {
        const data = req.body
        const newReview = await reviewModel.create(data)
        res.status(201).send({status : true,
        data : newReview})
    } catch (error) {
        res.status(500).send({status : false,
        Error : error})
    }
}

module.exports.createReview = createReview