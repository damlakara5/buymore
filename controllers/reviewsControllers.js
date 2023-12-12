const Review = require("../models/ReviewModel")

exports.getAllReview = async (req,res) => {

    try{

    }catch(e) {
        console.log(e)
        res.status(400).json({
            status: "failed",
            message: e
        })
    }
}

exports.addReview = async (req,res) => {

    try{
        const productId = req.params.id
        const userId= req.user._id
        const review = req.body.review
        const rating = req.body.rating
        const existingReview = await Review.findOne({ product: productId, user: userId });

        if (existingReview) {
            return res.status(400).json({ message: 'You have already reviewed this product' });
        }
        
        const newReview = await Review.create({product: productId, user: userId, review, rating})

        res.status(200).json({
            status: "success",
            data: newReview
        })

    }catch(e) {
        console.log(e)
        res.status(400).json({
            status: "failed",
            message: e
        })
    }
}
exports.getReviewByProduct = async (req,res) => {

    try{

    }catch(e) {
        console.log(e)
        res.status(400).json({
            status: "failed",
            message: e
        })
    }
}