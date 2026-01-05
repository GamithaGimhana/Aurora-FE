<div align="center">

# 🎓 Aurora Learning Management System

### Modern Educational Platform for Enhanced Learning Experience

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://aurora-fe-eight.vercel.app/)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-5.0+-13aa52?logo=mongodb&logoColor=white)](https://www.mongodb.com/)

</div>

---

## 📖 Table of Contents

- [Project Title & Description](#-project-title--description)
- [Technologies & Tools](#-technologies--tools)
- [Setup Instructions](#-setup-instructions)
- [Deployed URLs](#-deployed-urls)
- [Features & Screenshots](#-features--screenshots)

---

## 🌟 Project Title & Description

**Aurora** is a comprehensive, full-featured **Learning Management System (LMS)** designed to revolutionize the educational experience for institutions. Built with cutting-edge technologies, Aurora provides distinct, intuitive interfaces for three key user roles: **Administrators**, **Lecturers**, and **Students**.

The platform emphasizes real-time interaction, intelligent learning tools, and seamless user experience, making education more accessible, engaging, and effective.

### Why Aurora?

- **Role-Based Architecture**: Tailored experiences for admins, lecturers, and students
- **Real-Time Quiz Sessions**: Live quiz rooms with instant leaderboards
- **Smart Learning Tools**: Flashcards with spaced repetition for optimal retention
- **Modern UI/UX**: Responsive design that works beautifully on all devices
- **Type-Safe**: Built with TypeScript for robust, maintainable code
- **Performance Optimized**: Lightning-fast load times with Vite and code splitting

---

## 🛠️ Technologies & Tools

### Frontend Stack

| Technology        | Version | Purpose                                         |
| ----------------- | ------- | ----------------------------------------------- |
| **React**         | 19.2.0  | Frontend framework for building interactive UIs |
| **TypeScript**    | 5.9.3   | Type-safe JavaScript for robust code            |
| **Vite**          | 7.2.4   | Next-generation frontend build tool             |
| **Redux Toolkit** | 2.11.2  | Predictable state management                    |
| **TailwindCSS**   | 4.1.17  | Utility-first CSS framework                     |
| **React Router**  | 7.9.6   | Declarative routing for React                   |
| **Axios**         | 1.13.2  | Promise-based HTTP client                       |
| **ESLint**        | 9.39.1  | Code quality and consistency                    |

### Backend Stack

| Technology     | Purpose                             |
| -------------- | ----------------------------------- |
| **Node.js**    | JavaScript runtime for backend      |
| **Express.js** | Minimal web application framework   |
| **MongoDB**    | NoSQL database for data persistence |
| **JWT**        | Secure authentication tokens        |
| **bcrypt**     | Password hashing and encryption     |
| **Cors**       | Cross-origin resource sharing       |

### Development Tools

- **Git**: Version control
- **npm**: Package manager
- **Vercel**: Cloud deployment platform
- **MongoDB Atlas**: Cloud database hosting

---

## ⚡ Setup Instructions

### Frontend Setup

#### Prerequisites

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** 9.x or higher (bundled with Node.js)
- **Git** ([Download](https://git-scm.com/))

#### Frontend Installation & Run

1. **Clone the Repository**

   ```bash
   git clone <frontend-repository-url>
   cd aurora-fe
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure API Endpoint** (Optional)

   Update the API base URL in `src/services/api.ts`:

   ```typescript
   const api = axios.create({
     baseURL: "http://localhost:5000/api/v1", // Update if needed
   });
   ```

4. **Start Development Server**

   ```bash
   npm run dev
   ```

   The application will start at `http://localhost:5173`

5. **Build for Production**
   ```bash
   npm run build
   npm run preview
   ```

---

### Backend Setup

#### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher
- **MongoDB** (Local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cloud instance)

#### Backend Installation & Run

1. **Clone the Backend Repository**

   ```bash
   git clone <backend-repository-url>
   cd aurora-be
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the backend root directory:

   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/aurora
   JWT_SECRET=your-secret-key-here
   JWT_EXPIRE=7d
   CORS_ORIGIN=http://localhost:5173
   ```

   > For MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/aurora`

4. **Start the Backend Server**

   ```bash
   npm run dev
   ```

   You should see:

   ```
   Server running on http://localhost:5000
   Database connected successfully
   ```

5. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

---

### Full Stack Setup (Frontend + Backend)

Run both services in separate terminals:

**Terminal 1 - Backend:**

```bash
cd aurora-be
npm install
npm run dev
# Backend will run on http://localhost:5000
```

**Terminal 2 - Frontend:**

```bash
cd aurora-fe
npm install
npm run dev
# Frontend will run on http://localhost:5173
```

Visit `http://localhost:5173` to access the application.

---

## 🌐 Deployed URLs

Experience Aurora live:

- **Frontend Application**: [https://aurora-fe-eight.vercel.app/](https://aurora-fe-eight.vercel.app/)
- **Backend API**: [https://aurora-be.vercel.app/](https://aurora-be.vercel.app/)

> **Note**: The live demo is deployed on Vercel. You can explore all features by registering as a new user.

---

## 📸 Features & Screenshots

### Core Features Overview

Aurora offers distinct features for three user roles:

#### 👨‍💼 Admin Dashboard Features

- **👥 User Management**: Complete CRUD operations for managing users across all roles
- **📊 System Analytics**: Real-time monitoring of platform activity and user engagement
- **🔐 Access Control**: Granular role-based permission management
- **📈 Platform Statistics**: Comprehensive overview of system usage and performance

#### 👨‍🏫 Lecturer Portal Features

- **📝 Quiz Creation**: Design comprehensive quizzes with multiple question types
- **📚 Question Bank**: Build and maintain reusable question libraries
- **🏠 Quiz Rooms**: Create and manage live quiz sessions with real-time student participation
- **🏆 Real-Time Leaderboards**: Track student performance instantly during quiz sessions
- **👁️ Room Monitoring**: Oversee active quiz rooms with comprehensive controls
- **📊 Performance Analytics**: Detailed insights into student performance

#### 👨‍🎓 Student Portal Features

- **✍️ Quiz Participation**: Engage in quizzes with intuitive interface and real-time feedback
- **🚪 Room Access**: Join live quiz sessions using secure access codes
- **📈 Results Dashboard**: View detailed attempt results and performance trends
- **📓 Notes Management**: Create, edit, organize, and search through personal study notes
- **🎴 Flashcards**: Create custom flashcard decks for effective studying
- **🧠 Spaced Repetition**: Intelligent flashcard review system for optimal memory retention
- **🎯 Progress Tracking**: Monitor learning progress across all activities

#### 🌐 Shared Features

- **📝 Rich Notes System**: Full-featured note-taking with organizational capabilities
- **🎴 Interactive Flashcards**: Create and study flashcards with flip animations
- **📚 Study Mode**: Dedicated interface for focused flashcard study sessions
- **📱 Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **🔔 Notifications**: Real-time updates for important events and activities
- **🔍 Search Functionality**: Quickly find notes, flashcards, and quizzes

### User Roles & Access Matrix

Aurora supports three distinct user roles:

| Feature           | 👨‍💼 Admin | 👨‍🏫 Lecturer | 👨‍🎓 Student |
| ----------------- | :------: | :---------: | :--------: |
| User Management   |    ✅    |     ❌      |     ❌     |
| System Analytics  |    ✅    |     ❌      |     ❌     |
| Create Quizzes    |    ✅    |     ✅      |     ❌     |
| Manage Questions  |    ✅    |     ✅      |     ❌     |
| Create Quiz Rooms |    ✅    |     ✅      |     ❌     |
| View Leaderboards |    ✅    |     ✅      |     ❌     |
| Monitor Rooms     |    ✅    |     ✅      |     ❌     |
| Take Quizzes      |    ✅    |     ✅      |     ✅     |
| Join Rooms        |    ✅    |     ✅      |     ✅     |
| View Results      |    ✅    |     ✅      |     ✅     |
| Manage Notes      |    ✅    |     ✅      |     ✅     |
| Create Flashcards |    ✅    |     ✅      |     ✅     |

### Key Pages & Screenshots Descriptions

**Authentication Pages:**

- Clean login interface with email/password authentication
- User registration with role selection (Admin, Lecturer, Student)
- Secure JWT-based session management

![ Login Page ](https://res.cloudinary.com/dg11uvapu/image/upload/v1767595644/Screenshot_2026-01-05_120520_p2czj7.png)

**Student Dashboard:**

- Overview of available quizzes and quiz rooms
- List of personal notes and flashcard decks
- Quick access to recent activities and progress

![ Student Dashboard ](https://res.cloudinary.com/dg11uvapu/image/upload/v1767595814/Screenshot_2026-01-05_121941_isfjma.png)

**Quiz Experience:**

- Real-time quiz participation with countdown timer
- Multiple question types support
- Instant feedback on quiz completion

![ Quiz Experience ](https://res.cloudinary.com/dg11uvapu/image/upload/v1767595974/Screenshot_2026-01-05_122243_c3d1qt.png)

**Leaderboard:**

- Live ranking of students during quiz sessions
- Performance metrics and scoring details
- Position tracking in real-time

![ Leaderboard ](https://res.cloudinary.com/dg11uvapu/image/upload/v1767596015/Screenshot_2026-01-05_122317_aeonlt.png)

**Notes Management:**

- Create, edit, delete personal study notes
- Rich text formatting support
- Search and filter functionality

![ Notes Management ](https://res.cloudinary.com/dg11uvapu/image/upload/v1767596905/Screenshot_2026-01-05_123211_rgbdzg.png)

**Flashcard Study:**

- Interactive flip animations
- Spaced repetition algorithm
- Study progress tracking

![ Flashcard Study ](https://res.cloudinary.com/dg11uvapu/image/upload/v1767597005/Screenshot_2026-01-05_123940_oxalpx.png)

**Lecturer Dashboard:**

- Quiz creation and management interface
- Question bank organization
- Room management and monitoring
- Real-time student tracking

![ Lecturer Dashboard ](https://res.cloudinary.com/dg11uvapu/image/upload/v1767597188/Screenshot_2026-01-05_124253_oicdbn.png)

**Admin Dashboard:**

- System statistics and analytics
- User management interface
- Platform health monitoring

![ Admin Dashboard ](https://res.cloudinary.com/dg11uvapu/image/upload/v1767597262/Screenshot_2026-01-05_124410_xt5nyl.png)

> 💡 **Tip**: Visit the [live application](https://aurora-fe-eight.vercel.app/) to see all features in action!

---

<div align="center">

**Built with ❤️ using React, TypeScript, Node.js, and MongoDB**

[⬆ Back to Top](#-aurora-learning-management-system)

</div>
