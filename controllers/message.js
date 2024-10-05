const  User=require('../models/user.model.js');
const {ApiError}=require("../utils/error.js");
const cron = require('node-cron');
const client=require('twilio')(`${process.env.TWILIO_ACCOUNT_SID}`,`${process.env.TWILIO_AUTH_TOKEN}`);
const {scheduleMessage}=require("../utils/Schedule.js");
const { ApiResponse } = require('../utils/ApiResponse.js');

const message = async (req, res, next) =>{
    try {
        const users = await User.find(); // Fetch all users
        const message  = req.body.message; 
       // Extract message from the request body

        // Check if message is undefined or empty
        if (!message) {
            return res.status(400).send('Message content is missing.');
        }

        // Map through users and extract the first mobile number
        const numbers = users.map(user => user.mobileNumber[0]); // Ensure mobileNumber is an array

        // Check if numbers are valid
        const validNumbers = numbers.filter(number => number !== undefined); // Remove undefined numbers

        if (validNumbers.length === 0) {
            return res.status(400).send('No valid mobile numbers found.');
        }

        // Iterate over valid numbers
        await Promise.all(
            validNumbers.map( num => {
                // Send WhatsApp message via Twilio
                return client.messages
                    .create({
                        body: message, // Ensure the message is directly passed here
                        from: `whatsapp:+${process.env.TWILIO_WHATSAPP_NUMBER}`, // Twilio WhatsApp number
                        to: `whatsapp:+91${num}`      // Recipient's WhatsApp number
                    })
                    .then()
                    .catch(err => {
                        console.error('Failed to send message to', number, err);
                });
            })
        );
       next();
    } catch (error) {
        return next(new ApiError(501, "internal server error", error));
    }
};


const schedule= async(req,res,next)=>{
    const {message ,to,minutes,action}= req.body;

    try{
        if(action=="scheduleSingle"){
          scheduleMessage(message,to,minutes);
          return res.render("response.ejs",{data:new ApiResponse(`check your whatsapp after:${minutes} minutes`)});
    } 
    if(action=="scheduleAll"){
            const users = await User.find(); 
            if (!message) {
                return res.status(400).send('Message content is missing.');
            }
            //Map through users and extract the first mobile number
            const numbers = users.map(user => user.mobileNumber[0]).filter(number=>number); 
            await Promise.all(
                numbers.map(num => {
                    return scheduleMessage(message, num, minutes); // Ensure scheduleMessage returns a promise
                }) 
    );
    return res.render("response.ejs",{data:new ApiResponse(`check your whatsapp after:${minutes} minutes`)});
    }
 }catch(error){
        return next(new ApiError(405, "SomeThing goin wrong", error));
    }
}






module.exports={message,schedule};