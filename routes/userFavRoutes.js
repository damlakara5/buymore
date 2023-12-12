const express = require("express")
const userFavController = require("../controllers/userFavControllers")
const authController = require("../controllers/authControllers")

const router = express.Router()


router.get("/", authController.protect, userFavController.getFavs )
router.get("/:id", authController.protect,userFavController.addFavs )

module.exports = router