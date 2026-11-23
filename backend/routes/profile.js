import express from 'express';
import CitizenProfile from '../models/CitizenProfile.js';
import { authenticate } from '../middleware/authenticate.js';
import { validateProfile } from '../utils/profileValidation.js';

const router = express.Router();

function isDatabaseReady(req, res, next) {
  if (req.app.locals.mongoReady !== true) {
    return res.status(503).json({
      error: 'Profile storage is unavailable. Configure MONGODB_URI and ensure MongoDB is reachable.',
    });
  }
  return next();
}

router.use(authenticate, isDatabaseReady);

router.get('/', async (req, res, next) => {
  try {
    const profile = await CitizenProfile.findOne({ email: req.userEmail }).lean();
    return res.json({ success: true, profile });
  } catch (error) {
    return next(error);
  }
});

router.put('/', async (req, res, next) => {
  const { errors, profile } = validateProfile(req.body || {});
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ error: 'Please correct the highlighted profile details.', fieldErrors: errors });
  }

  try {
    const savedProfile = await CitizenProfile.findOneAndUpdate(
      { email: req.userEmail },
      { ...profile, email: req.userEmail },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
    ).lean();
    return res.json({ success: true, profile: savedProfile });
  } catch (error) {
    return next(error);
  }
});

export default router;
