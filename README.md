# Aurora Learning Management System - Frontend

A modern, full-featured Learning Management System (LMS) frontend built with React, TypeScript, and Redux Toolkit. Aurora provides a comprehensive platform for educational institutions with distinct interfaces for administrators, lecturers, and students.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.11.2-764ABC?logo=redux)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.17-06B6D4?logo=tailwindcss)

## 🌟 Features

### 👨‍💼 Admin Dashboard

- **User Management**: Create, update, and manage users across all roles
- **System Overview**: Monitor platform activity and user statistics
- **Role-based Access Control**: Manage permissions for different user types

### 👨‍🏫 Lecturer Portal

- **Quiz Management**: Create and manage quizzes with multiple question types
- **Question Bank**: Build and organize reusable question libraries
- **Quiz Rooms**: Create live quiz sessions for students
- **Real-time Leaderboards**: Track student performance during quiz sessions
- **Room Management**: Monitor and control active quiz rooms

### 👨‍🎓 Student Portal

- **Quiz Taking**: Participate in quizzes and submit attempts
- **Room Joining**: Join live quiz rooms with access codes
- **Results & Analytics**: View detailed attempt results and performance metrics
- **Notes Management**: Create, edit, and organize personal study notes
- **Flashcards**: Create and study with digital flashcards
- **Spaced Repetition**: Study flashcards with intelligent review scheduling

### 📝 Shared Features

- **Notes System**: Rich text note-taking with organizational capabilities
- **Flashcard System**: Create and study flashcards with an interactive interface
- **Study Mode**: Dedicated flashcard study interface with progress tracking
- **Responsive Design**: Fully responsive UI that works on all devices

## 🏗️ Architecture

### Tech Stack

- **Frontend Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.2.4
- **State Management**: Redux Toolkit 2.11.2
- **Routing**: React Router DOM 7.9.6
- **Styling**: TailwindCSS 4.1.17
- **HTTP Client**: Axios 1.13.2
- **Code Quality**: ESLint 9.39.1

### Project Structure

```
aurora-fe/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, fonts, and other assets
│   ├── components/        # Reusable UI components
│   │   ├── Header.tsx
│   │   └── Layout.tsx
│   ├── pages/             # Page components
│   │   ├── admin/        # Admin-specific pages
│   │   ├── lecturer/     # Lecturer-specific pages
│   │   ├── student/      # Student-specific pages
│   │   └── *.tsx         # Shared pages (Notes, Flashcards, etc.)
│   ├── routes/           # Routing configuration
│   │   ├── index.tsx
│   │   └── ProtectedRoute.tsx
│   ├── services/         # API services and HTTP client
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── quiz.ts
│   │   ├── notes.ts
│   │   ├── flashcards.ts
│   │   └── attempts.ts
│   └── store/            # Redux store configuration
│       ├── auth/         # Authentication state
│       ├── quiz/         # Quiz state
│       └── adminUsers/   # Admin user management state
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher (comes with Node.js)
- **Backend API**: The Aurora backend API running on `http://localhost:5000`

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd aurora-fe
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**

   The API base URL is configured in [`src/services/api.ts`](src/services/api.ts). Update if your backend runs on a different URL:

   ```typescript
   const api = axios.create({
     baseURL: "http://localhost:5000/api/v1",
   });
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173` (or the next available port).

### Build for Production

```bash
npm run build
```

The optimized production build will be created in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📋 Available Scripts

| Script            | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Create optimized production build        |
| `npm run preview` | Preview production build locally         |
| `npm run lint`    | Run ESLint to check code quality         |

## 🔐 Authentication & Authorization

Aurora implements a robust authentication system with:

- **JWT Token-based Authentication**: Secure access and refresh token mechanism
- **Role-based Access Control (RBAC)**: Three distinct user roles:
  - `ADMIN`: Full system access
  - `LECTURER`: Access to teaching tools and quiz management
  - `STUDENT`: Access to learning resources and quiz participation
- **Protected Routes**: Automatic route protection based on user roles
- **Token Refresh**: Automatic token refresh on expiration
- **Persistent Sessions**: Login state persisted across browser sessions

### User Roles & Permissions

