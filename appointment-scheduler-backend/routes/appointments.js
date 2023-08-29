// backend/routes/appointments.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');
const verifyToken = require('../middleware/auth');

// Book an appointment
router.post('/book-appointment', verifyToken, async (req, res) => {
  try {
    const { user } = req.user;
    const { timeSlot } = req.body;
    const appointment = new Appointment({ user, timeSlot });
    await appointment.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Cancel an appointment
router.post('/cancel-appointment', verifyToken, async (req, res) => {
  try {
    const { user } = req.user;
    const { timeSlot } = req.body;
    await Appointment.deleteOne({ user, timeSlot });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
