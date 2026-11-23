import jwt from 'jsonwebtoken';

export function authenticate(req, res, next) {
  const authorization = req.headers.authorization || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';

  if (!token) {
    return res.status(401).json({ error: 'Please log in to continue.' });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET || 'schemesphere_super_secret_jwt_key_2026';
    const tokenUser = jwt.verify(token, jwtSecret);
    if (typeof tokenUser.email !== 'string' || !tokenUser.email.trim()) {
      return res.status(401).json({ error: 'Your session is invalid. Please log in again.' });
    }
    req.userEmail = tokenUser.email.trim().toLowerCase();
    return next();
  } catch {
    return res.status(401).json({ error: 'Your session is invalid or expired. Please log in again.' });
  }
}
