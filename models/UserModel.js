const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = mongoose.Schema({
    name: {
        required: [true, "A user must have a name!"],
        type: String        
    },
    email: {
        required: [true, "Please provide a valid email!"],
        type: String,
        unique: true,
    },
    password: {
        required: [true, "Please provide a password"],
        type: String,
        select: false
    },
    passwordConfirm : {
        type: String,
        required : [true, "Please confirm password"],
        minLength: 8,
        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: "Passwords are not the same"
        }
    },
    photo : {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    address: {
        city: String,
        country: String,
        adressTitle: String
    },
    phone: {
        required: [true, "Please provide a phone number!"],
        type: String
    }
})

UserSchema.pre("save", async function(next) {
    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined

    next()
})


//this is an instance method and instance methods available on document for certain collection
UserSchema.methods.correctPassword = async function (candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model("User", UserSchema)

module.exports = User
