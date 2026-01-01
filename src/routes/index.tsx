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

const Notes = lazy(() => import("../pages/Notes"));
const CreateNote = lazy(() => import("../pages/CreateNote"));
const ViewNote = lazy(() => import("../pages/ViewNote"));
const Flashcards = lazy(() => import("../pages/Flashcards"));
const CreateFlashcard = lazy(() => import("../pages/CreateFlashcard"));
const FlashcardStudy = lazy(() => import("../pages/FlashcardStudy"));
const Quizzes = lazy(() => import("../pages/student/Quizzes"));
const QuizRoom = lazy(() => import("../pages/student/QuizRoom"));
const QuizResult = lazy(() => import("../pages/student/QuizResult"));
const JoinQuizRoom = lazy(() => import("../pages/student/JoinRoom"));

const CreateQuiz = lazy(() => import("../pages/lecturer/CreateQuiz"));
const CreateQuizRoom = lazy(() => import("../pages/lecturer/CreateQuizRoom"));
const QuestionBank = lazy(() => import("../pages/lecturer/QuestionBank"));
const CreateQuestion = lazy(() => import("../pages/lecturer/CreateQuestion"));
const Questions = lazy(() => import("../pages/lecturer/Questions"));
const LecturerRooms = lazy(() => import("../pages/lecturer/LecturerRooms"));

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
              path="/notes"
              element={
                <RequireAuth roles={["STUDENT", "LECTURER", "ADMIN"]}>
                  <Notes />
                </RequireAuth>
              }
            />

            <Route
              path="/notes/:id"
              element={
                <RequireAuth roles={["STUDENT", "LECTURER", "ADMIN"]}>
                  <ViewNote />
                </RequireAuth>
              }
            />

            <Route
              path="/notes/create"
              element={
                <RequireAuth roles={["STUDENT", "LECTURER", "ADMIN"]}>
                  <CreateNote />
                </RequireAuth>
              }
            />

            <Route
              path="/flashcards"
              element={
                <RequireAuth roles={["STUDENT", "LECTURER", "ADMIN"]}>
                  <Flashcards />
                </RequireAuth>
              }
            />

            <Route
              path="/flashcards/create"
              element={
                <RequireAuth roles={["STUDENT", "LECTURER", "ADMIN"]}>
                  <CreateFlashcard />
                </RequireAuth>
              }
            />

            <Route
              path="/flashcards/study"
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

            {/* LECTURER Dashboard */}
            <Route
              path="/lecturer/dashboard"
              element={
                <RequireAuth roles={["LECTURER", "ADMIN"]}>
                  <LecturerDashboard />
                </RequireAuth>
              }
            />

            <Route
              path="/lecturer/quizzes/create"
              element={
                <RequireAuth roles={["LECTURER", "ADMIN"]}>
                  <CreateQuiz />
                </RequireAuth>
              }
            />

            <Route
              path="/lecturer/rooms/create"
              element={
                <RequireAuth roles={["LECTURER", "ADMIN"]}>
                  <CreateQuizRoom />
                </RequireAuth>
              }
            />

            <Route
              path="/lecturer/questions"
              element={
                <RequireAuth roles={["LECTURER", "ADMIN"]}>
                  <Questions />
                </RequireAuth>
              }
            />

            <Route
              path="/lecturer/questions/create"
              element={
                <RequireAuth roles={["LECTURER", "ADMIN"]}>
                  <CreateQuestion />
                </RequireAuth>
              }
            />

            <Route
              path="/lecturer/questions/bank"
              element={
                <RequireAuth roles={["LECTURER", "ADMIN"]}>
                  <QuestionBank selected={[]} setSelected={function (ids: string[]): void {
                    throw new Error("Function not implemented.");
                  } } />
                </RequireAuth>
              }
            />

            <Route
              path="/lecturer/rooms"
              element={
                <RequireAuth roles={["LECTURER", "ADMIN"]}>
                  <LecturerRooms />
                </RequireAuth>
              }
            />

            {/* Join Quiz Room */}
            <Route
              path="/student/quiz/join"
              element={
                <RequireAuth roles={["STUDENT", "LECTURER", "ADMIN"]}>
                  <JoinQuizRoom />
                </RequireAuth>
              }
            />

            {/* Quiz Room */}
            <Route
              path="/student/rooms/:roomId"
              element={
                <RequireAuth roles={["STUDENT", "LECTURER", "ADMIN"]}>
                  <QuizRoom />
                </RequireAuth>
              }
            />

            {/* Quiz Result / Leaderboard */}
            <Route
              path="/student/quiz/result/:roomId"
              element={
                <RequireAuth roles={["STUDENT", "LECTURER", "ADMIN"]}>
                  <QuizResult />
                </RequireAuth>
              }
            />

          </Route>
        </Routes>

      </Suspense>
    </BrowserRouter>
  );
}
