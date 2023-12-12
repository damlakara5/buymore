const mongoose = require("mongoose")

const UserFavSchema = mongoose.Schema({
    product: {
        type : mongoose.Schema.ObjectId,
        ref: "Product",
        required: [true, 'Favorite must belong to a product.'],

    },
    user: {
        type : mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, 'Favorite must belong to an user.'],

    },
})


const UserFav = mongoose.model("UserFav", UserFavSchema)


module.exports = UserFav