const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  category: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Event', EventSchema);
