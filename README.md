# 🏛️ SchemeSphere
### National Government Schemes Discovery and Application Portal

**Discover Government Schemes. Understand Eligibility. Access Opportunities.**

SchemeSphere is a full-stack web application designed to help citizens discover and explore government schemes through a centralized digital platform. It aims to simplify access to government welfare programs by bringing scheme information, user authentication, profile management, and AI-powered assistance together in one place.

The platform provides a user-friendly frontend and a RESTful backend that work together to deliver an accessible and organized scheme discovery experience.

---

## 📌 Table of Contents

1. [Project Overview](#-project-overview)
2. [Problem Statement](#-problem-statement)
3. [Project Objectives](#-project-objectives)
4. [Key Features](#-key-features)
5. [Technology Stack](#-technology-stack)
6. [System Architecture](#-system-architecture)
7. [Application Workflow](#-application-workflow)
8. [Project Structure](#-project-structure)
9. [Prerequisites](#-prerequisites)
10. [Installation and Setup](#-installation-and-setup)
11. [Environment Variables](#-environment-variables)
12. [Running the Application](#-running-the-application)
13. [Frontend Documentation](#-frontend-documentation)
14. [Backend Documentation](#-backend-documentation)
15. [API Reference](#-api-reference)
16. [Database Design](#-database-design)
17. [Authentication and Security](#-authentication-and-security)
18. [Deployment](#-deployment)
19. [Testing](#-testing)
20. [Future Enhancements](#-future-enhancements)
21. [Contributors](#-contributors)
22. [Conclusion](#-conclusion)

---

## 🌐 Project Overview

SchemeSphere is developed to bridge the gap between citizens and government welfare schemes.

Finding relevant government schemes can be challenging because information is distributed across multiple government websites and portals. Citizens may struggle to identify schemes relevant to their circumstances and understand the available opportunities.

SchemeSphere aims to make this process easier through a centralized platform.

The application follows a full-stack architecture consisting of:

- **Frontend:** Provides the user interface and interactive experience.
- **Backend:** Handles API requests, authentication, business logic, and database operations.
- **Database:** Stores user information and government scheme records.
- **AI Integration:** Provides a foundation for intelligent assistance through configurable AI API integration.

The frontend communicates with the backend through REST APIs, while MongoDB provides persistent data storage.

## ❗ Problem Statement

Citizens often face difficulties accessing government welfare schemes due to:

- Information being distributed across multiple platforms.
- Difficulty identifying relevant schemes.
- Lack of centralized scheme information.
- Complex eligibility requirements.
- Difficulty managing personal information and accessing relevant services.

**Proposed Solution:**

SchemeSphere provides a centralized web platform that simplifies government scheme discovery and improves accessibility through a user-friendly interface and integrated backend services.

## 🎯 Project Objectives

The primary objectives of SchemeSphere are:

1. Develop a centralized government scheme discovery platform.
2. Provide a responsive and user-friendly web interface.
3. Implement secure user registration and authentication.
4. Manage user profiles through REST APIs.
5. Store and retrieve government scheme information using MongoDB.
6. Integrate an AI assistant through configurable API services.
7. Establish seamless communication between frontend and backend.
8. Develop a modular and maintainable full-stack architecture.
9. Deploy the application for public accessibility.

## ✨ Key Features

### 1. Frontend Features

- Responsive web application interface.
- Modern component-based React architecture.
- Navigation using React Router.
- User-friendly application pages.
- Tailwind CSS-based styling.
- Icon-based interface using Lucide React.
- Internationalization support using i18next.
- Frontend and backend API integration.

### 2. Backend Features

**Authentication**
- User registration.
- User login.
- JWT-based authentication.
- Secure password hashing using bcryptjs.
- Authentication middleware.

**User Profile Management**
- Retrieve user profile.
- Manage profile information.
- Protected profile APIs.

**Government Scheme Management**
- Government scheme catalog.
- Scheme information retrieval.
- MongoDB-based scheme storage.
- Synchronization of official scheme catalog records.

**AI Assistant**
- Dedicated assistant API module.
- Configurable AI provider endpoint.
- Configurable AI model.
- API-key-based external AI integration.

**Backend Infrastructure**
- RESTful API architecture.
- Express.js server.
- MongoDB integration using Mongoose.
- CORS configuration.
- Health-check endpoint.
- Centralized error handling.

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| Frontend Library | React 19 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS 4 |
| Routing | React Router 7 |
| Internationalization | i18next, react-i18next |
| Icons | Lucide React |
| Backend Runtime | Node.js |
| Backend Framework | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JSON Web Token |
| Password Security | bcryptjs |
| Configuration | dotenv |
| API Communication | REST APIs |
| Version Control | Git & GitHub |
| Backend Hosting | Render |

---

## 🏗️ System Architecture

SchemeSphere follows a client-server architecture in which the frontend communicates with the backend through REST APIs.

```text
                  USER
                    |
                    v
          FRONTEND APPLICATION
             React + Vite
                    |
          User Interface & Routing
                    |
                    v
              REST API
                    |
                    v
          BACKEND APPLICATION
             Node.js + Express
                    |
       +------------+------------+
       |            |            |
       v            v            v
   Authentication  Profile     Schemes
       |            |            |
       +------------+------------+
                    |
              AI Assistant
                    |
                    v
             Mongoose ODM
                    |
                    v
               MongoDB
```

### Architecture Components

| Component | Responsibility |
|---|---|
| React Frontend | Displays the application interface |
| React Router | Handles application navigation |
| API Layer | Sends requests to backend services |
| Express Server | Processes HTTP requests |
| Authentication | Validates user identity |
| Controllers / Services | Handle application logic |
| Mongoose | Manages database interactions |
| MongoDB | Stores persistent application data |
| AI Integration | Connects to the configured AI provider |

## 🔄 Application Workflow

The general application workflow is:

1. User opens the SchemeSphere application.
2. Frontend renders the required pages and components.
3. User interacts with the application.
4. Frontend sends HTTP requests to the backend.
5. Express routes identify the requested operation.
6. Authentication middleware validates protected requests.
7. Backend processes the business logic.
8. Mongoose communicates with MongoDB when required.
9. Backend sends a JSON response.
10. Frontend updates the interface based on the response.

---

## 📁 Project Structure

The repository contains both frontend and backend applications in a single project.

```text
SchemeSphere/
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   └── Application source files
│   │
│   ├── dist/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── ...
│
├── backend/
│   ├── data/
│   │   └── schemeCatalog.js
│   │
│   ├── middleware/
│   │   └── Authentication middleware
│   │
│   ├── models/
│   │   └── MongoDB models
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── profile.js
│   │   ├── schemes.js
│   │   └── assistant.js
│   │
│   ├── services/
│   ├── utils/
│   ├── server.js
│   ├── test-suite.js
│   ├── package.json
│   └── .env.example
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

*Note: This is a high-level repository structure. Additional source files and subdirectories are maintained within the respective applications.*

## 📋 Prerequisites

Before setting up SchemeSphere, install the following:

| Software | Requirement |
|---|---|
| Node.js | Compatible with project dependencies |
| npm | Included with Node.js |
| MongoDB | Local installation or MongoDB Atlas |
| Git | Latest stable version |
| Code Editor | VS Code recommended |

Verify installation:

```bash
node -v
npm -v
git --version
```

## 🚀 Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/bug-hunters-team/SchemeSphere.git
```

### 2. Navigate to the Project

```bash
cd SchemeSphere
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 4. Install Backend Dependencies

Open another terminal:

```bash
cd SchemeSphere/backend
npm install
```

### 5. Configure Environment Variables

Create a `.env` file inside the backend directory.

Refer to the `.env.example` file for the required configuration.



**Security Guidelines**

- Never commit `.env` files to GitHub.
- Never expose API keys or JWT secrets.
- Use `.env.example` to document required configuration.
- Use strong, unique secrets for production.

---

## ▶️ Running the Application

SchemeSphere contains two independent applications. Both servers must be running during local development.

### Option 1: Run Frontend

Terminal 1:

bash
cd frontend
npm run dev

Frontend URL:

text
http://localhost:5173

### Option 2: Run Backend

Terminal 2:

bash
cd backend
npm run dev


Backend URL:
text
http://localhost:5000


### Option 3: Run Using Root Scripts

From the project root:
bash
npm run dev


Starts the frontend development server.

To start the backend:

bash
npm run backend


**Important**: The root script for the backend is named `backend`, not `dev`.

### Available Scripts

**Root Application**

| Command | Description |
|---|---|
| `npm run dev` | Starts frontend development server |
| `npm run frontend` | Starts frontend |
| `npm run backend` | Starts backend |
| `npm run build` | Builds frontend |
| `npm test` | Runs backend test suite |

**Frontend**

| Command | Description |
|---|---|
| `npm run dev` | Starts Vite server |
| `npm run build` | Creates production build |
| `npm run preview` | Previews production build |
| `npm run lint` | Runs ESLint |

**Backend**

| Command | Description |
|---|---|
| `npm start` | Starts backend server |
| `npm run dev` | Starts backend with Node watch mode |
| `npm test` | Runs backend tests |

---

## 💻 Frontend Documentation

The frontend is developed using React 19 and Vite.

### Frontend Responsibilities

- Render application pages and components.
- Handle user interactions.
- Manage application navigation.
- Communicate with backend REST APIs.
- Display server responses.
- Support internationalization.
- Provide a responsive user experience.

### Frontend Technologies

**React 19:** Component-based user interface development.

**Vite:** Fast development server and optimized production builds.

**Tailwind CSS:** Utility-first styling.

**React Router:** Client-side navigation.

**i18next:** Internationalization infrastructure.

**Lucide React:** Icon library.

### Frontend Build

To generate the production build:

bash
cd frontend
npm run build


The generated files are available in:

text
frontend/dist/




## ⚙️ Backend Documentation

The backend is developed using Node.js and Express.js.

It provides REST APIs for communication with the frontend.

### Backend Responsibilities

- Handle incoming HTTP requests.
- Authenticate and authorize users.
- Manage user profile operations.
- Retrieve and manage scheme information.
- Integrate AI assistant services.
- Communicate with MongoDB.
- Return structured JSON responses.

### Backend API Modules

| Module | Responsibility |
|---|---|
| Authentication | Registration, login and authentication |
| Profile | User profile operations |
| Schemes | Government scheme operations |
| Assistant | AI assistant integration |

### Backend Health Check

Endpoint:

http
GET /api/health


This endpoint provides information about:

- Backend service status.
- Service name.
- API version.
- Server timestamp.
- Database connection status.

Example response:

```json
{
  "status": "ok",
  "service": "SchemeSphere API",
  "version": "1.0.0",
  "database": "ready"
}
```

*The response above illustrates a successful database connection. The actual status depends on the running environment.*

## 🔗 API Reference

### API Base URL

**Local Development**

text
http://localhost:5000/api

**Production**

text
https://schemesphere.onrender.com/api/health

### Available API Modules

| Module | Base Endpoint | Purpose |
|---|---|---|
| Authentication | `/api/auth` | User authentication |
| Profile | `/api/profile` | Profile management |
| Schemes | `/api/schemes` | Scheme information |
| Assistant | `/api/assistant` | AI assistant services |
| Health | `/api/health` | Server health status |

### API Communication Workflow

```text
React Frontend
      |
      v
HTTP Request
      |
      v
Express Router
      |
      v
Authentication Middleware
      |
      v
Controller / Service
      |
      v
MongoDB (when required)
      |
      v
JSON Response
      |
      v
React Frontend
```

All API requests and responses use JSON where applicable.

*For exact request methods, parameters, and response schemas, refer to the corresponding backend route implementations.*

---

## 🗄️ Database Design

SchemeSphere uses MongoDB as its primary database and Mongoose as the ODM.

### Database Responsibilities

- Store user information.
- Maintain application records.
- Store government scheme information.
- Support backend data retrieval and updates.

### Government Scheme Catalog

The backend contains an official scheme catalog and synchronizes its records with MongoDB during a successful database connection.

The scheme data is managed through the GovernmentScheme model.

### Database Connection Workflow

text
Backend Server Starts
        |
        v
Read MONGODB_URI
        |
        v
Connect to MongoDB
        |
        v
Synchronize Scheme Catalog
        |
        v
Database Ready


If MongoDB is not configured or unavailable, database-dependent APIs cannot operate normally. The health endpoint reports the database status.

---

## 🔒 Authentication and Security

SchemeSphere uses JWT-based authentication.

### Authentication Workflow

       User Registration
              |
              v
       Password Hashing
          (bcryptjs)
              |
              v
       User Authentication
              |
              v
       JWT Token Generation
              |
              v
       Authorization Header
              |
              v
       Authentication Middleware
              |
              v
       Protected API Access


### Authorization Header

Protected API requests use the following format:

```http
Authorization: Bearer <your_jwt_token>
```

### Security Measures

- JWT-based authentication.
- Password hashing using bcryptjs.
- Protected backend routes.
- Environment-based configuration.
- CORS configuration.
- Secure handling of API credentials.
- Centralized backend error handling.

---

## 🌍 Deployment

The project uses a separate deployment approach for the frontend and backend.

### Backend Deployment

The backend is configured for deployment using Render.

General deployment steps:

1. Push the latest source code to GitHub.
2. Connect the repository to Render.
3. Configure the backend root directory.
4. Configure the build and start commands.
5. Add required environment variables.
6. Deploy the backend.
7. Verify the deployment using `/api/health`.

**Backend Start Command**

```bash
npm start
```

### Frontend Deployment

The frontend can be deployed as a Vite application using a compatible static hosting provider.

General deployment configuration:

| Setting | Value |
|---|---|
| Root Directory | `frontend` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

Configure the frontend to communicate with the deployed backend URL according to the API configuration used by the application.

### Deployment Architecture

```text
             GitHub Repository
                    |
          +---------+---------+
          |                   |
          v                   v
      Frontend             Backend
      Deployment           Render
          |                   |
          v                   v
      React + Vite       Express Server
                              |
                              v
                          MongoDB
```

---

## 🧪 Testing

The project includes a backend test suite.

Run backend tests:

```bash
cd backend
npm test
```

Frontend quality checks:

```bash
cd frontend
npm run lint
```

Frontend production build verification:

```bash
npm run build
```

### Manual Testing

The following areas should be tested:

- Application page loading.
- Frontend and backend connectivity.
- User registration and login.
- JWT-protected requests.
- Profile API operations.
- Scheme API operations.
- AI assistant integration.
- Database connection and health status.
- Error handling for unavailable services.

---

## 🚀 Future Enhancements

Potential improvements for SchemeSphere include:

1. Advanced scheme search and filtering.
2. Personalized scheme recommendations.
3. Automated eligibility assessment.
4. AI-powered multilingual assistance.
5. Voice-based interaction.
6. Document management and application tracking.
7. Scheme application status notifications.
8. Improved accessibility for different user groups.
9. Admin dashboard for scheme management.
10. Integration with additional official government data sources.

---

## 👥 Contributors

**Project Team – Bug Hunters**

SchemeSphere is developed collaboratively by the Bug Hunters team.

| Contributor | Contribution |
|---|---|
| Team Member 1 | Frontend / Backend |
| Team Member 2 | Frontend / Backend |
| Team Member 3 | Frontend / Backend |
| Team Member 4 | Frontend / Backend |

*Update the contributor names and responsibilities based on the actual team assignments.*

### Repository

GitHub: https://github.com/bug-hunters-team/SchemeSphere

---

## 📝 Conclusion

SchemeSphere aims to simplify access to government welfare schemes through a centralized digital platform.

By combining a modern React frontend, a Node.js and Express backend, MongoDB database integration, JWT authentication, and AI assistant integration, the project establishes a foundation for an accessible and scalable government scheme discovery application.

The modular architecture supports future improvements, including personalized recommendations, intelligent eligibility assistance, multilingual interaction, and enhanced citizen services.

**SchemeSphere – Making Government Schemes More Accessible to Everyone.**

---

*Developed with ❤️ by Team Bug Hunters.*
