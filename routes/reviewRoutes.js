const express= require("express")
const reviewController = require("../controllers/reviewsControllers")
const authController = require("../controllers/authControllers")

const router = express.Router()

router.use(authController.protect)

router.route("/").get(reviewController.getAllReview)
router.route("/:id").get(reviewController.getReviewByProduct).post(reviewController.addReview)



module.exports = router