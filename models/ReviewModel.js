const mongoose = require("mongoose")
const Product = require("./ProductModel")


const ReviewSchema = mongoose.Schema({
    review: {
        type: String,
        required: [true, "Please provide a review"]
    },
    rating: {
        type: Number,
        required: [true, "Please provide a rating"]
    },
    user : {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product"
    },
    createdAt : {
        type: Date,
        default: Date.now()
    },
})


ReviewSchema.statics.calcAverageRatings = async function(productId){
    //this == current model, we have to call the aggregate function on the modal and this is why we use statics on the modal (so this will point to model)
    const stats = await this.aggregate([
        {
            $match: { product: productId} //we selected product that we want to update
        },
        {
            $group : {
                _id: '$product',
                nRating: {$sum : 1},
                avgRating: {$avg: '$rating'},
            }
        }
    ])


    if(stats.length > 0){
        await mongoose.model('Product').findByIdAndUpdate(productId, {
            ratingsQuantity: stats[0].nRating,
            ratingsAverage:stats[0].avgRating
        })
    }else{
        await mongoose.model('Product').findByIdAndUpdate(productId, {
            ratingsQuantity: 0,
            ratingsAverage: 4.5
        })
    }
   

}


ReviewSchema.post('save', function(){
   
    // this points to current review but this.constructor is the model = Review
    this.constructor.calcAverageRatings(this.product)
 })

 ReviewSchema.post(/^findOneAnd/, async function(doc) {
    if (doc) {
        await doc.constructor.calcAverageRatings(doc.product);
    }
});

const Review = mongoose.model("Review", ReviewSchema)

module.exports = Review