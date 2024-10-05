
const User=require("../models/user.model.js");


const updateUser=async (req,res,next)=>{
   let{id}=req.params;
   try {
      const user=await User.findByIdAndUpdate(id,{$set:req.body},{new:true});
      if(!user) return res.status(404).json("Not Found")
         res.status(201).json(user);
   } catch (error) {
      next(error);
   }
   


}
const deleteUser=async(req,res,next)=>{
   let {id}=req.params;
   try {
      const user= await User.findByIdAndDelete(id);
      if(!user) return "something went wrong" ;
      res.status(202).json(user);
   } catch (error) {
      next(error);
   }
}




module.exports={deleteUser,updateUser};