const mongoose = require("mongoose")


const OrderItemSchema = mongoose.Schema({
    product: {
        ref: "Product",
        type: mongoose.Schema.ObjectId,
    },
    quantity: {
        type: String, // Storing quantity as a string
        required: true
    },
    size: String,
    color: String

})

const OrdersSchema = mongoose.Schema({
    products: [OrderItemSchema],
    user: {
        ref: "User",
        type: mongoose.Schema.ObjectId
    },
    totalAmount: {
        type: String
    },
    createdAt : {
        type: Date,
        default: new Date()
    }
})


const Orders = mongoose.model("Orders" , OrdersSchema)

module.exports = Orders