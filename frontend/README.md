# SchemeSphere – Frontend

A modern, responsive, and user-friendly frontend for **SchemeSphere – National Government Schemes Discovery and Application Portal**. Built using React.js and Vite, the application helps citizens discover government welfare schemes, understand eligibility requirements, and access relevant scheme information through a centralized platform.

---

## Overview

**SchemeSphere** is a web-based platform designed to simplify access to information about national and state government welfare schemes.

Government scheme information is often distributed across multiple websites and platforms, making it difficult for citizens to discover schemes relevant to their needs. SchemeSphere aims to make this process easier by providing a centralized and accessible interface.

The frontend provides an intuitive experience that allows users to:

- Explore available government schemes.
- Browse schemes by categories.
- Understand scheme details and eligibility information.
- Register and log in to the platform.
- Manage their user accounts.
- Interact with the platform's AI Assistant.
- Access scheme-related information through a user-friendly interface.

The frontend is developed using **React.js, Vite, and CSS**, with API services for communication with the backend.

---

## Project Objectives

The primary objectives of the SchemeSphere frontend are:

- Develop a modern and responsive user interface.
- Simplify government scheme discovery.
- Organize schemes into meaningful categories.
- Present scheme information clearly.
- Provide user authentication functionality.
- Support multiple Indian languages.
- Integrate frontend components with backend REST APIs.
- Improve accessibility and usability.
- Provide a consistent experience across different devices.

---

## Key Features

### 1. Government Scheme Discovery
- Explore available government schemes.
- Browse featured schemes.
- Discover schemes through categories.
- View detailed scheme information.
- Understand scheme benefits and eligibility criteria.

### 2. User Authentication
- User Registration.
- User Login.
- Forgot Password functionality.
- OTP-based verification workflow.
- Password Reset.
- Authentication-related API integration.

### 3. User Dashboard
- Personalized dashboard interface.
- Access user-related information.
- Navigate between platform features.
- Access relevant scheme information.

### 4. AI Assistant
- Interactive AI Assistant interface.
- User-friendly assistance experience.
- Integration with the backend assistant API.

### 5. Multilingual Support
SchemeSphere supports multiple Indian languages to improve accessibility.

| Language | Code |
|---|---|
| English | en |
| Telugu | te |
| Hindi | hi |
| Tamil | ta |
| Kannada | kn |
| Bengali | bn |
| Gujarati | gu |
| Marathi | mr |

### 6. User Interface
- Modern and clean design.
- Responsive layouts.
- Reusable React components.
- Interactive navigation.
- Scheme information modals.
- Mobile-friendly interface.

---

## Technology Stack

| Category | Technology |
|---|---|
| Frontend Framework | React.js |
| Build Tool | Vite |
| Programming Language | JavaScript (ES6+) |
| Styling | CSS3 |
| API Communication | Axios |
| Internationalization | i18next |
| State Management | React Hooks |
| Package Manager | npm |
| Code Quality | ESLint |
| Deployment | Vercel |
| Version Control | Git & GitHub |

---

## Frontend Architecture

The SchemeSphere frontend follows a modular, component-based architecture.

React components manage the user interface, while service modules handle communication with the backend REST APIs.

```text
                     User
                       |
                       v
               React Application
                       |
          +------------+------------+
          |            |            |
          v            v            v
       Landing      Dashboard   Authentication
        Page          Page         Pages
          |            |            |
          +------------+------------+
                       |
                       v
              Reusable Components
                       |
                       v
                 API Services
                       |
                +------+------+
                |             |
                v             v
            Auth API      Assistant API
                |             |
                +------+------+
                       |
                       v
                Backend REST API
```

**Note:** The frontend communicates with the backend through API requests. It does not directly connect to a database.

---

## Project Structure

The frontend source code is organized into reusable components, pages, services, assets, and supporting modules.

