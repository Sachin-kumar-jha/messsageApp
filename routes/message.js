const express=require('express');
const router=express.Router();

const {message,schedule} = require('../controllers/message.js');
const {verifyToken}=require("../utils/verify.js");
const { ApiResponse } = require('../utils/ApiResponse.js');


router
.route("/")
.get(verifyToken,(req,res,next)=>{
    res.render("Message/Message.ejs");
    next();
})
.post(message,(req,res,next)=>{
    res.render("response.ejs",{data:new ApiResponse("Your message has been sent to the all registerd users")});
    next();
});

router
.route("/schedule")
.get(verifyToken,(req,res,next)=>{
    res.render("Message/ScheduleMessage.ejs");
    next();
})
.post(schedule,(req,res,next)=>{
    next();
});



module.exports=router;