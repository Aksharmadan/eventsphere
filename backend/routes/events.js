// backend/routes/events.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Registration = require('../models/Registration');
const { auth, organizerOnly } = require('../middleware/auth'); // make sure to destructure

// Create event (organizer only)
router.post('/', auth, organizerOnly, async (req, res) => {
  try {
    const { title, description, date, category, location } = req.body;
    const ev = new Event({
      title,
      description,
      date,
      category,
      location,
      createdBy: req.user._id
    });
    await ev.save();
    res.json(ev);
  } catch (err) {
    console.error('create event error:', err);
    res.status(500).json({ msg: err.message });
  }
});

// Get events (public) with optional search/category/upcoming
router.get('/', async (req, res) => {
  try {
    const { q, category, upcoming } = req.query;
    let filter = {};
    if (q) filter.title = { $regex: q, $options: 'i' };
    if (category) filter.category = category;
    if (upcoming === 'true') filter.date = { $gte: new Date() };
    const events = await Event.find(filter).populate('createdBy', 'name email').sort({ date: 1 });
    res.json(events);
  } catch (err) {
    console.error('get events error:', err);
    res.status(500).json({ msg: err.message });
  }
});

// Get single event
router.get('/:id', async (req, res) => {
  try {
    const ev = await Event.findById(req.params.id).populate('createdBy', 'name email').populate('attendees', 'name email');
    if (!ev) return res.status(404).json({ msg: 'Not found' });
    res.json(ev);
  } catch (err) {
    console.error('get event error:', err);
    res.status(500).json({ msg: err.message });
  }
});

// Organizer's events list (requires auth)
router.get('/mine/list', auth, async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user._id }).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    console.error('mine list error:', err);
    res.status(500).json({ msg: err.message });
  }
});

// Update event (organizer only)
router.put('/:id', auth, organizerOnly, async (req, res) => {
  try {
    const ev = await Event.findById(req.params.id);
    if (!ev) return res.status(404).json({ msg: 'Not found' });
    if (ev.createdBy.toString() !== req.user._id.toString()) return res.status(403).json({ msg: 'Not allowed' });
    Object.assign(ev, req.body);
    await ev.save();
    res.json(ev);
  } catch (err) {
    console.error('update event error:', err);
    res.status(500).json({ msg: err.message });
  }
});

// Delete event (organizer only)
router.delete('/:id', auth, organizerOnly, async (req, res) => {
  try {
    const ev = await Event.findById(req.params.id);
    if (!ev) return res.status(404).json({ msg: 'Not found' });
    if (ev.createdBy.toString() !== req.user._id.toString()) return res.status(403).json({ msg: 'Not allowed' });
    await ev.remove();
    res.json({ msg: 'Deleted' });
  } catch (err) {
    console.error('delete event error:', err);
    res.status(500).json({ msg: err.message });
  }
});

// Registration endpoints
router.post('/:id/register', auth, async (req, res) => {
  try {
    const ev = await Event.findById(req.params.id);
    if (!ev) return res.status(404).json({ msg: 'Event not found' });
    const exists = await Registration.findOne({ user: req.user._id, event: ev._id });
    if (exists) return res.status(400).json({ msg: 'Already registered' });
    const reg = new Registration({ user: req.user._id, event: ev._id });
    await reg.save();
    ev.attendees.push(req.user._id);
    await ev.save();
    res.json({ msg: 'Registered', ticketId: reg._id });
  } catch (err) {
    console.error('register error:', err);
    res.status(500).json({ msg: err.message });
  }
});

router.post('/:id/unregister', auth, async (req, res) => {
  try {
    const ev = await Event.findById(req.params.id);
    if (!ev) return res.status(404).json({ msg: 'Event not found' });
    await Registration.findOneAndDelete({ user: req.user._id, event: ev._id });
    ev.attendees = ev.attendees.filter(a => a.toString() !== req.user._id.toString());
    await ev.save();
    res.json({ msg: 'Unregistered' });
  } catch (err) {
    console.error('unregister error:', err);
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
