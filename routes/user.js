const express=require('express');
const router=express.Router();
const {deleteUser,updateUser}= require("../controllers/user.js");


router
.route("/:id")
.delete(deleteUser)
.put(updateUser);


module.exports=router;