```text
SchemeSphere/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── components/
│   │   ├── AIAssistant.jsx
│   │   ├── AuthModal.jsx
│   │   ├── Categories.jsx
│   │   ├── CTASection.jsx
│   │   ├── FeaturedSchemes.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── LanguagePicker.jsx
│   │   ├── Navbar.jsx
│   │   ├── OtpInput.jsx
│   │   ├── SchemeModal.jsx
│   │   └── Statistics.jsx
│   │
│   ├── data/
│   │   └── schemesData.js
│   │
│   ├── i18n/
│   │   └── i18n.js
│   │
│   ├── locales/
│   │   ├── bn.json
│   │   ├── en.json
│   │   ├── gu.json
│   │   ├── hi.json
│   │   ├── kn.json
│   │   ├── mr.json
│   │   ├── ta.json
│   │   └── te.json
│   │
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   ├── ForgotPasswordPage.jsx
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   │
│   ├── services/
│   │   ├── assistantApi.js
│   │   └── authApi.js
│   │
│   ├── utils/
│   │   └── validateEmail.js
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## Live Resources

| Resource | URL |
|---|---|
| GitHub Repository | [https://github.com/bug-hunters-team/SchemeSphere](https://github.com/bug-hunters-team/SchemeSphere) |
| Live Frontend | [https://scheme-sphere-k6xjrnrdt-lalitha-yelisetti.vercel.app/](https://scheme-sphere-k6xjrnrdt-lalitha-yelisetti.vercel.app/) |
| Backend Health Check | [https://schemesphere.onrender.com/api/health](https://schemesphere.onrender.com/api/health) |

---

## Prerequisites

Before running the application locally, ensure that the following tools are installed:

| Software | Recommended Version |
|---|---|
| Node.js | 18.x or later |
| npm | 9.x or later |
| Git | Latest version |
| Web Browser | Chrome, Edge, or Firefox |

Verify the installations:

```bash
node -v
npm -v
git --version
```

---

## Installation and Setup

Follow these steps to run the SchemeSphere frontend locally.

### 1. Clone the Repository

```bash
git clone https://github.com/bug-hunters-team/SchemeSphere.git
```

### 2. Navigate to the Frontend Directory

```bash
cd SchemeSphere/frontend
```

### 3. Install Dependencies

```bash
npm install
```

This command installs all dependencies specified in the `package.json` file.

### 4. Configure Environment Variables

If the frontend requires backend configuration through environment variables, create a `.env` file inside the frontend directory.

Example:

```env
VITE_API_URL=https://schemesphere.onrender.com/api
```

Use the environment variable name expected by the project's API service configuration.

Do not expose private credentials or sensitive information in frontend environment variables.

---

## Running the Application

### Development Mode

Start the Vite development server:

```bash
npm run dev
```

After the server starts, open:

```text
http://localhost:5173
```

### Production Build

Generate an optimized production build:

```bash
npm run build
```

The production-ready files will be generated inside the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm install` | Installs project dependencies |
| `npm run dev` | Starts the development server |
| `npm run build` | Creates an optimized production build |
| `npm run preview` | Previews the production build |
| `npm run lint` | Runs ESLint checks |

---

## Application Pages

The application contains the following main pages:

### 1. Landing Page

**File:** `src/pages/LandingPage.jsx`

Responsibilities:
- Introduces the SchemeSphere platform.
- Displays the hero section.
- Highlights platform features.
- Presents featured government schemes.
- Provides navigation to other sections.

### 2. Login Page

**File:** `src/pages/LoginPage.jsx`

Responsibilities:
- Provides the user login interface.
- Collects authentication details.
- Communicates with the authentication API.

### 3. Registration Page

**File:** `src/pages/RegisterPage.jsx`

Responsibilities:
- Provides the user registration interface.
- Collects required user information.
- Supports account creation through the backend API.

### 4. Dashboard Page

**File:** `src/pages/DashboardPage.jsx`

Responsibilities:
- Provides the dashboard interface.
- Displays user-related information.
- Provides access to relevant platform features.

### 5. Forgot Password Page

**File:** `src/pages/ForgotPasswordPage.jsx`

Responsibilities:
- Provides the password recovery interface.
- Initiates the password recovery workflow.

---

## Component Architecture

The application uses reusable React components to maintain consistency and improve code maintainability.

