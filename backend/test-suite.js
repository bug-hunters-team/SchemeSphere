import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authRoutes from './routes/auth.js';
import { getUsers, saveUsers, findUserByEmail } from './data/db.js';

function dispatch(method, url, body = {}, headers = {}) {
  return new Promise((resolve) => {
    let statusCode = 200;
    const req = {
      method: method.toUpperCase(),
      url,
      baseUrl: '/api/auth',
      originalUrl: `/api/auth${url}`,
      headers: { 'content-type': 'application/json', ...headers },
      body,
    };

    const res = {
      statusCode: 200,
      status(code) {
        statusCode = code;
        this.statusCode = code;
        return this;
      },
      setHeader() {
        return this;
      },
      json(data) {
        resolve({ status: statusCode, data });
        return this;
      },
      send(data) {
        resolve({ status: statusCode, data });
        return this;
      },
    };

    authRoutes(req, res, (error) => {
      resolve({
        status: error ? 500 : 404,
        data: { error: error?.message || 'Endpoint not found' },
      });
    });
  });
}

async function runTests() {
  console.log('============================================================');
  console.log('🧪 SchemeSphere Email and Password Authentication Tests');
  console.log('============================================================\n');

  const originalUsers = getUsers();
  saveUsers([]);

  let passedCount = 0;
  let failedCount = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passedCount++;
    } else {
      console.error(`❌ [FAIL] ${testName}`);
      failedCount++;
    }
  }

  try {
    const email = 'citizen@example.com';
    const password = 'SecurePassword123!';

    const missingName = await dispatch('POST', '/register', {
      email,
      password,
    });
    assert(missingName.status === 400, 'Registration requires a full name');

    const shortPassword = await dispatch('POST', '/register', {
      name: 'Citizen Example',
      email,
      password: 'short',
    });
    assert(shortPassword.status === 400, 'Registration rejects passwords shorter than 8 characters');

    const invalidEmail = await dispatch('POST', '/register', {
      name: 'Citizen Example',
      email: 'not-an-email',
      password,
    });
    assert(invalidEmail.status === 400, 'Registration rejects invalid email addresses');

    const registration = await dispatch('POST', '/register', {
      name: 'Citizen Example',
      email: ' Citizen@Example.com ',
      password,
    });
    const user = findUserByEmail(email);
    assert(registration.status === 201 && registration.data.success, 'Registration creates an account without OTP');
    assert(registration.data.email === email && user?.isVerified, 'Registration normalizes email and activates account');
    assert(user && await bcrypt.compare(password, user.password), 'Registration stores a bcrypt-hashed password');

    const duplicate = await dispatch('POST', '/register', {
      name: 'Citizen Example',
      email,
      password,
    });
    assert(duplicate.status === 409, 'Duplicate registration is rejected');

    const missingPassword = await dispatch('POST', '/login', { email });
    assert(missingPassword.status === 400, 'Login requires a password');

    const unknownUser = await dispatch('POST', '/login', {
      email: 'unknown@example.com',
      password,
    });
    assert(unknownUser.status === 404 && unknownUser.data.notRegistered, 'Login rejects unknown accounts');

    const incorrectPassword = await dispatch('POST', '/login', {
      email,
      password: 'IncorrectPassword123',
    });
    assert(incorrectPassword.status === 401, 'Login rejects an incorrect password');

    const login = await dispatch('POST', '/login', { email, password });
    assert(login.status === 200 && login.data.success, 'Valid credentials log in without OTP');
    assert(login.data.user?.email === email && typeof login.data.token === 'string', 'Successful login returns user and session token');

    const decodedToken = jwt.verify(
      login.data.token,
      process.env.JWT_SECRET || 'schemesphere_super_secret_jwt_key_2026'
    );
    assert(decodedToken.email === email, 'Login token contains the authenticated email');

    const unauthenticatedProfile = await dispatch('PUT', '/profile', {
      state: 'Maharashtra',
      interests: ['Agriculture'],
    });
    assert(unauthenticatedProfile.status === 401, 'Profile updates require authentication');

    const invalidPhone = await dispatch('PUT', '/profile', {
      name: 'Citizen Example',
      state: 'Maharashtra',
      phone: '123',
      interests: ['Agriculture'],
    }, { authorization: `Bearer ${login.data.token}` });
    assert(invalidPhone.status === 400, 'Profile rejects invalid optional mobile numbers');

    const profileUpdate = await dispatch('PUT', '/profile', {
      name: 'Updated Citizen Name',
      state: 'Maharashtra',
      district: 'Pune',
      phone: '+91 9876543210',
      interests: ['Agriculture', 'Education'],
      aadhaar: 'must-not-be-saved',
    }, { authorization: `Bearer ${login.data.token}` });
    const updatedUser = findUserByEmail(email);
    assert(profileUpdate.status === 200 && profileUpdate.data.success, 'Authenticated user can save profile preferences');
    assert(
      updatedUser.state === 'Maharashtra'
      && updatedUser.name === 'Updated Citizen Name'
      && updatedUser.district === 'Pune'
      && updatedUser.phone === '+91 9876543210'
      && updatedUser.interests.includes('Agriculture')
      && updatedUser.profileCompleted,
      'State, district, optional phone, and interests are persisted'
    );
    assert(!Object.hasOwn(updatedUser, 'aadhaar'), 'Identity document details are not saved');

    const oldOtpRoute = await dispatch('POST', '/send-login-otp', { email, password });
    assert(oldOtpRoute.status === 404, 'OTP authentication endpoints are removed');
  } catch (error) {
    console.error('Unexpected test error:', error);
    failedCount++;
  } finally {
    saveUsers(originalUsers);
  }

  console.log('\n============================================================');
  console.log(`📊 Test Results: ${passedCount} PASSED, ${failedCount} FAILED`);
  console.log('============================================================\n');
  process.exit(failedCount > 0 ? 1 : 0);
}

runTests();
