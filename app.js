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
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE

mongoose.connect(DB).then(con => { console.log("DB connection successfull")})



const app = express()
const port = 3000

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "https://buymore-ten.vercel.app",
    credentials: true
}))
app.use(express.static(path.join(__dirname,`public`))) 
app.use(session({ secret: 'your_secret', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());
// Passport session setup
passport.serializeUser((user, done) => {
    // Here, you can serialize user details into the session
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    // Retrieve the user details from the session
    // User.findById(id, function(err, user) {
    //   done(err, user);
    // });
    done(null, { id }); // Replace with actual user retrieval logic
  });


  // Configure the Google strategy for use by Passport
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://buymore-lzh0.onrender.com/auth/google/callback'
  },
  authController.googleAuth
));

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


app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

// Define the route for Google authentication callback
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: 'https://buymore-ten.vercel.app/login' }),
  authController.googleLogin
);

const server = app.listen(port, () => {
    console.log("listening")
})


module.exports = server