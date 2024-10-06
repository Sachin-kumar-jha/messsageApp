const jwt = require("jsonwebtoken");
const User=require("../models/user.model.js");
const bcrypt=require('bcrypt');
const {ApiError}=require('../utils/error.js');

const registerUser=async(req,res,next)=>{
   let {username,name,mobileNumber,email,password}=req.body;
   const user=User.find({username:username,email:email,mobileNumber:mobileNumber});
   if(user) return res.render("Error.ejs",{error:new ApiError(401,"User is already exists! please click the message icon to register!")});
   const hash = bcrypt.hashSync(password,10);
 const newUser=new User({
   username,
   name,
   email,
   mobileNumber,
   password:hash,
 });
 try{
    const savedUser= await newUser.save();
    //res.status(200).json(savedUser);
 }catch (error) {
    next(error);
 }
 next();
}

 const signIn= async (req,res,next)=>{
    let {email}=req.body;
    try {
        const user= await User.findOne({email});
        if(!user) return res.render("Error.ejs",{error:new ApiError(401,"User not found!")});
        let hash= user.password;
        let isPasswordCorrect=bcrypt.compareSync(req.body.password, hash);
        
        if(!isPasswordCorrect) return res.render("Error.ejs",{error:new ApiError(401,"Somethin went wrong!")});

const token=jwt.sign({id:user._id,name:user.name},process.env.JWT);
        const {password,mobileNumber,...otherDetails}=user._doc;
        res.cookie("access_token",token,{
            httpOnly:true,
            secure:true
         });//.status(200).json({...otherDetails});//
    } catch (error) {
        next(error);
    }
    next();
}

const signOut=async(req,res,next)=>{
  let token=req.cookies.access_token;
  if(!token) return res.render("Error.ejs",{error:new ApiError(401,"You have already signedout.Please signIn")});
    res.clearCookie('access_token', {
        httpOnly: true, 
        secure: true   
      });
    next();
}
module.exports={registerUser,signIn,signOut}