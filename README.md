<div align="center">

# 🎓 Aurora Learning Management System

### Modern Educational Platform for Enhanced Learning Experience

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://aurora-fe-eight.vercel.app/)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.11.2-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.17-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[Live Application](https://aurora-fe-eight.vercel.app/) • [Report Bug](#-support) • [Request Feature](#-future-enhancements)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Authentication & Authorization](#-authentication--authorization)
- [API Integration](#-api-integration)
- [Development](#-development)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**Aurora** is a comprehensive, full-featured Learning Management System (LMS) designed to revolutionize the educational experience for institutions. Built with cutting-edge technologies, Aurora provides distinct, intuitive interfaces for three key user roles: **Administrators**, **Lecturers**, and **Students**.

The platform emphasizes real-time interaction, intelligent learning tools, and seamless user experience, making education more accessible, engaging, and effective.

### ✨ Why Aurora?

- **Role-Based Architecture**: Tailored experiences for admins, lecturers, and students
- **Real-Time Quiz Sessions**: Live quiz rooms with instant leaderboards
- **Smart Learning Tools**: Flashcards with spaced repetition for optimal retention
- **Modern UI/UX**: Responsive design that works beautifully on all devices
- **Type-Safe**: Built with TypeScript for robust, maintainable code
- **Performance Optimized**: Lightning-fast load times with Vite and code splitting

---

## 🚀 Live Demo

**🌐 Experience Aurora Live**:

- **Frontend**: [https://aurora-fe-eight.vercel.app/](https://aurora-fe-eight.vercel.app/)
- **Backend API**: [https://aurora-be.vercel.app/](https://aurora-be.vercel.app/)

> **Note**: The live demo is deployed on Vercel and connected to a backend API. You can explore all features by registering as a new user or using demo credentials (if provided).

---

## 🎯 Features

Aurora offers a comprehensive suite of features designed to meet the needs of modern educational institutions:

### 👨‍💼 Admin Dashboard

<details>
<summary><b>Click to expand admin features</b></summary>

- **👥 User Management**: Complete CRUD operations for managing users across all roles
- **📊 System Analytics**: Real-time monitoring of platform activity and user engagement
- **🔐 Access Control**: Granular role-based permission management
- **📈 Platform Statistics**: Comprehensive overview of system usage and performance

</details>

### 👨‍🏫 Lecturer Portal

<details>
<summary><b>Click to expand lecturer features</b></summary>

- **📝 Quiz Creation**: Design comprehensive quizzes with multiple question types
- **📚 Question Bank**: Build and maintain reusable question libraries for efficient quiz creation
- **🏠 Quiz Rooms**: Create and manage live quiz sessions with real-time student participation
- **🏆 Real-Time Leaderboards**: Track student performance instantly during quiz sessions
- **👁️ Room Monitoring**: Oversee active quiz rooms with comprehensive controls
- **📊 Performance Analytics**: Detailed insights into student performance and quiz effectiveness

</details>

### 👨‍🎓 Student Portal

<details>
<summary><b>Click to expand student features</b></summary>

- **✍️ Quiz Participation**: Engage in quizzes with intuitive interface and real-time feedback
- **🚪 Room Access**: Join live quiz sessions using secure access codes
- **📈 Results Dashboard**: View detailed attempt results and performance trends
- **📓 Notes Management**: Create, edit, organize, and search through personal study notes
- **🎴 Flashcards**: Create custom flashcard decks for effective studying
- **🧠 Spaced Repetition**: Intelligent flashcard review system for optimal memory retention
- **🎯 Progress Tracking**: Monitor learning progress across all activities

</details>

### 🌐 Shared Features

- **📝 Rich Notes System**: Full-featured note-taking with organizational capabilities
- **🎴 Interactive Flashcards**: Create and study flashcards with flip animations
- **📚 Study Mode**: Dedicated interface for focused flashcard study sessions
- **📱 Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **🔔 Notifications**: Real-time updates for important events and activities
- **🔍 Search Functionality**: Quickly find notes, flashcards, and quizzes

---

## 🛠️ Tech Stack

### Core Technologies

| Technology           | Version | Purpose                                         |
| -------------------- | ------- | ----------------------------------------------- |
| ⚛️ **React**         | 19.2.0  | Frontend framework for building interactive UIs |
| 📘 **TypeScript**    | 5.9.3   | Type-safe JavaScript for robust code            |
| ⚡ **Vite**          | 7.2.4   | Next-generation frontend build tool             |
| 🔄 **Redux Toolkit** | 2.11.2  | Predictable state management                    |
| 🎨 **TailwindCSS**   | 4.1.17  | Utility-first CSS framework                     |
| 🌐 **React Router**  | 7.9.6   | Declarative routing for React                   |
| 📡 **Axios**         | 1.13.2  | Promise-based HTTP client                       |
| ✅ **ESLint**        | 9.39.1  | Code quality and consistency                    |

### Why These Technologies?

- **React 19**: Leverages the latest React features including automatic batching and improved SSR
- **TypeScript**: Provides type safety, better IDE support, and early error detection
- **Vite**: Offers incredibly fast HMR (Hot Module Replacement) and optimized builds
- **Redux Toolkit**: Simplifies Redux usage with less boilerplate and built-in best practices
- **TailwindCSS**: Enables rapid UI development with utility classes and design consistency

---

## 📁 Project Structure

```
aurora-fe/
├── 📁 public/                  # Static assets and files
├── 📁 src/
│   ├── 📁 assets/             # Images, fonts, icons
│   ├── 📁 components/         # Reusable UI components
│   │   ├── Header.tsx         # App header with navigation
│   │   └── Layout.tsx         # Main layout wrapper
│   ├── 📁 pages/              # Page components (route views)
│   │   ├── 📁 admin/          # Administrator pages
│   │   │   ├── AdminDashboard.tsx
│   │   │   └── AdminUsers.tsx
│   │   ├── 📁 lecturer/       # Lecturer pages
│   │   │   ├── LecturerDashboard.tsx
│   │   │   ├── CreateQuiz.tsx
│   │   │   ├── CreateQuestion.tsx
│   │   │   ├── QuestionBank.tsx
│   │   │   ├── CreateQuizRoom.tsx
│   │   │   ├── LecturerRooms.tsx
│   │   │   └── RoomLeaderboard.tsx
│   │   ├── 📁 student/        # Student pages
│   │   │   ├── StudentDashboard.tsx
│   │   │   ├── Quizzes.tsx
│   │   │   ├── JoinRoom.tsx
│   │   │   ├── QuizRoom.tsx
│   │   │   ├── Attempt.tsx
│   │   │   └── AttemptResult.tsx
│   │   └── *.tsx              # Shared pages
│   │       ├── Welcome.tsx
│   │       ├── Login.tsx
│   │       ├── Register.tsx
│   │       ├── Notes.tsx
│   │       ├── CreateNote.tsx
│   │       ├── ViewNote.tsx
│   │       ├── Flashcards.tsx
│   │       ├── CreateFlashcard.tsx
│   │       └── FlashcardStudy.tsx
│   ├── 📁 routes/             # Routing configuration
│   │   ├── index.tsx          # Main route definitions
│   │   └── ProtectedRoute.tsx # Auth guard component
│   ├── 📁 services/           # API services layer
│   │   ├── api.ts             # Axios instance config
│   │   ├── auth.ts            # Authentication APIs
│   │   ├── quiz.ts            # Quiz-related APIs
│   │   ├── quizRoom.ts        # Quiz room APIs
│   │   ├── attempts.ts        # Quiz attempt APIs
│   │   ├── notes.ts           # Notes management APIs
│   │   └── flashcards.ts      # Flashcard APIs
│   └── 📁 store/              # Redux store
│       ├── index.ts           # Store configuration
│       ├── hooks.ts           # Typed Redux hooks
│       ├── 📁 auth/           # Auth state management
│       │   ├── authSlice.ts
│       │   ├── authThunks.ts
│       │   └── authTypes.ts
│       ├── 📁 quiz/           # Quiz state management
│       │   ├── quizSlice.ts
│       │   └── quizTypes.ts
│       └── 📁 adminUsers/     # Admin user state
│           ├── adminUsersSlice.ts
│           ├── adminUsersThunks.ts
│           └── adminUsersTypes.ts
├── 📄 index.html              # HTML entry point
├── 📄 package.json            # Dependencies and scripts
├── 📄 tsconfig.json           # TypeScript configuration
├── 📄 vite.config.ts          # Vite configuration
├── 📄 eslint.config.js        # ESLint configuration
└── 📄 README.md               # This file
```

### Architecture Principles

- **Component-Based**: Modular, reusable components for maintainability
- **Feature-Sliced**: Code organized by feature for better scalability
- **Type-Safe**: TypeScript throughout for reliability
- **Service Layer**: Centralized API calls for consistency
- **State Management**: Redux Toolkit for predictable state updates

---

## ⚡ Getting Started

Follow these steps to set up Aurora on your local machine:

### 📋 Prerequisites

Ensure you have the following installed on your system:

- **Node.js**: Version 18.x or higher ([Download](https://nodejs.org/))
- **npm**: Version 9.x or higher (bundled with Node.js)
- **Git**: For version control ([Download](https://git-scm.com/))
- **Backend API**: Aurora backend service running (default: `http://localhost:5000`)

### 🔧 Installation

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd aurora-fe
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

   This will install all required packages listed in [`package.json`](package.json).

3. **Configure API Endpoint** (Optional)

   The API base URL is configured in [`src/services/api.ts`](src/services/api.ts). Update if your backend runs on a different URL:

   ```typescript
   const api = axios.create({
     baseURL: "http://localhost:5000/api/v1", // Update this URL if needed
   });
   ```

4. **Start Development Server**

   ```bash
   npm run dev
   ```

   The application will start at `http://localhost:5173` (or the next available port).

   You should see output similar to:

   ```
   VITE v7.2.4  ready in XXX ms
   ➜  Local:   http://localhost:5173/
   ➜  Network: use --host to expose
   ```

5. **Open in Browser**

   Navigate to `http://localhost:5173` to see Aurora in action! 🎉

### 🏗️ Build for Production

Create an optimized production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory, ready for deployment.

### 👀 Preview Production Build

Test the production build locally:

```bash
npm run preview
```

---

## 📜 Available Scripts

| Command           | Description                                                     |
| ----------------- | --------------------------------------------------------------- |
| `npm run dev`     | Starts the development server with hot module replacement (HMR) |
| `npm run build`   | Creates an optimized production build in the `dist/` folder     |
| `npm run preview` | Serves the production build locally for testing                 |
| `npm run lint`    | Runs ESLint to identify code quality issues                     |

---

## 🔐 Authentication & Authorization

Aurora implements enterprise-grade security with comprehensive authentication and authorization:

### 🔑 Authentication Features

- **JWT Token-Based Auth**: Secure access and refresh token mechanism
- **Persistent Sessions**: User sessions maintained across browser restarts
- **Automatic Token Refresh**: Seamless token renewal on expiration
- **Secure Password Handling**: Industry-standard password encryption
- **Session Management**: Automatic logout on token expiration

### 👥 Role-Based Access Control (RBAC)

Aurora supports three distinct user roles with specific permissions:

#### User Roles

```
┌─────────────┐
│    ADMIN    │  Full system access
├─────────────┤
│  LECTURER   │  Teaching & quiz management
├─────────────┤
│   STUDENT   │  Learning & quiz participation
└─────────────┘
```

#### Feature Access Matrix

| Feature                    | 👨‍💼 Admin | 👨‍🏫 Lecturer | 👨‍🎓 Student |
| -------------------------- | :------: | :---------: | :--------: |
| **User Management**        |    ✅    |     ❌      |     ❌     |
| **System Analytics**       |    ✅    |     ❌      |     ❌     |
| **Create/Edit Quizzes**    |    ✅    |     ✅      |     ❌     |
| **Manage Question Bank**   |    ✅    |     ✅      |     ❌     |
| **Create Quiz Rooms**      |    ✅    |     ✅      |     ❌     |
| **View Room Leaderboards** |    ✅    |     ✅      |     ❌     |
| **Monitor Quiz Rooms**     |    ✅    |     ✅      |     ❌     |
| **Take Quizzes**           |    ✅    |     ✅      |     ✅     |
| **Join Quiz Rooms**        |    ✅    |     ✅      |     ✅     |
| **View Own Results**       |    ✅    |     ✅      |     ✅     |
| **Manage Notes**           |    ✅    |     ✅      |     ✅     |
| **Create Flashcards**      |    ✅    |     ✅      |     ✅     |
| **Study Mode**             |    ✅    |     ✅      |     ✅     |

### 🛡️ Protected Routes

All routes except `/login` and `/register` are protected and require authentication:

```typescript
<ProtectedRoute allowedRoles={["ADMIN"]}>
  <AdminDashboard />
</ProtectedRoute>
```

Users attempting to access unauthorized routes are automatically redirected to appropriate pages.

---

## 🌐 API Integration

Aurora communicates with a RESTful backend API using Axios with advanced features:

### 🔄 HTTP Client Configuration

- **Base URL**: Centralized endpoint configuration
- **Request Interceptors**: Automatic JWT token attachment to authenticated requests
- **Response Interceptors**: Handles token refresh and error responses
- **Public Routes**: Authentication bypass for login/register endpoints
- **Error Handling**: Centralized error management with user-friendly messages

### 📡 Service Architecture

| Service        | File                                               | Purpose                                                   |
| -------------- | -------------------------------------------------- | --------------------------------------------------------- |
| **Auth**       | [`services/auth.ts`](services/auth.ts)             | User authentication, registration, and profile management |
| **Quiz**       | [`services/quiz.ts`](services/quiz.ts)             | Quiz CRUD operations and question management              |
| **Quiz Room**  | [`services/quizRoom.ts`](services/quizRoom.ts)     | Live quiz room creation and management                    |
| **Attempts**   | [`services/attempts.ts`](services/attempts.ts)     | Quiz submission and result tracking                       |
| **Notes**      | [`services/notes.ts`](services/notes.ts)           | Note creation, reading, updating, and deletion            |
| **Flashcards** | [`services/flashcards.ts`](services/flashcards.ts) | Flashcard deck and card management                        |

### 🔐 API Request Flow

```
User Action → Redux Thunk → Service Layer → Axios Interceptor → Backend API
                                                    ↓
                                              Add JWT Token
                                                    ↓
                                          Handle Response/Error
                                                    ↓
                                          Update Redux Store
                                                    ↓
                                              Update UI
```

---

## 🔄 State Management

Aurora uses **Redux Toolkit** for centralized, predictable state management:

### 📦 Store Structure

```
store/
├── auth/              # Authentication state
│   ├── authSlice.ts      → User info, tokens, auth status
│   ├── authThunks.ts     → Async login, register, logout
│   └── authTypes.ts      → TypeScript interfaces
├── quiz/              # Quiz state
│   ├── quizSlice.ts      → Active quiz, questions, rooms
│   └── quizTypes.ts      → TypeScript interfaces
└── adminUsers/        # Admin user management
    ├── adminUsersSlice.ts
    ├── adminUsersThunks.ts
    └── adminUsersTypes.ts
```

### 🎯 State Management Features

- **Redux Thunks**: Handle asynchronous operations (API calls)
- **Typed Hooks**: Custom `useAppDispatch` and `useAppSelector` for type safety
- **Slice Pattern**: Modular state organization by feature
- **Immutable Updates**: Leverages Immer for simpler state updates
- **DevTools Support**: Redux DevTools integration for debugging

### Example Usage

```typescript
// Using typed hooks
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const dispatch = useAppDispatch();
const user = useAppSelector((state) => state.auth.user);

// Dispatching async actions
await dispatch(loginUser({ email, password }));
```

---

## 🎨 UI/UX Features

Aurora's interface is designed with user experience at its core:

- **✨ Modern Design**: Clean, professional interface built with TailwindCSS
- **📱 Fully Responsive**: Mobile-first design that adapts to all screen sizes
- **⚡ Performance**: Lazy-loaded components and code splitting for optimal load times
- **🔔 User Feedback**: Toast notifications and loading indicators for all actions
- **🎯 Intuitive Navigation**: Role-based navigation with consistent menu structure
- **♿ Accessibility**: Semantic HTML and keyboard navigation support
- **🎨 Consistent Styling**: Design system with reusable utility classes
- **💫 Smooth Transitions**: Polished animations and micro-interactions

---

## � Development

### 🔍 Code Quality & Linting

Aurora maintains high code quality standards using ESLint with TypeScript support.

**Run linter:**

```bash
npm run lint
```

**ESLint Configuration:**

- TypeScript-specific rules
- React Hooks rules
- React Refresh plugin
- Strict type checking

### 🔒 Type Safety

TypeScript is configured with **strict mode** enabled for maximum type safety:

- **No implicit any**: All types must be explicitly defined
- **Strict null checks**: Prevent null/undefined errors
- **Type definitions**: Organized by feature in `store/*/types.ts`
- **Component props**: Type-safe props for all components

### 🏗️ Adding New Features

Follow these steps to add new features to Aurora:

1. **Create Page Component**

   Add your component in the appropriate directory:

   - `pages/admin/` for admin features
   - `pages/lecturer/` for lecturer features
   - `pages/student/` for student features
   - `pages/` for shared features

2. **Add Route Configuration**

   Register the route in [`src/routes/index.tsx`](src/routes/index.tsx):

   ```typescript
   <Route
     path="/new-feature"
     element={
       <ProtectedRoute allowedRoles={["STUDENT"]}>
         <NewFeature />
       </ProtectedRoute>
     }
   />
   ```

3. **Create API Service**

   Add service methods in [`src/services/`](src/services/):

   ```typescript
   export const newFeatureApi = {
     getData: () => api.get("/new-feature"),
     createItem: (data) => api.post("/new-feature", data),
   };
   ```

4. **Add Redux State** (if needed)

   Create a new slice in [`src/store/`](src/store/):

   ```
   store/
   └── newFeature/
       ├── newFeatureSlice.ts
       ├── newFeatureThunks.ts
       └── newFeatureTypes.ts
   ```

5. **Update Navigation**

   Add menu items in [`components/Header.tsx`](components/Header.tsx)

### 🧪 Testing Best Practices

- Test components in isolation
- Mock API calls in tests
- Verify user interactions
- Check accessibility features

### 📝 Code Style Guidelines

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Follow naming conventions:
  - Components: `PascalCase`
  - Files: `PascalCase.tsx`
  - Functions: `camelCase`
  - Constants: `UPPER_SNAKE_CASE`

---

## 🚀 Deployment

Aurora is deployed on **Vercel** for seamless continuous deployment.

### 🌐 Production URL

**Live Application**: [https://aurora-fe-eight.vercel.app/](https://aurora-fe-eight.vercel.app/)

### 📤 Deployment Process

#### Automatic Deployment (Recommended)

1. **Connect to Vercel**

   - Link your GitHub repository to Vercel
   - Vercel automatically deploys on every push to main branch

2. **Configure Build Settings**

   ```
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

3. **Environment Variables** (if needed)
   - Add any required environment variables in Vercel dashboard

#### Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

### 🔧 Build Optimization

- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Dead code elimination
- **Minification**: JavaScript and CSS compression
- **Asset Optimization**: Image and font optimization

---

## 🤝 Contributing

Contributions are always welcome! We appreciate your interest in improving Aurora.

### How to Contribute

1. **Fork the Repository**

   ```bash
   git clone https://github.com/GamithaGimhana/Aurora-FE.git
   ```

2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Make Your Changes**

   - Write clean, maintainable code
   - Follow the existing code style
   - Add comments for complex logic

4. **Commit Your Changes**

   ```bash
   git commit -m 'feat: Add some AmazingFeature'
   ```

5. **Push to Your Branch**

   ```bash
   git push origin feature/AmazingFeature
   ```

6. **Open a Pull Request**
   - Provide a clear description of changes
   - Reference any related issues
   - Ensure all checks pass

### 📏 Coding Standards

- ✅ Use TypeScript for type safety
- ✅ Follow React best practices and hooks guidelines
- ✅ Maintain consistent file naming conventions
- ✅ Write meaningful commit messages (follow [Conventional Commits](https://www.conventionalcommits.org/))
- ✅ Add JSDoc comments for complex functions
- ✅ Ensure responsive design for all new components
- ✅ Test your changes thoroughly before submitting

### 📜 Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Example:**

```
feat(quiz): Add real-time leaderboard updates

Implemented WebSocket connection for live leaderboard updates
during quiz sessions. Students now see position changes instantly.

Closes #123
```

---

## 📄 License

This project is **private and proprietary**. All rights reserved.

© 2026 Aurora Learning Management System. Unauthorized copying, distribution, or modification of this software is strictly prohibited.

---

## 👥 Team & Credits

**Aurora LMS** is developed as part of the **Rapid Application Development (RAD)** assignment.

### Development Team

- **Developed by**: Gamitha Gimhana

### Acknowledgments

- Thanks to all contributors who helped build Aurora
- Inspired by modern educational platforms
- Built with ❤️ for enhanced learning experiences

---

## 📧 Support & Contact

Need help or have questions? We're here to assist!

- **📧 Email**: gamitha.gimhana99@gmail.com
- **🐛 Report Issues**: [GitHub Issues](https://github.com/GamithaGimhana/Aurora-FE/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/GamithaGimhana/Aurora-FE/discussions)
- **📚 Documentation**: Check this README and code comments

### Troubleshooting

<details>
<summary><b>Common Issues & Solutions</b></summary>

**Issue: Port 5173 already in use**

```bash
# Solution: Kill the process or use a different port
npm run dev -- --port 3000
```

**Issue: API connection errors**

```bash
# Solution: Ensure backend is running
# Check API URL in src/services/api.ts
```

**Issue: Module not found errors**

```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Issue: TypeScript errors**

```bash
# Solution: Clear TypeScript cache
rm -rf node_modules/.cache
npm run build
```

</details>

---

## 🔮 Future Enhancements

We're constantly working to improve Aurora. Here's what's on our roadmap:

### Planned Features

- [ ] 🔄 **Real-time Updates**: WebSocket integration for live notifications
- [ ] 📊 **Advanced Analytics**: Comprehensive dashboard with charts and insights
- [ ] 📁 **File Management**: Upload and manage files for questions and notes
- [ ] 🌙 **Dark Mode**: Theme switching for better accessibility
- [ ] 📴 **Offline Support**: Service workers for offline functionality
- [ ] 📱 **Mobile App**: React Native version for iOS and Android
- [ ] 📧 **Email Notifications**: Automated notifications for important events
- [ ] 📄 **PDF Export**: Export quiz results and reports to PDF
- [ ] 🌍 **Internationalization**: Multi-language support (i18n)
- [ ] ♿ **Enhanced Accessibility**: WCAG 2.1 AA compliance
- [ ] 🎥 **Video Integration**: Embed educational videos in courses
- [ ] 🤖 **AI-Powered Features**: Smart question generation and study recommendations
- [ ] 📈 **Progress Tracking**: Detailed learning progress visualization
- [ ] 🔐 **2FA Authentication**: Two-factor authentication for enhanced security

### Long-term Vision

- Gamification elements with badges and achievements
- Integration with popular LMS platforms
- Advanced quiz types (matching, ordering, etc.)
- Collaborative study rooms
- Parent/Guardian portal for progress monitoring

---

<div align="center">

## 🌟 Star History

If you find Aurora useful, please consider giving it a ⭐ on GitHub!

---

**Built with ❤️ using React, TypeScript, and Redux Toolkit**

[⬆ Back to Top](#-aurora-learning-management-system)

---

_Last Updated: January 2026_

</div>
