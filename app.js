const express = require("express")
const mongoose = require("mongoose")
const userRouter = require("./routes/userRoutes")
const productRouter = require("./routes/productRoutes")
const userFavRouter = require("./routes/userFavRoutes")
const ordersRouter = require("./routes/ordersRoutes")
const reviewsRouter = require("./routes/reviewRoutes")
const shoppingCartRouter = require("./routes/shoppingCartRoutes")
const authController = require("./controllers/authControllers")
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require("cookie-parser")
const path = require("path")

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE

mongoose.connect(DB).then(con => { console.log("DB connection successfull")})




const app = express()
const port = 3000

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(express.static(path.join(__dirname,`public`))) 

app.get("/", (req,res) => {
    console.log("hello")
})


app.use("/login",authController.login )
app.use("/products", productRouter)
app.use("/user", userRouter)
app.use("/favs", userFavRouter )
app.use("/order", ordersRouter)
app.use("/cart", shoppingCartRouter)
app.use("/reviews", reviewsRouter)


const server = app.listen(port, () => {
    console.log("listening")
})


module.exports = server