const mongoose = require("mongoose")
const Review= require("./ReviewModel")

const ProductSchema = mongoose.Schema({
    name: {
        required: [true, "A product must have a name!"],
        type: String
    },
    price: {
        required: [true, "A product must have a price!"],
        type: Number
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    ratingsAverage:  { //this object is Schema type options
        type : Number,
        default: 4.5,
        min : [1, "Rating must be above 1"],
        max: [5, "Rating must be below 5"],
        set: val =>  Math.round(val * 10) / 10
    },
    ratingsQuantity:  { //this object is Schema type options
        type : Number,
        default: 0
    },
    description: String,
    images:[ String],
    category : [String],
    gender: String,
    brand: String,
    sizes : [String],
    colors : [String],
    discount: Number

},
{
    toJSON : {virtuals: true} , //whenever data converted to json virtuals be part of the output
    toObject : {virtuals: true} , //whenever data converted to json virtuals be part of the output
})


ProductSchema.virtual("reviews", {
    ref: "Review",
    foreignField : "product", //name of the which field did we store the tour id on other model
    localField : "_id"  //field name in this model
})

const Product = mongoose.model("Product", ProductSchema)



module.exports = Product