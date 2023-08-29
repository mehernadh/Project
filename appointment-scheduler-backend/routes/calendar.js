// backend/routes/calendar.js
const express = require('express');
const router = express.Router();
const TimeSlot = require('../models/timeSlot');

// Fetch available dates
router.get('/available-dates', async (req, res) => {
  try {
    const dates = await TimeSlot.distinct('date');
    res.json(dates);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Fetch available time slots for a date
router.get('/available-time-slots', async (req, res) => {
  try {
    const { date } = req.query;
    const timeSlot = await TimeSlot.findOne({ date });
    if (!timeSlot) {
      return res.json([]);
    }
    res.json(timeSlot.slots);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
