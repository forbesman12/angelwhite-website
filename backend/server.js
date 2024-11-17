const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to handle form submission
app.post('/subscribe', (req, res) => {
    const { firstname, email } = req.body;
    console.log('Received data:', firstname, email); // Debugging log
    
    // ... rest of the code
  });
  

  // Set up nodemailer transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Set up email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'New Subscription Request',
    text: `Name: ${firstname}\nEmail: ${email}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Failed to send email. Please try again.');
    } else {
      console.log('Email sent successfully:', info.response);
      res.status(200).send('Subscription successful. Thank you!');
    }
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const express = require('express');
// const bodyParser = require('body-parser');
// const twilio = require('twilio');

// const app = express();
// const port = 3000;

// Replace with your Twilio credentials
// const accountSid = 'your_account_sid';
// const authToken = 'your_auth_token';
// const client = twilio(accountSid, authToken);

// app.use(bodyParser.json());

// app.post('/subscribe', (req, res) => {
//     const email = req.body.email;

//     Send the email to WhatsApp
//     client.messages.create({
//          from: 'whatsapp:+2349067493752', Your Twilio WhatsApp number
//         to: 'whatsapp:+2349067493752',  Your personal WhatsApp number
//         body: `New subscription: ${email}`
//     })
//     .then(message => {
//         res.json({ message: 'Subscription successful!' });
//     })
//     .catch(error => {
//         console.error('Error sending message:', error);
//         res.status(500).json({ message: 'Error sending subscription.' });
//     });
// });

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });