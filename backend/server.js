import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import GovernmentScheme from './models/GovernmentScheme.js';
import { officialSchemeCatalog } from './data/schemeCatalog.js';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import schemeRoutes from './routes/schemes.js';
import assistantRoutes from './routes/assistant.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
app.locals.mongoReady = false;
app.locals.mongoStatus = process.env.MONGODB_URI ? 'connecting' : 'not_configured';

// CORS Configuration
app.use(cors({
  origin: [CLIENT_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}));

// Body Parser Middleware
app.use(express.json());

// Healthcheck Route
app.get('/api/health', (req, res) => {
  res.json({
    status: req.app.locals.mongoReady ? 'ok' : 'degraded',
    service: 'SchemeSphere API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    database: req.app.locals.mongoStatus,
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/assistant', assistantRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[SchemeSphere Server Error]', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log('=======================================================');
  console.log(`🏛️ SchemeSphere Backend API Server Running on port ${PORT}`);
  console.log(`🌐 Healthcheck: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Auth Endpoints: http://localhost:${PORT}/api/auth/*`);
  console.log(`🗂️ Profile and scheme API: http://localhost:${PORT}/api/profile and /api/schemes`);
  console.log(`💻 Allowed Client: ${CLIENT_URL}`);
  console.log('=======================================================');
});

async function connectMongo() {
  if (!process.env.MONGODB_URI) {
    console.error('[SchemeSphere MongoDB] MONGODB_URI is not configured. Profile and scheme APIs will return 503.');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await GovernmentScheme.bulkWrite(officialSchemeCatalog.map((scheme) => ({
      updateOne: {
        filter: { schemeId: scheme.schemeId },
        update: { $set: scheme },
        upsert: true,
      },
    })));
    app.locals.mongoReady = true;
    app.locals.mongoStatus = 'ready';
    console.log(`[SchemeSphere MongoDB] Connected and synchronized ${officialSchemeCatalog.length} official scheme records.`);
  } catch (error) {
    app.locals.mongoStatus = 'unavailable';
    console.error('[SchemeSphere MongoDB] Connection or scheme-catalog setup failed:', error.message);
  }
}

connectMongo();
