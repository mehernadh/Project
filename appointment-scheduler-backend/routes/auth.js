// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// Handle user login and send OTP
router.post('/login', async (req, res) => {
  try {
    const { email } = req.body;

    // Generate OTP (you can use a library to generate a random OTP)
    const otp = '123456';

    // Send OTP to the user's email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Verify OTP and generate token
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Verify OTP (compare with the OTP stored in your database or memory)
    if (otp === '123456') {
      // Generate JWT token
      const token = jwt.sign({ email }, 'secret-key', { expiresIn: '1h' });

      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: 'Invalid OTP' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
