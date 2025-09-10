// backend/middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.auth = async (req, res, next) => {
  try {
    const header = req.header('Authorization') || '';
    const token = header.replace('Bearer ', '').trim();
    if (!token) {
      console.log('[AUTH] no token provided');
      return res.status(401).json({ msg: 'No token' });
    }
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    } catch (err) {
      console.log('[AUTH] token invalid:', err.message);
      return res.status(401).json({ msg: 'Token invalid' });
    }
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      console.log('[AUTH] user not found for id', decoded.id);
      return res.status(401).json({ msg: 'User not found' });
    }
    next();
  } catch (err) {
    console.error('[AUTH] unexpected error', err);
    res.status(500).json({ msg: 'Auth error' });
  }
};

exports.organizerOnly = (req, res, next) => {
  if (!req.user) return res.status(401).json({ msg: 'Not authenticated' });
  if (req.user.role !== 'organizer') {
    console.log('[ORGANIZER ONLY] blocked user role=', req.user.role);
    return res.status(403).json({ msg: 'Organizers only' });
  }
  next();
};
