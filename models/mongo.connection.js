const mongoose=require("mongoose");

const ConnectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
         console.log("connected")
    }catch(error){
        throw error
}
}

mongoose.connection.on("disconnected",()=>{
    console.log("mongoDb disconnected");
});
mongoose.connection.on("connected",()=>{
    console.log("mongoDB connected");
})

module.exports=ConnectDB;