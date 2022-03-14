const mongoose = require('mongoose');
const path = require('path');

const MeetingTimingSchema = new mongoose.Schema({
  dateValue: {
    type: String,
    required: true,
  },
  startTime: {
    type: Number,
    required: true,
  },
  endTime: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const meetingDate = mongoose.model('date', MeetingTimingSchema);
module.exports = {
  meetingDate,
}
