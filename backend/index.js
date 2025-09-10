// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

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

// Import routes (ensure these files exist)
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');

// public health check
app.get('/health', (req, res) => res.json({ ok: true }));

// mount routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

app.get('/', (req, res) => res.json({ message: 'EventSphere backend running ✅' }));

async function start() {
  const PORT = process.env.PORT || 5000;
  const MONGO_URI = process.env.MONGO_URI;

  if (MONGO_URI) {
    // Connect to provided MongoDB (Atlas / hosted)
    try {
      await mongoose.connect(MONGO_URI, {
        // recommended options
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('✅ Connected to MongoDB (MONGO_URI)');
    } catch (err) {
      console.error('❌ MongoDB connection error (MONGO_URI):', err);
      process.exit(1);
    }
  } else {
    // Fallback: in-memory DB for local dev/testing
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
    console.log('✅ In-memory MongoDB started (no MONGO_URI provided)');
  }

  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

start().catch(err => {
  console.error('Startup error:', err);
  process.exit(1);
});
