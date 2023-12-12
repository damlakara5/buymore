const express = require("express")
const userController = require("../controllers/userControllers")
const authController = require("../controllers/authControllers")


const router = express.Router()

router.post("/login",authController.login )
router.post("/signup",authController.signup )


router.use(authController.protect)

router.route("/").get(userController.getAllUsers).post(userController.updateUserInfo)
router.route("/me").get(userController.getCurrentUser)


module.exports = router