# 🏛️ SchemeSphere

### National Government Schemes Discovery and Application Portal

**Discover Government Schemes. Understand Eligibility. Access Opportunities.**

SchemeSphere is a full-stack web application designed to make government scheme information easier to discover and understand. It provides a centralized platform where citizens can explore government schemes, understand eligibility criteria, and access relevant scheme information.

---

## 🌐 Project Links

- **Frontend (Live Website):** [https://scheme-sphere-k6xjrnrdt-lalitha-yelisetti.vercel.app/](https://scheme-sphere-k6xjrnrdt-lalitha-yelisetti.vercel.app/)
- **Backend (API Health Check):** [https://schemesphere.onrender.com/api/health](https://schemesphere.onrender.com/api/health)
- **GitHub Repository:** [https://github.com/bug-hunters-team/SchemeSphere](https://github.com/bug-hunters-team/SchemeSphere)

---

## 📌 Problem Statement

Citizens often face difficulties accessing government schemes due to:

- Information being distributed across multiple websites and platforms.
- Difficulty identifying relevant government schemes.
- Lack of centralized scheme information.
- Complex eligibility requirements.
- Difficulty understanding application procedures.

## 💡 Proposed Solution

SchemeSphere provides a centralized web platform that helps citizens discover government schemes, understand their eligibility requirements, and access relevant information through a simple and user-friendly interface.

---

## 🎯 Objectives

- Provide centralized access to government scheme information.
- Simplify the process of discovering government schemes.
- Help users understand eligibility requirements.
- Improve accessibility of scheme-related information.
- Provide a user-friendly and responsive interface.

---

## ✨ Key Features

- **Scheme Discovery:** Explore available government schemes.
- **Scheme Information:** View detailed information about schemes.
- **Eligibility Guidance:** Understand scheme eligibility requirements.
- **User Authentication:** Access authentication functionality.
- **User Profile Management:** Manage user profile information.
- **Responsive Interface:** Access the application across different screen sizes.
- **Frontend–Backend Integration:** Communicate with backend services through REST APIs.

---

## 🧰 Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, JavaScript, HTML, CSS |
| Frontend Build Tool | Vite |
| Backend | Node.js, Express.js |
| API Communication | REST APIs |
| Frontend Deployment | Vercel |
| Backend Deployment | Render |
| Database | Not Used |

**Note:** SchemeSphere currently does not use a database. The application works without database integration.

---

## 🏗️ System Architecture

SchemeSphere follows a frontend–backend architecture.

1. Users interact with the frontend application.
2. The frontend sends API requests to the backend.
3. The backend processes incoming requests.
4. The backend returns appropriate responses.
5. The frontend displays the results to users.

The application does not currently use database storage.

---

## 📂 Project Structure

```text
SchemeSphere/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── README.md
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── package.json
│   └── README.md
│
└── README.md
```

---

## ⚙️ Installation and Setup

Follow these steps to run SchemeSphere locally.

### 1. Clone the Repository

```bash
git clone https://github.com/bug-hunters-team/SchemeSphere.git
```

Navigate into the project directory:

```bash
cd SchemeSphere
```

### 2. Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal.

### 3. Backend Setup

Open another terminal from the project root and navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the backend server:

```bash
npm start
```

If your backend uses a different start script, use the command specified in `backend/package.json`.

---

## 🔗 API Integration

The frontend communicates with the backend through REST API endpoints.

**Backend Base URL:**

```text
https://schemesphere.onrender.com/api
```

**Backend Health Check:**

[https://schemesphere.onrender.com/api/health](https://schemesphere.onrender.com/api/health)

The frontend uses API requests to communicate with backend services and retrieve the required responses.

---

## 🚀 Deployment

### Frontend Deployment – Vercel

The SchemeSphere frontend is deployed using Vercel.

**Live Application:**

[https://scheme-sphere-k6xjrnrdt-lalitha-yelisetti.vercel.app/](https://scheme-sphere-k6xjrnrdt-lalitha-yelisetti.vercel.app/)

### Backend Deployment – Render

The SchemeSphere backend is deployed using Render.

**Backend API Health Check:**

[https://schemesphere.onrender.com/api/health](https://schemesphere.onrender.com/api/health)

The frontend and backend are deployed separately and communicate through REST APIs.

---

## 🔐 Security

- Implement appropriate authentication and authorization where required.
- Validate user inputs.
- Handle API errors appropriately.
- Keep sensitive credentials and secret keys in environment variables.
- Avoid exposing private configuration details in the source code.

---

## 🧪 Testing

The application can be tested by verifying:

- Frontend page loading and navigation.
- User authentication functionality.
- Scheme information display.
- Eligibility information.
- API communication between frontend and backend.
- Responsive behavior across different screen sizes.

---

## 🔮 Future Enhancements

- Add more government schemes.
- Implement advanced scheme search and filtering.
- Improve eligibility-based scheme recommendations.
- Introduce multilingual support.
- Enhance accessibility and user experience.
- Add additional features to simplify scheme discovery.

---

## 📄 License

This project is developed for educational and application purposes.

---

<p align="center">
  <b>SchemeSphere – Making Government Scheme Information Easier to Discover.</b>
</p>
