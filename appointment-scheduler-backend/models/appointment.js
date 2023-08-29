// backend/models/appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  timeSlot: { type: String, required: true },
  // Add other fields relevant to appointments
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
