import { lazy, Suspense } from "react";
import type { ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import Layout from "../components/Layout";

const Welcome = lazy(() => import("../pages/Welcome"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

const StudentDashboard = lazy(() => import('../pages/student/StudentDashboard'));
const LecturerDashboard = lazy(() => import("../pages/lecturer/LecturerDashboard"));

const Notes = lazy(() => import("../pages/student/Notes"));
const CreateNote = lazy(() => import("../pages/student/CreateNote"));
const Flashcards = lazy(() => import("../pages/student/Flashcards"));
const CreateFlashcard = lazy(() => import("../pages/student/CreateFlashcard"));
const FlashcardStudy = lazy(() => import("../pages/student/FlashcardStudy"));
const Quizzes = lazy(() => import("../pages/student/Quizzes"));
const CreateQuiz = lazy(() => import("../pages/student/CreateQuiz"));

// const QuizRoom = lazy(() => import("../pages/quizroom/JoinQuizRoom"));
// const Leaderboard = lazy(() => import("../pages/quizroom/Leaderboard"));

type RequireAuthProps = {
  children: ReactNode;
  roles?: string[];
};

const RequireAuth = ({ children, roles }: RequireAuthProps) => {
  const { user, loading } = useAuth();

  if (loading) return <div>User loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (roles && !roles.some((role) => user.role?.includes(role))) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold">Access Denied</h2>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>

        <Routes>
          {/* Public */}
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private */}
          <Route element={<Layout />}>

            {/* STUDENT Dashboard */}
            <Route
              path="/student/dashboard"
              element={
                <RequireAuth roles={["STUDENT", "ADMIN"]}>
                  <StudentDashboard />
                </RequireAuth>
              }
            />

            <Route
              path="/student/notes"
              element={
                <RequireAuth roles={["STUDENT", "LECTURER", "ADMIN"]}>
                  <Notes />
                </RequireAuth>
              }
            />

            <Route
              path="/student/notes/create"
              element={
                <RequireAuth roles={["STUDENT", "LECTURER", "ADMIN"]}>
                  <CreateNote />
                </RequireAuth>
              }
            />

            <Route
              path="/student/flashcards"
              element={
                <RequireAuth roles={["STUDENT", "LECTURER", "ADMIN"]}>
                  <Flashcards />
                </RequireAuth>
              }
            />

            <Route
              path="/student/flashcards/create"
              element={
                <RequireAuth roles={["STUDENT", "LECTURER", "ADMIN"]}>
                  <CreateFlashcard />
                </RequireAuth>
              }
            />

            <Route
              path="/student/flashcards/study"
              element={
                <RequireAuth roles={["STUDENT", "LECTURER", "ADMIN"]}>
                  <FlashcardStudy />
                </RequireAuth>
              }
            />

            <Route
              path="/student/quizzes"
              element={
                <RequireAuth roles={["STUDENT", "LECTURER", "ADMIN"]}>
                  <Quizzes />
                </RequireAuth>
              }
            />

            <Route
              path="/student/quizzes/create"
              element={
                <RequireAuth roles={["STUDENT", "LECTURER", "ADMIN"]}>
                  <CreateQuiz />
                </RequireAuth>
              }
            />

            {/* LECTURER Dashboard */}
            <Route
              path="/lecturer/dashboard"
              element={
                <RequireAuth roles={["LECTURER", "ADMIN"]}>
                  <LecturerDashboard />
                </RequireAuth>
              }
            />

            {/* Quiz Room */}
            {/* <Route
              path="/quiz-room"
              element={
                <RequireAuth roles={["STUDENT", "LECTURER", "ADMIN"]}>
                  <QuizRoom />
                </RequireAuth>
              }
            /> */}

            {/* Leaderboard */}
            {/* <Route
              path="/leaderboard/:roomId"
              element={
                <RequireAuth roles={["STUDENT", "LECTURER", "ADMIN"]}>
                  <Leaderboard />
                </RequireAuth>
              }
            /> */}

          </Route>
        </Routes>

      </Suspense>
    </BrowserRouter>
  );
}
