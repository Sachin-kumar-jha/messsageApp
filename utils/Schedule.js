const cron = require('node-cron');
const client=require('twilio')(`${process.env.TWILIO_ACCOUNT_SID}`,`${process.env.TWILIO_AUTH_TOKEN}`);
 
const scheduleMessage = (message, to,minutes) => {
    // Get the current date and time
    const now = new Date();
    
    // Calculate the time for one minute later
    const minuteLater = new Date(now.getTime() + minutes*60 * 1000);
    
    // Format the time for cron (minutes, hours, day of month, month, day of week)
    const cronTime = `${minuteLater.getMinutes()} ${minuteLater.getHours()} * * *`;
    
    // Schedule the message
   const task= cron.schedule(cronTime, () => {
        client.messages
            .create({
                body: message,
                from: `whatsapp:+${process.env.TWILIO_WHATSAPP_NUMBER}`, // Your Twilio Sandbox WhatsApp number
                to: `whatsapp:+91${to}`
            })
            .then()
            .catch(err => {
                console.error('Failed to send message:', err);
            })
            .finally(() => {
                // Optional: Stop the cron job after sending the message
                task.stop(); 
            });
    });
};

module.exports={scheduleMessage};