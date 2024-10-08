const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        
    },
    name:{
        type:String,
        unique:true,
        required:true,
        
    },
    email:{
        type:String,
        unique:true,
        required:true,
        
    },
    password:{
        type:String
    },
    mobileNumber:[
         {
            type:Number,
            unique:true,
            required:true
           
         }
    ]
   
})

const User=mongoose.model("User",userSchema);
module.exports=User;