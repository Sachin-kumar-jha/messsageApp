const express=require('express');
const router=express.Router();
const {registerUser,signIn,signOut}=require("../controllers/auth.js");
const { Redirect } = require('twilio/lib/twiml/VoiceResponse.js');

// router.get("/",(req,res)=>{
//     res.render("register.ejs");
// });
// router.post("/register",registerUser);
router
.route("/")
.get((req,res,next)=>{
    res.render("User/register.ejs");
    next();
})
.post(registerUser,(req,res,next)=>{
    res.redirect("/signin");
    next();
})

router
.route("/signin")
.get((req,res,next)=>{
    res.render("User/signin.ejs");
    next();
})
.post(signIn,(req,res,next)=>{
    res.redirect("/message");
    next();
})

router.get("/signout", signOut,(req,res,next)=>{
    res.render("User/signin.ejs");
    next();
})



module.exports=router;