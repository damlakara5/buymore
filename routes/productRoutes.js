const express = require("express")
const router = express.Router()
const productController = require("../controllers/productController")
const authController = require("../controllers/authControllers")


router.
    route("/")
    .get( productController.getAllProducts )
    .post(authController.protect, productController.addProduct)


router
    .route("/:id")
    .get(productController.getOneProduct)

    

module.exports = router