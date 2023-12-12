const express = require("express")
const authController = require("../controllers/authControllers")
const shoppingCartController = require("../controllers/shoppingCartControllers")


const router = express.Router()


router
    .route("/")
    .get(authController.protect,shoppingCartController.getCart)
    .post(authController.protect,shoppingCartController.addToCart)
    .delete(authController.protect, shoppingCartController.deleteFromCart)

module.exports = router