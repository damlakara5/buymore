const mongoose = require("mongoose")
const dotenv = require('dotenv');
const fs = require("fs")
const Product = require("../models/ProductModel")
const User = require("../models/UserModel")

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE

mongoose.connect(DB).then(con => { console.log("DB connection successfull")})

//READ JSON FILE
const products =JSON.parse(fs.readFileSync(`${__dirname}/products-real.json`, "utf-8"));
const users =JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));
//const reviews =JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, "utf-8"));

//IMPORT DATA INTO DATABASE
const importData = async() => {
    try{
        await Product.create(products)
        await User.create(users, {validateBeforeSave: false})
        //await Review.create(reviews)
        console.log("Data successfully loaded")
        process.exit()

    }catch(err){
        console.log(err)
    }
}


//DELETE ALL DATA FROM COLLECTION
const deleteData = async() => {
    try{
        await Product.deleteMany() 
        await User.deleteMany()
        console.log("Data successfully deleted")
        process.exit()
    }catch(err){
        console.log(err)
    }
}

if(process.argv[2] === "--import"){
    importData()
}
if(process.argv[2] === "--delete"){
    deleteData()
}
