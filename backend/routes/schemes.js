import express from 'express';
import CitizenProfile from '../models/CitizenProfile.js';
import GovernmentScheme from '../models/GovernmentScheme.js';
import { authenticate } from '../middleware/authenticate.js';
import { groupSchemeMatches } from '../services/schemeMatching.js';

const router = express.Router();

function isDatabaseReady(req, res, next) {
  if (req.app.locals.mongoReady !== true) {
    return res.status(503).json({
      error: 'Scheme discovery is unavailable. Configure MONGODB_URI and ensure MongoDB is reachable.',
    });
  }
  return next();
}

router.get('/', isDatabaseReady, async (req, res, next) => {
  try {
    const schemes = await GovernmentScheme.find().sort({ name: 1 }).lean();
    return res.json({ success: true, schemes });
  } catch (error) {
    return next(error);
  }
});

router.get('/matches', authenticate, isDatabaseReady, async (req, res, next) => {
  try {
    const profile = await CitizenProfile.findOne({ email: req.userEmail }).lean();
    if (!profile) {
      return res.status(409).json({ error: 'Complete your profile before discovering schemes.' });
    }
    const schemes = await GovernmentScheme.find().sort({ name: 1 }).lean();
    return res.json({ success: true, ...groupSchemeMatches(schemes, profile) });
  } catch (error) {
    return next(error);
  }
});

export default router;
