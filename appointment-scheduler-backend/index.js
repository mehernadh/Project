const mongoose = require('mongoose');
const User = require('./models/user');
const Appointment = require('./models/appointment');
const TimeSlot = require('./models/timeSlot');
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth'); // Import the auth routes
const { User, Appointment, TimeSlot } = require('./models'); // Import your models

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// ... Your application logic here ...
const app = express();

mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.json());

app.use('/auth', authRoutes); // Use the auth routes

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

