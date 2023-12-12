const User = require("../models/UserModel")
const jwt = require("jsonwebtoken")
const { promisify } = require("util")


const signToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in your environment variables');
}

    //payload, secret,expires in time,
    return jwt.sign({id: id}, process.env.JWT_SECRET)
}

const createSendToken = (user,statusCode,req, res) => {

    const token = signToken(user._id)
    const cookieOptions =  {
      httpOnly: true,
      secure: false,
      sameSite: 'Strict'
    }
   
    res.cookie('jwt', token, cookieOptions)
    //remove password from output
    user.password = undefined
  
    res.status(statusCode).json({
        status: "success",
        token,
        data : {
          user
        }
    })
  }

exports.login = async(req,res,next) => {

   try{
    const {email,password} = req.body

      if(!email || !password) return next(new Error("Please provide email and password!"))

      const user = await User.findOne({email}).select('+password')


      if(!user || !user.correctPassword(password, user.password)) return next(new Error("Incorrect email or password"))

      createSendToken(user, 200, req,res)
   }catch(e) {
      res.status(401).json({
        status: "failed",
        message: e
      })
   }
}

exports.signup = async(req,res) => {

  try{
    
      const user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        passwordConfirm: req.body.passwordConfirm,
        phone: req.body.phone
    })

    createSendToken(user, 200, req,res)
  }catch(e) {
    res.status(401).json({
      status: "failed",
      message: e
    })
  }
}


exports.protect = async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }else if(req.cookies.jwt){
    token = req.cookies.jwt 
  }


  if (!token) {
    return next(
      new Error('You are not logged in! Please log in to get access.')
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return res.status(401).json({
      status:"failed",
      message: 'The user belonging to this token does no longer exist.'
    })
  }

  // 4) Check if user changed password after the token was issued

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;

  next();
};