import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import ProtectedRoute from "./ProtectedRoute";

/* ------------------- Lazy-loaded Pages ------------------- */
// Public
const Welcome = lazy(() => import("../pages/Welcome"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Profile = lazy(() => import("../pages/Profile"));

// Admin
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const AdminUsers = lazy(() => import("../pages/admin/AdminUsers"));

// Student
const StudentDashboard = lazy(() => import("../pages/student/StudentDashboard"));
const Quizzes = lazy(() => import("../pages/student/Quizzes"));
const QuizRoom = lazy(() => import("../pages/student/QuizRoom"));
const JoinQuizRoom = lazy(() => import("../pages/student/JoinRoom"));
const Attempt = lazy(() => import("../pages/student/Attempt"));
const AttemptResult = lazy(() => import("../pages/student/AttemptResult"));
const StudentLeaderboard = lazy(() => import("../pages/student/StudentLeaderboard"));

// Lecturer
const LecturerDashboard = lazy(() => import("../pages/lecturer/LecturerDashboard"));
const CreateQuiz = lazy(() => import("../pages/lecturer/CreateQuiz"));
const CreateQuizRoom = lazy(() => import("../pages/lecturer/CreateQuizRoom"));
const Questions = lazy(() => import("../pages/lecturer/Questions"));
const CreateQuestion = lazy(() => import("../pages/lecturer/CreateQuestion"));
const QuestionBank = lazy(() => import("../pages/lecturer/QuestionBank"));
const LecturerRooms = lazy(() => import("../pages/lecturer/LecturerRooms"));
const RoomLeaderboard = lazy(() => import("../pages/lecturer/RoomLeaderboard"));

// Notes & Flashcards (common)
const Notes = lazy(() => import("../pages/Notes"));
const CreateNote = lazy(() => import("../pages/CreateNote"));
const ViewNote = lazy(() => import("../pages/ViewNote"));
const Flashcards = lazy(() => import("../pages/Flashcards"));
const CreateFlashcard = lazy(() => import("../pages/CreateFlashcard"));
const FlashcardStudy = lazy(() => import("../pages/FlashcardStudy"));

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>

          {/* ------------------- Public Routes ------------------- */}
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />

          {/* ------------------- Protected Routes ------------------- */}
          <Route element={<Layout />}>

            {/* Admin */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute roles={["ADMIN"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <ProtectedRoute roles={["ADMIN"]}>
                  <AdminUsers />
                </ProtectedRoute>
              }
            />

            {/* Student (Lecturer + Admin allowed) */}
            <Route
              path="/student/dashboard"
              element={
                <ProtectedRoute roles={["STUDENT", "LECTURER", "ADMIN"]}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/student/rooms/available"
              element={
                <ProtectedRoute roles={["STUDENT", "LECTURER", "ADMIN"]}>
                  <Quizzes />
                </ProtectedRoute>
              }
            />

            <Route
              path="/student/join"
              element={
                <ProtectedRoute roles={["STUDENT", "LECTURER", "ADMIN"]}>
                  <JoinQuizRoom />
                </ProtectedRoute>
              }
            />

            <Route
              path="/student/rooms/:roomId"
              element={
                <ProtectedRoute roles={["STUDENT", "LECTURER", "ADMIN"]}>
                  <QuizRoom />
                </ProtectedRoute>
              }
            />

            <Route
              path="/student/attempt/:attemptId"
              element={
                <ProtectedRoute roles={["STUDENT", "LECTURER", "ADMIN"]}>
                  <Attempt />
                </ProtectedRoute>
              }
            />

            <Route
              path="/student/attempt/result/:attemptId"
              element={
                <ProtectedRoute roles={["STUDENT", "LECTURER", "ADMIN"]}>
                  <AttemptResult />
                </ProtectedRoute>
              }
            />

            <Route
              path="/student/rooms/:roomId/leaderboard"
              element={
                <ProtectedRoute roles={["STUDENT", "LECTURER", "ADMIN"]}>
                  <StudentLeaderboard />
                </ProtectedRoute>
              }
            />

            {/* Lecturer */}
            <Route
              path="/lecturer/dashboard"
              element={
                <ProtectedRoute roles={["LECTURER", "ADMIN"]}>
                  <LecturerDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/lecturer/quizzes/create"
              element={
                <ProtectedRoute roles={["LECTURER", "ADMIN"]}>
                  <CreateQuiz />
                </ProtectedRoute>
              }
            />

            <Route
              path="/lecturer/rooms/create"
              element={
                <ProtectedRoute roles={["LECTURER", "ADMIN"]}>
                  <CreateQuizRoom />
                </ProtectedRoute>
              }
            />

            <Route
              path="/lecturer/questions"
              element={
                <ProtectedRoute roles={["LECTURER", "ADMIN"]}>
                  <Questions />
                </ProtectedRoute>
              }
            />

            <Route
              path="/lecturer/questions/create"
              element={
                <ProtectedRoute roles={["LECTURER", "ADMIN"]}>
                  <CreateQuestion />
                </ProtectedRoute>
              }
            />

            <Route
              path="/lecturer/questions/bank"
              element={
                <ProtectedRoute roles={["LECTURER", "ADMIN"]}>
                  <QuestionBank selected={[]} setSelected={() => {}} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/lecturer/rooms"
              element={
                <ProtectedRoute roles={["LECTURER", "ADMIN"]}>
                  <LecturerRooms />
                </ProtectedRoute>
              }
            />

            <Route
              path="/lecturer/rooms/:roomId/leaderboard"
              element={
                <ProtectedRoute roles={["LECTURER", "ADMIN"]}>
                  <RoomLeaderboard />
                </ProtectedRoute>
              }
            />

            {/* Notes & Flashcards (All logged-in users) */}
            <Route
              path="/notes"
              element={
                <ProtectedRoute roles={["STUDENT", "LECTURER", "ADMIN"]}>
                  <Notes />
                </ProtectedRoute>
              }
            />

            <Route
              path="/notes/create"
              element={
                <ProtectedRoute roles={["STUDENT", "LECTURER", "ADMIN"]}>
                  <CreateNote />
                </ProtectedRoute>
              }
            />

            <Route
              path="/notes/:id"
              element={
                <ProtectedRoute roles={["STUDENT", "LECTURER", "ADMIN"]}>
                  <ViewNote />
                </ProtectedRoute>
              }
            />

            <Route
              path="/flashcards"
              element={
                <ProtectedRoute roles={["STUDENT", "LECTURER", "ADMIN"]}>
                  <Flashcards />
                </ProtectedRoute>
              }
            />

            <Route
              path="/flashcards/create"
              element={
                <ProtectedRoute roles={["STUDENT", "LECTURER", "ADMIN"]}>
                  <CreateFlashcard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/flashcards/study"
              element={
                <ProtectedRoute roles={["STUDENT", "LECTURER", "ADMIN"]}>
                  <FlashcardStudy />
                </ProtectedRoute>
              }
            />

          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
