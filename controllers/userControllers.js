
const User = require("../models/UserModel")


exports.getAllUsers = async(req,res) => {
    const users = await User.find()

    res.status(200).json({
        status: "success",
        data: users
    })
}


exports.updateUserInfo = async(req,res) => {
    const userId = req.user._id
    const {name,email, phone} = req.body
    const {city, country, adressTitle} = req.body
    const adress = {city , country,adressTitle}

    const user = await User.findByIdAndUpdate(userId, {
        name,
        email,
        phone
    }, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        status: "success",
        data: user
    })
}


exports.getCurrentUser =async(req,res) => {
    const userId = req.user._id

    const user = await User.find({_id: userId})

    res.status(200).json({
        status: "success",
        data: user
    })
}