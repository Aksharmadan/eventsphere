// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// quick logger for debugging
app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.url} - body:`, req.body, ' headers:', {
    authorization: req.headers['authorization']
  });
  next();
});

// Import routes
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');

// Public health check
app.get('/health', (req, res) => res.json({ ok: true }));

// mount routes (auth MUST be mounted before any auth-protected middleware)
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

app.get('/', (req, res) => res.json({ message: 'EventSphere backend running ✅' }));

async function start() {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
  console.log('✅ In-memory MongoDB started');
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

start().catch(err => {
  console.error('Startup error:', err);
  process.exit(1);
});