| Feature            | Admin | Lecturer | Student |
| ------------------ | ----- | -------- | ------- |
| User Management    | ✅    | ❌       | ❌      |
| Create Quizzes     | ✅    | ✅       | ❌      |
| Create Quiz Rooms  | ✅    | ✅       | ❌      |
| Question Bank      | ✅    | ✅       | ❌      |
| View Leaderboards  | ✅    | ✅       | ❌      |
| Take Quizzes       | ✅    | ✅       | ✅      |
| Join Quiz Rooms    | ✅    | ✅       | ✅      |
| Notes & Flashcards | ✅    | ✅       | ✅      |

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface built with TailwindCSS
- **Responsive Layout**: Mobile-first design that adapts to all screen sizes
- **Loading States**: Lazy-loaded components for optimal performance
- **User Feedback**: Toast notifications and loading indicators
- **Consistent Navigation**: Role-based navigation with intuitive menu structure

## 🔄 State Management

Aurora uses Redux Toolkit for centralized state management:

### Store Slices

1. **Auth Slice** ([`store/auth/`](store/auth/))

   - User authentication state
   - Current user information
   - Login/logout actions
   - Token management

2. **Quiz Slice** ([`store/quiz/`](store/quiz/))

   - Quiz data and questions
   - Active quiz sessions
   - Room information

3. **Admin Users Slice** ([`store/adminUsers/`](store/adminUsers/))
   - User management for administrators
   - User CRUD operations

### Redux Thunks

Asynchronous actions are handled using Redux Thunks for:

- API calls
- Authentication flows
- Data fetching and updates

## 🌐 API Integration

The application communicates with a backend API using Axios with the following features:

- **Base URL Configuration**: Centralized API endpoint configuration
- **Request Interceptors**: Automatic token attachment to authenticated requests
- **Response Interceptors**: Automatic token refresh on 401 errors
- **Public Endpoints**: Bypasses authentication for login/register routes
- **Error Handling**: Centralized error handling and user feedback

### API Services

- **Auth Service** ([`services/auth.ts`](services/auth.ts)): Authentication and user management
- **Quiz Service** ([`services/quiz.ts`](services/quiz.ts)): Quiz and room operations
- **Notes Service** ([`services/notes.ts`](services/notes.ts)): Note CRUD operations
- **Flashcards Service** ([`services/flashcards.ts`](services/flashcards.ts)): Flashcard management
- **Attempts Service** ([`services/attempts.ts`](services/attempts.ts)): Quiz attempt tracking

## 🛠️ Development

### Code Style & Linting

The project uses ESLint with TypeScript support. Run the linter:

```bash
npm run lint
```

### Type Safety

TypeScript is configured with strict mode enabled. Type definitions are organized by feature:

- Interface definitions in `store/*/types.ts` files
- Component prop types inline with components

### Adding New Features

1. **Create page component** in appropriate directory (`pages/admin/`, `pages/lecturer/`, or `pages/student/`)
2. **Add route** in [`src/routes/index.tsx`](src/routes/index.tsx)
3. **Create service methods** in [`src/services/`](src/services/) if API calls are needed
4. **Add Redux slice** in [`src/store/`](src/store/) for complex state management
5. **Protect route** using `ProtectedRoute` component with appropriate roles

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Follow TypeScript best practices
- Use functional components with hooks
- Maintain consistent file naming conventions
- Write meaningful commit messages
- Add comments for complex logic

## 📝 License

This project is private and proprietary.

## 👥 Team

Developed for educational purposes as part of the Rapid Application Development Assignment.

## 📧 Support

For questions or issues, please contact the development team or create an issue in the repository.

## 🔮 Future Enhancements

- [ ] Real-time quiz updates using WebSockets
- [ ] Advanced analytics dashboard
- [ ] File upload support for questions and notes
- [ ] Dark mode support
- [ ] Offline mode with service workers
- [ ] Mobile application (React Native)
- [ ] Email notifications
- [ ] Export quiz results to PDF
- [ ] Internationalization (i18n)
- [ ] Accessibility improvements (WCAG 2.1)

---

**Built with ❤️ using React, TypeScript, and Redux Toolkit**
