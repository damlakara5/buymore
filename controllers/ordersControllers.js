
const Orders = require("../models/OrdersModel")
const ShoppingCart = require("../models/ShoppingCartModel")

exports.getOrders = async(req,res) => {
    try {
        const userId = req.user._id

        const orders = await Orders.find({user: userId}).populate("products.product")

        res.status(200).json({
            status: "success",
            data: orders
        })

    }catch(e) {
        res.status(400).json({
            status: "failed",
            message: e
        })
    }
}
exports.setOrders = async(req,res) => {
    try {
        const userId = req.user._id
        const productId = req.params.id

        const order = await Orders.create({user: userId, product: productId})
        const x = await ShoppingCart.deleteMany({}).then(function(){
            console.log("Data deleted"); // Success
        }).catch(function(error){
            console.log(error); // Failure
        });

        console.log(x)
        console.log(order)

        res.status(200).json({
            status: "success",
            data: order
        })

    }catch(e) {
        res.status(400).json({
            status: "failed",
            message: e
        })
    }
}