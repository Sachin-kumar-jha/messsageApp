
if(process.env.NODE_ENV != "productrion"){
    require('dotenv').config();
}

const express=require("express");
const app=express();
const ejs=require('ejs');
const path=require('path');
const ejsMate=require('ejs-mate');
const cookieParser=require('cookie-parser');
const ConnectDB =require("./models/mongo.connection.js");
const userRoute=require("./routes/user.js");
const authRoute=require("./routes/auth.js");
const messageRoute = require('./routes/message.js');


app.engine('ejs', ejsMate);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.static(path.join((__dirname,"public"))));
app.use(cookieParser());


app.use("/auth",authRoute);
app.use("/users",userRoute);
app.use("/message",messageRoute);




app.listen(3000,()=>{
    ConnectDB();
    console.log("server is listening http://localhost:3000/auth/");
})