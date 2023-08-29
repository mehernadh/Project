// backend/controllers/appointment.js
const Appointment = require('../models/appointment');

// Example: Creating a new appointment
const createAppointment = async (req, res) => {
  try {
    const { user, timeSlot } = req.body;
    const appointment = new Appointment({ user, timeSlot });
    await appointment.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = { createAppointment };
