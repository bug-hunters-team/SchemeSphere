/**
 * SchemeSphere Authentication API Service
 * 
 * Provides integration functions for direct email/password registration and login.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Helper to make backend requests with robust error unpacking
export async function apiRequest(endpoint, payload, { method = 'POST', token } = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        ...(payload !== undefined ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...(payload !== undefined ? { body: JSON.stringify(payload) } : {}),
    });

    const text = await response.text();
    let data = {};
    try {
      data = JSON.parse(text);
    } catch {
      if (text.includes('ECONNREFUSED') || response.status === 500 || response.status === 502 || response.status === 504) {
        return {
          success: false,
          status: 503,
          backendConnected: false,
          error: 'Backend authentication server is not running on port 5000. Please start it using "npm start" inside the backend folder.',
        };
      }
      data = { error: 'Invalid response from authentication server.' };
    }

    if (data.code === 'ECONNREFUSED' || (data.message && data.message.includes('ECONNREFUSED'))) {
      return {
        success: false,
        status: 503,
        backendConnected: false,
        error: 'Backend authentication server is not running on port 5000. Please start it using "npm start" inside the backend folder.',
      };
    }

    return {
      success: response.ok,
      status: response.status,
      ...data,
      backendConnected: true,
    };
  } catch (err) {
    return {
      success: false,
      status: 503,
      backendConnected: false,
      error: `Backend authentication server is offline or unreachable at ${API_BASE_URL}. Please ensure the backend server is running on port 5000 (cd backend; npm start).`,
      details: err.message,
    };
  }
}

/**
 * Register a citizen account.
 * Endpoint: POST /api/auth/register
 */
export async function register({ name, email, password }) {
  return await apiRequest('/auth/register', { name, email, password });
}

/**
 * Authenticate with email and password.
 * Endpoint: POST /api/auth/login
 */
export async function login({ email, password }) {
  const result = await apiRequest('/auth/login', { email, password });

  if (result.success && result.user) {
    localStorage.setItem('schemeSphereUser', JSON.stringify(result.user));
    if (result.token) {
      localStorage.setItem('schemeSphereToken', result.token);
    }
  }

  return result;
}

export async function updateProfile(profile) {
  const token = localStorage.getItem('schemeSphereToken');
  if (!token) {
    return {
      success: false,
      status: 401,
      error: 'Please log in again before updating your profile.',
    };
  }

  const result = await apiRequest('/auth/profile', profile, {
    method: 'PUT',
    token,
  });
  if (result.success && result.user) {
    localStorage.setItem('schemeSphereUser', JSON.stringify(result.user));
    if (result.token) {
      localStorage.setItem('schemeSphereToken', result.token);
    }
  }
  return result;
}
