
/**
 * SchemeSphere Demo Authentication
 * Prototype only - not production authentication.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const ACCOUNTS_KEY = 'schemeSphereDemoAccounts';
const USER_KEY = 'schemeSphereUser';

// Read locally stored demo accounts
function getAccounts() {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '{}');
  } catch {
    return {};
  }
}

// Hash password for demo storage
async function hashPassword(password, salt) {
  const data = new TextEncoder().encode(`${salt}:${password}`);
  const hash = await crypto.subtle.digest('SHA-256', data);

  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

function createSalt() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));

  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

// Demo registration
export async function register({ name, email, password }) {
  try {
    const normalizedEmail = email.trim().toLowerCase();
    const accounts = getAccounts();

    if (accounts[normalizedEmail]) {
      return { success: false, status: 409 };
    }

    const salt = createSalt();
    const passwordHash = await hashPassword(password, salt);

    const user = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: normalizedEmail,
    };

    accounts[normalizedEmail] = { user, salt, passwordHash };

    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));

    return {
      success: true,
      status: 201,
      user,
      demoMode: true,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      error: error.message || 'Registration failed.',
    };
  }
}

// Demo login
export async function login({ email, password }) {
  try {
    const normalizedEmail = email.trim().toLowerCase();
    const account = getAccounts()[normalizedEmail];

    if (!account) {
      return { success: false, status: 404, notRegistered: true };
    }

    const passwordHash = await hashPassword(password, account.salt);

    if (passwordHash !== account.passwordHash) {
      return { success: false, status: 401 };
    }

    localStorage.setItem(USER_KEY, JSON.stringify(account.user));
    localStorage.removeItem('schemeSphereToken');

    return {
      success: true,
      status: 200,
      user: account.user,
      demoMode: true,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      error: error.message || 'Login failed.',
    };
  }
}

// Demo profile update
export async function updateProfile(profile) {
  try {
    const user = JSON.parse(localStorage.getItem(USER_KEY) || 'null');

    if (!user) {
      return { success: false, status: 401 };
    }

    const updatedUser = { ...user, ...profile };

    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));

    return {
      success: true,
      status: 200,
      user: updatedUser,
      demoMode: true,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      error: error.message || 'Profile update failed.',
    };
  }
}

// Backend API helper (used by assistantApi.js)
export async function apiRequest(
  endpoint,
  payload,
  { method = 'POST', token } = {}
) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        ...(payload !== undefined
          ? { 'Content-Type': 'application/json' }
          : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...(payload !== undefined
        ? { body: JSON.stringify(payload) }
        : {}),
    });

    const text = await response.text();

    let data = {};

    try {
      data = JSON.parse(text);
    } catch {
      data = { error: 'Invalid response from server.' };
    }

    return {
      success: response.ok,
      status: response.status,
      ...data,
      backendConnected: true,
    };
  } catch (error) {
    return {
      success: false,
      status: 503,
      backendConnected: false,
      error: error.message || 'Backend server is unreachable.',
    };
  }
}
