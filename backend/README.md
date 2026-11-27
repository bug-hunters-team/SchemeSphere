# SchemeSphere – Backend API

### National Government Schemes Discovery and Application Portal

**Discover Government Schemes. Understand Eligibility. Access Opportunities.**

## Overview

SchemeSphere is a prototype full-stack web application designed to help citizens discover and explore government welfare schemes through a centralized digital platform.

The backend provides REST APIs for user authentication, citizen profile management, government scheme discovery, profile-based scheme matching, and AI-powered assistance.

It acts as the communication layer between the frontend and the application's data and services.

## Objectives

- Provide APIs for user registration and login.
- Support citizen profile management.
- Provide government scheme information.
- Help users discover schemes based on their profile details.
- Offer AI-powered assistance for scheme-related queries.
- Support multilingual interactions.

## Key Features

- **User Authentication:** Registration and login with password hashing and JWT-based authentication.
- **Profile Management:** Create, retrieve, and update citizen profile information.
- **Scheme Discovery:** Retrieve government scheme information from the available scheme catalog.
- **Scheme Matching:** Identify potentially relevant schemes based on user profile details.
- **AI Assistant:** Handle scheme-related questions through an AI-compatible API.
- **Input Validation:** Validate user information and email addresses.
- **Protected Routes:** Restrict profile-related operations to authenticated users.

## Technology Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend framework |
| JavaScript | Backend development |
| JSON | Prototype data storage |
| JWT | Authentication and authorization |
| bcryptjs | Password hashing |
| Nodemailer | Email-related functionality, if configured |
| OpenAI-compatible API | AI assistant integration |
| REST API | Frontend-backend communication |

## Backend Project Structure

```text
backend/
│
├── data/
│   ├── db.js
│   ├── schemeCatalog.js
│   └── users.json
│
├── middleware/
│   └── authenticate.js
│
├── models/
│   ├── CitizenProfile.js
│   └── GovernmentScheme.js
│
├── routes/
│   ├── assistant.js
│   ├── auth.js
│   ├── profile.js
│   └── schemes.js
│
├── services/
│   └── schemeMatching.js
│
├── utils/
│   ├── profileValidation.js
│   └── validateEmail.js
│
├── .env
├── .env.example
├── package.json
├── package-lock.json
├── server.js
├── test-suite.js
└── README.md
```

## Installation and Setup

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/bug-hunters-team/SchemeSphere.git
```

### 2. Navigate to the Backend Directory

```bash
cd SchemeSphere/backend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the backend root directory.

You can use `.env.example` as a reference for the required configuration.

Example configuration:

```env
PORT=5000

CLIENT_URL=http://localhost:5173

JWT_SECRET=replace_with_a_long_random_secret

AI_API_KEY=your_ai_api_key

AI_API_URL=your_ai_api_url

AI_MODEL=your_ai_model
```

### Environment Variable Description

| Variable | Description |
|---|---|
| `PORT` | Port on which the backend server runs |
| `CLIENT_URL` | Frontend URL used for client configuration |
| `JWT_SECRET` | Secret key used for JWT signing and verification |
| `AI_API_KEY` | API key used to access the AI service |
| `AI_API_URL` | AI-compatible chat completion endpoint |
| `AI_MODEL` | AI model identifier used by the assistant |

**Note:** AI-related variables are required only when using the AI assistant. Replace the example values with valid configuration. Never commit your actual `.env` file or API keys to GitHub.

### 5. Start the Backend Server

For production/start command:

```bash
npm start
```

For development:

```bash
npm run dev
```

The backend server runs at:

```text
http://localhost:5000
```

The actual commands depend on the scripts configured in `package.json`.

## API Documentation

The backend exposes REST API endpoints for authentication, profile management, scheme discovery, and AI assistance.

**Base URL (Local):**

```text
http://localhost:5000/api
```

**Base URL (Deployed):**

```text
https://schemesphere.onrender.com/api
```

### 1. Health Check

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Checks backend server status |

### 2. Authentication APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Registers a new citizen |
| POST | `/api/auth/login` | Authenticates a citizen and issues a JWT |
| PUT | `/api/auth/profile` | Updates account preferences |

### 3. Citizen Profile APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/profile` | Retrieves the authenticated citizen's profile |
| PUT | `/api/profile` | Updates the authenticated citizen's profile |

### 4. Government Scheme APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/schemes` | Retrieves available government schemes |
| GET | `/api/schemes/matches` | Retrieves schemes relevant to the user's profile |

