const jwt=require('jsonwebtoken');
const {ApiError}=require('./error.js');

const verifyToken=(req,res,next)=>{
    let token=req.cookies.access_token;
    if(!token){
        return res.render("Error.ejs",{error:new ApiError(401,"You are not authneticated!",['something missing'])});
    }
    jwt.verify(token,process.env.JWT,function(err,user){
        if(err) return new ApiError(401,"token is not valid");
        req.user=user;
        next();

})
}

const verifyUser=(req,res,next)=>{
    let {id}=req.params;
    verifyToken((req,res,next)=>{
        if(req.user.id===id){
            next();
        }else{
            return next(createError(403,"You are not authorized!"));
        }
    })
}

module.exports={verifyToken,verifyUser}