| Component | Responsibility |
|---|---|
| Navbar.jsx | Main application navigation |
| Hero.jsx | Landing page hero section |
| Categories.jsx | Displays scheme categories |
| FeaturedSchemes.jsx | Displays featured schemes |
| SchemeModal.jsx | Displays scheme details |
| AIAssistant.jsx | Provides the AI Assistant interface |
| AuthModal.jsx | Authentication-related modal |
| OtpInput.jsx | OTP input interface |
| LanguagePicker.jsx | Language selection |
| Statistics.jsx | Displays platform statistics |
| HowItWorks.jsx | Explains the platform workflow |
| CTASection.jsx | Displays call-to-action content |
| Footer.jsx | Application footer |

---

## API Integration

The frontend communicates with the backend through REST APIs.

API-related files are organized inside:

```text
src/services/
│
├── assistantApi.js
└── authApi.js
```

### Authentication API

**File:** `src/services/authApi.js`

Responsible for authentication-related communication with the backend, including account and password recovery workflows.

### Assistant API

**File:** `src/services/assistantApi.js`

Responsible for communication between the AI Assistant interface and the corresponding backend API.

---

## Multilingual Implementation

SchemeSphere includes multilingual support to make government scheme information more accessible to users.

The internationalization configuration is maintained in:

```text
src/i18n/i18n.js
```

Translation files are organized inside:

```text
src/locales/
```

Each JSON file contains translations for its corresponding language.

Supported languages include English, Telugu, Hindi, Tamil, Kannada, Bengali, Gujarati, and Marathi.

---

## State Management

The application uses React's built-in state management features.

These include:

- `useState` for managing component state.
- `useEffect` for handling side effects.
- Component-based state management.
- API responses for updating the user interface.

This approach keeps the frontend lightweight and organized.

---

## Error Handling and Validation

The frontend uses validation and error-handling mechanisms to improve the user experience.

These include:

- Email validation.
- Form input validation.
- Authentication error handling.
- API request error handling.
- User-friendly error messages.

Email validation utilities are maintained inside:

```text
src/utils/validateEmail.js
```

---

## Responsive User Interface

SchemeSphere follows a responsive design approach to provide a consistent experience across different devices.

| Device | Support |
|---|---|
| Desktop | Responsive layout |
| Laptop | Responsive layout |
| Tablet | Adaptive layout |
| Mobile | Mobile-friendly interface |

The interface focuses on:
- Clean and simple layouts.
- Consistent design elements.
- Easy navigation.
- Accessible scheme information.
- User-friendly interactions.

---

## Deployment

The SchemeSphere frontend is deployed using **Vercel**.

### Deployment Steps

1. Push the frontend source code to GitHub.
2. Connect the GitHub repository to Vercel.
3. Set the frontend directory as the Root Directory.
4. Configure the required environment variables.
5. Deploy the application.
6. Access the application through the generated Vercel URL.

### Build Configuration

| Setting | Value |
|---|---|
| Framework | Vite |
| Root Directory | `frontend` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

---

## Future Enhancements

Potential improvements for future versions include:

- Advanced scheme search and filtering.
- Personalized scheme recommendations.
- Improved eligibility assistance.
- Additional regional language support.
- Enhanced AI-powered assistance.
- Improved accessibility features.
- Additional user dashboard features.

---

## Learning Outcomes

Working on the SchemeSphere frontend provides practical experience in:

- React component-based development.
- Frontend development using Vite.
- REST API integration.
- Authentication workflows.
- React Hooks and state management.
- Multilingual application development.
- Reusable component architecture.
- Responsive web design.
- Form validation.
- Git and GitHub.
- Frontend deployment using Vercel.

---

## Conclusion

The **SchemeSphere Frontend** provides a modern and accessible interface for discovering government welfare schemes.

Built using React.js and Vite, it focuses on simplifying scheme discovery, improving accessibility through multilingual support, and providing a user-friendly experience.

With its modular architecture, reusable components, and backend API integration, the frontend establishes a foundation for a centralized government schemes discovery platform.

---

## License

This project is developed for educational and learning purposes. You are free to use, modify, and enhance it for academic or personal projects.
