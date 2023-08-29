// backend/controllers/auth.js
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Example: User Registration
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({ email, password: hashedPassword });
    await user.save();
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = { registerUser };



// backend/controllers/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Example: User Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user._id }, 'secret-key', { expiresIn: '1h' });
    
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = { loginUser };


// backend/controllers/auth.js
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');

// Example: Generate OTP and Send Email
const generateAndSendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    
    const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
    
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
};

module.exports = { generateAndSendOTP };