### 5. AI Assistant API

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/assistant/chat` | Processes scheme-related questions using the AI assistant |

**Note:** Refer to the corresponding route files for exact request parameters and response formats.

## Authentication and Authorization

SchemeSphere uses JSON Web Tokens (JWT) for authentication.

The authentication process works as follows:

1. A citizen registers using the required details.
2. The backend validates the registration information.
3. The password is hashed using `bcryptjs`.
4. During login, the backend verifies the credentials.
5. A JWT session token is issued after successful authentication.
6. Protected API routes verify the token before allowing access.

For protected endpoints, include the token in the request header:

```http
Authorization: Bearer <token>
```

## Prototype Data Management

SchemeSphere is developed as a prototype and does not use MongoDB or another database server.

The application uses local project data and JSON-based resources for its prototype implementation.

The backend contains:

- `users.json` – Local user-related data.
- `schemeCatalog.js` – Government scheme catalog information.
- `CitizenProfile.js` – Citizen profile-related application logic.
- `GovernmentScheme.js` – Government scheme-related application logic.

This approach supports prototype-level functionality without requiring an external database setup.

**Note:** Local file-based storage is intended for prototype and demonstration purposes. It is not a substitute for production-grade persistent database storage.

## Government Scheme Matching

SchemeSphere includes a scheme-matching service to help citizens discover potentially relevant government schemes.

The matching process:

1. Retrieves the citizen's available profile information.
2. Examines relevant scheme information.
3. Compares profile details with the occupation focus of the schemes.
4. Identifies potentially relevant schemes.
5. Returns matching results with reasons.

The matching functionality is intended to assist scheme discovery. It does not provide an official eligibility decision.

Final eligibility and approval are determined by the respective government departments or authorized institutions.

## AI Assistant Integration

SchemeSphere includes an AI assistant to help users understand government schemes and obtain answers to scheme-related questions.

The backend communicates with an OpenAI-compatible chat completion API.

The integration uses the following environment variables:

- `AI_API_KEY`
- `AI_API_URL`
- `AI_MODEL`

The assistant supports language-specific interactions using the selected language code.

If the AI service is not configured or unavailable, the API may return an appropriate service-unavailable response instead of generating a fabricated answer.

## Input Validation

The backend includes validation utilities to improve data consistency and reliability.

- Email validation through `validateEmail.js`.
- Citizen profile validation through `profileValidation.js`.
- Authentication middleware for protected routes.
- Validation of incoming user information.

## Error Handling

The backend handles API errors and invalid requests through appropriate HTTP responses.

Examples include:

| Status Code | Meaning |
|---|---|
| 200 | Request successful |
| 201 | Resource created successfully |
| 400 | Invalid request |
| 401 | Authentication required or invalid |
| 403 | Access forbidden |
| 404 | Resource not found |
| 500 | Internal server error |
| 503 | Required external service unavailable |

## Testing

The project includes a backend test file:

```text
test-suite.js
```

Run the test command configured in `package.json` to execute the available tests.

## Deployment

The backend is deployed using Render.

**Live Backend:**

[https://schemesphere.onrender.com](https://schemesphere.onrender.com)

**Health Check:**

[https://schemesphere.onrender.com/api/health](https://schemesphere.onrender.com/api/health)

### Render Deployment Configuration

| Setting | Value |
|---|---|
| Service Type | Web Service |
| Root Directory | `backend` |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Health Check Path | `/api/health` |

Configure the required environment variables in the Render dashboard before deploying.

## Security Considerations

- Passwords are hashed before being stored.
- JWT authentication is used to protect restricted endpoints.
- Sensitive configuration values are maintained in environment variables.
- Input validation is performed for relevant user information.
- Aadhaar numbers and DigiLocker credentials are not collected by the application.

## Official Government Scheme Sources

The scheme catalog references information from government portals, including:

- [PM-KISAN Official Portal](https://pmkisan.gov.in/)
- [PM SVANidhi Official Portal](https://pmsvanidhi.mohua.gov.in/)

Users should always refer to the respective official portals for the latest scheme details, eligibility conditions, and application procedures.

## Future Enhancements

- Integration with a production-grade database.
- Improved scheme recommendation and matching algorithms.
- Additional government scheme coverage.
- Enhanced multilingual AI assistance.
- Advanced profile management.
- Improved API testing and monitoring.
- Additional security and performance improvements.

## Learning Outcomes

Developing the SchemeSphere backend provides practical experience in:

- Building REST APIs using Node.js and Express.js.
- Implementing JWT-based authentication.
- Password hashing and secure credential handling.
- Organizing backend code into routes, middleware, services, and utilities.
- Managing prototype data using local JSON-based resources.
- Integrating external AI APIs.
- Implementing profile-based matching logic.
- Deploying backend services using Render.

## Conclusion

The SchemeSphere backend provides the core APIs required for the SchemeSphere prototype.

It connects the frontend with authentication, citizen profile management, government scheme discovery, scheme matching, and AI-assisted interactions.

The project demonstrates how backend technologies can be used to build a centralized platform that makes government scheme information easier to discover and understand.

---

**SchemeSphere – Discover Government Schemes. Understand Eligibility. Access Opportunities.**
