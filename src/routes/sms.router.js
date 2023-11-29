const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const config = require('../config/config'); 

//  account SID, auth token, and phone number from the config
const accountSid = config.TWILIO_ACCOUNT_SID;
const authToken = config.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = config.TWILIO_PHONE_NUMBER;

// Create a new Twilio client using the credentials
const client = new twilio(accountSid, authToken);

// Define a route to send a thank you SMS
router.post('/sendThankYouSMS', (req, res) => {
  const phoneNumber = '+541137819989'; // Replace with the user's phone number
  const message = 'Thank you for your purchase!'; // Your thank you message

  // Send the SMS
  client.messages.create({
    body: message,
    to: phoneNumber,
    from: twilioPhoneNumber, // Use the configured Twilio phone number
  })
  .then((message) => {
    console.log(`SMS sent with SID: ${message.sid}`);
    res.json({ message: 'Thank you SMS sent successfully' });
  })
  .catch((error) => {
    console.error(`Error sending SMS: ${error.message}`);
    res.status(500).json({ message: 'Error sending SMS' });
  });
});

module.exports = router;
