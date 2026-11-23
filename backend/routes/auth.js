import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { isValidEmail } from '../utils/validateEmail.js';
import { findUserByEmail, saveUser } from '../data/db.js';

const router = express.Router();
const PROFILE_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
];
const PROFILE_INTERESTS = [
  'Agriculture', 'Education', 'Healthcare', 'Employment', 'Women Empowerment',
  'Housing', 'Financial Assistance', 'Social Welfare',
];

function createSessionToken(user) {
  const jwtSecret = process.env.JWT_SECRET || 'schemesphere_super_secret_jwt_key_2026';
  return jwt.sign(
    { email: user.email, name: user.name },
    jwtSecret,
    { expiresIn: '7d' }
  );
}

function publicUser(user) {
  return {
    name: user.name,
    email: user.email,
    state: user.state,
    district: user.district || '',
    phone: user.phone || '',
    interests: Array.isArray(user.interests) ? user.interests : [],
    category: user.category || '',
    profileCompleted: Boolean(user.profileCompleted),
  };
}

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'Full name is required.' });
    }
    if (typeof email !== 'string' || !isValidEmail(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }
    if (typeof password !== 'string' || password.length < 8) {
      return res.status(400).json({ error: 'Password must have a minimum of 8 characters.' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (findUserByEmail(normalizedEmail)) {
      return res.status(409).json({
        error: 'An account with this email address already exists. Please log in.',
      });
    }

    const user = {
      name: name.trim(),
      email: normalizedEmail,
      password: await bcrypt.hash(password, 10),
      state: '',
      district: '',
      phone: '',
      interests: [],
      profileCompleted: false,
      occupation: '',
      category: '',
      isVerified: true,
      verifiedAt: new Date().toISOString(),
    };
    saveUser(user);

    return res.status(201).json({
      success: true,
      message: 'Your account has been created. You can now log in.',
      email: normalizedEmail,
    });
  } catch (error) {
    console.error('[Auth Error - Register]', error);
    return res.status(500).json({ error: 'Server error processing registration request.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (typeof email !== 'string' || !isValidEmail(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }
    if (typeof password !== 'string' || !password) {
      return res.status(400).json({ error: 'Password is required.' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = findUserByEmail(normalizedEmail);
    if (!user) {
      return res.status(404).json({
        error: 'No account found with this email address. Please register first.',
        notRegistered: true,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Incorrect email or password.' });
    }

    const sessionUser = publicUser(user);
    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      token: createSessionToken(user),
      user: sessionUser,
    });
  } catch (error) {
    console.error('[Auth Error - Login]', error);
    return res.status(500).json({ error: 'Server error processing login request.' });
  }
});

router.put('/profile', (req, res) => {
  const authorization = req.headers.authorization || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  if (!token) {
    return res.status(401).json({ error: 'Please log in to update your profile.' });
  }

  let tokenUser;
  try {
    const jwtSecret = process.env.JWT_SECRET || 'schemesphere_super_secret_jwt_key_2026';
    tokenUser = jwt.verify(token, jwtSecret);
  } catch {
    return res.status(401).json({ error: 'Your session is invalid or expired. Please log in again.' });
  }

  const user = findUserByEmail(tokenUser.email);
  if (!user) {
    return res.status(404).json({ error: 'Account not found. Please register again.' });
  }

  const { name, state, district = '', phone = '', interests } = req.body;
  if (typeof name !== 'string' || !name.trim() || name.trim().length > 100) {
    return res.status(400).json({ error: 'Name is required and must be 100 characters or fewer.' });
  }
  if (typeof state !== 'string' || !PROFILE_STATES.includes(state)) {
    return res.status(400).json({ error: 'Please select a valid state or union territory.' });
  }
  if (typeof district !== 'string' || district.trim().length > 100) {
    return res.status(400).json({ error: 'District must be 100 characters or fewer.' });
  }
  if (
    typeof phone !== 'string'
    || (phone.trim() && !/^(?:\+91[\s-]?)?[6-9]\d{9}$/.test(phone.trim()))
  ) {
    return res.status(400).json({ error: 'Enter a valid 10-digit Indian mobile number, or leave it blank.' });
  }
  if (
    !Array.isArray(interests)
    || interests.some((interest) => !PROFILE_INTERESTS.includes(interest))
    || new Set(interests).size !== interests.length
  ) {
    return res.status(400).json({ error: 'Please select valid scheme interests.' });
  }

  const updatedUser = saveUser({
    email: user.email,
    name: name.trim(),
    state,
    district: district.trim(),
    phone: phone.trim(),
    interests,
    profileCompleted: true,
    category: user.category || '',
  });

  return res.status(200).json({
    success: true,
    message: 'Your profile has been updated.',
    user: publicUser(updatedUser),
    token: createSessionToken(updatedUser),
  });
});

export default router;
