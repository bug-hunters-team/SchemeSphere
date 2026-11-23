# SchemeSphere – Backend API Server

This server provides account authentication, MongoDB-backed citizen profiles, and a sourced government-scheme catalog.

---

## Features

- **Password Hashing** with `bcryptjs`
- **Session Tokens** with `jsonwebtoken`
- **Citizen profiles and scheme records** with MongoDB
- **Profile-based scheme matching** using the scheme catalog's stated occupation focus

---

## Getting Started

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`, then set a reachable MongoDB connection string and a private JWT signing secret:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/schemesphere
JWT_SECRET=replace_with_a_long_random_secret
```

### 3. Start the Server
```bash
npm start
# or for auto-reloading during development:
npm run dev
```

The server runs at: `http://localhost:5000`

---

## API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Healthcheck & service status |
| `POST` | `/api/auth/register` | Creates a citizen account after validating details |
| `POST` | `/api/auth/login` | Validates email and password, then issues a JWT session token |
| `PUT` | `/api/auth/profile` | Updates legacy account preferences |
| `GET` | `/api/profile` | Gets the authenticated citizen's MongoDB profile |
| `PUT` | `/api/profile` | Validates and saves the authenticated citizen's full profile in MongoDB |
| `GET` | `/api/schemes` | Gets the official scheme catalog |
| `GET` | `/api/schemes/matches` | Matches the saved profile to schemes and returns reasons |
| `POST` | `/api/assistant/chat` | Answers a scheme question in the requested supported language |

Profile and match endpoints require an `Authorization: Bearer <token>` header. Aadhaar and DigiLocker credentials or document numbers are not collected. The scheme catalog is seeded from official government portals when MongoDB connects. Without `MONGODB_URI` or an available database, profile and scheme endpoints return HTTP 503; they do not fall back to demo data.

The matching result is a discovery aid, not a government eligibility decision. A profile match only identifies a relevant occupation; the official authority or lender must verify all scheme rules and documents. Current catalog sources: [PM-KISAN](https://pmkisan.gov.in/) and [PM SVANidhi](https://pmsvanidhi.mohua.gov.in/).

The assistant route uses an OpenAI-compatible chat-completions endpoint configured with `AI_API_KEY`, `AI_API_URL`, and `AI_MODEL`. It returns HTTP 503 when no key is configured; it does not fabricate a response. The selected language code is validated and included in a system instruction. Only the user's question is sent to the configured provider.
