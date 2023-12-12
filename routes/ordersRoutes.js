const express = require("express")
const authController = require("../controllers/authControllers")
const ordersController = require("../controllers/ordersControllers")
const paymentController = require("../controllers/paymentController")



const router = express.Router()


router.route("/").get( paymentController.createPaymentCheckout, authController.protect, ordersController.getOrders)

router.post("/:id",authController.protect,paymentController.getCheckoutSession )

router.get('/refund/:refundId', authController.protect, paymentController.getRefund )


module.exports = router