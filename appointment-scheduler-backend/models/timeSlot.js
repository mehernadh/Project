// backend/models/timeSlot.js
const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  slots: [{ type: String }],
  // Add other fields relevant to time slots
});

const TimeSlot = mongoose.model('TimeSlot', timeSlotSchema);

module.exports = TimeSlot;
