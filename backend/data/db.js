import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname);

const USERS_FILE = path.join(DATA_DIR, 'users.json');
// Ensure data files exist
function ensureFiles() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

ensureFiles();

export function getUsers() {
  try {
    ensureFiles();
    const content = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(content || '[]');
  } catch {
    return [];
  }
}

export function saveUsers(users) {
  ensureFiles();
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
}

export function findUserByEmail(email) {
  if (!email) return null;
  const users = getUsers();
  const normalized = email.trim().toLowerCase();
  return users.find((u) => u.email.toLowerCase() === normalized) || null;
}

export function saveUser(userData) {
  const users = getUsers();
  const normalized = userData.email.trim().toLowerCase();
  const index = users.findIndex((u) => u.email.toLowerCase() === normalized);
  
  if (index >= 0) {
    users[index] = { ...users[index], ...userData };
  } else {
    users.push(userData);
  }
  saveUsers(users);
  return userData;
}
