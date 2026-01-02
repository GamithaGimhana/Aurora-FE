import { lazy, Suspense, type ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import Layout from "../components/Layout";

/* ------------------- Lazy-loaded Pages ------------------- */
// Public
const Welcome = lazy(() => import("../pages/Welcome"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

// Student
const StudentDashboard = lazy(() => import('../pages/student/StudentDashboard'));
const Quizzes = lazy(() => import("../pages/student/Quizzes"));
const QuizRoom = lazy(() => import("../pages/student/QuizRoom"));
const JoinQuizRoom = lazy(() => import("../pages/student/JoinRoom"));
const Attempt = lazy(() => import("../pages/student/Attempt"));
const AttemptResult = lazy(() => import("../pages/student/AttemptResult"));

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

/* ------------------- Auth Wrapper ------------------- */
type RequireAuthProps = {
  children: ReactNode;
  roles?: string[];
};

const RequireAuth = ({ children, roles }: RequireAuthProps) => {
  const { user, loading } = useAuth();

  if (loading) return <div>User loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.some(role => user.role?.includes(role))) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold">Access Denied</h2>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return <>{children}</>;
};

/* ------------------- Helper ------------------- */
const PrivateRoute = ({ roles, children }: { roles?: string[], children: ReactNode }) => (
  <RequireAuth roles={roles}>{children}</RequireAuth>
);

/* ------------------- Router ------------------- */
export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>

          {/* ------------------- Public Routes ------------------- */}
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ------------------- Private Routes with Layout ------------------- */}
          <Route element={<Layout />}>

            {/* Student */}
            <Route path="/student/dashboard" element={<PrivateRoute roles={["STUDENT", "ADMIN"]}><StudentDashboard /></PrivateRoute>} />
            <Route path="/student/quizzes" element={<PrivateRoute roles={["STUDENT", "LECTURER", "ADMIN"]}><Quizzes /></PrivateRoute>} />
            <Route path="/student/join" element={<PrivateRoute roles={["STUDENT", "LECTURER", "ADMIN"]}><JoinQuizRoom /></PrivateRoute>} />
            <Route path="/student/rooms/:roomId" element={<PrivateRoute roles={["STUDENT", "LECTURER", "ADMIN"]}><QuizRoom /></PrivateRoute>} />
            <Route path="/student/attempt/:attemptId" element={<PrivateRoute roles={["STUDENT", "LECTURER", "ADMIN"]}><Attempt /></PrivateRoute>} />
            <Route path="/student/attempt/result/:attemptId" element={<PrivateRoute roles={["STUDENT", "LECTURER", "ADMIN"]}><AttemptResult /></PrivateRoute>} />

            {/* Lecturer */}
            <Route path="/lecturer/dashboard" element={<PrivateRoute roles={["LECTURER", "ADMIN"]}><LecturerDashboard /></PrivateRoute>} />
            <Route path="/lecturer/quizzes/create" element={<PrivateRoute roles={["LECTURER", "ADMIN"]}><CreateQuiz /></PrivateRoute>} />
            <Route path="/lecturer/rooms/create" element={<PrivateRoute roles={["LECTURER", "ADMIN"]}><CreateQuizRoom /></PrivateRoute>} />
            <Route path="/lecturer/questions" element={<PrivateRoute roles={["LECTURER", "ADMIN"]}><Questions /></PrivateRoute>} />
            <Route path="/lecturer/questions/create" element={<PrivateRoute roles={["LECTURER", "ADMIN"]}><CreateQuestion /></PrivateRoute>} />
            <Route path="/lecturer/questions/bank" element={<PrivateRoute roles={["LECTURER", "ADMIN"]}><QuestionBank selected={[]} setSelected={() => {}} /></PrivateRoute>} />
            <Route path="/lecturer/rooms" element={<PrivateRoute roles={["LECTURER", "ADMIN"]}><LecturerRooms /></PrivateRoute>} />
            <Route path="/lecturer/rooms/:roomId/leaderboard" element={<PrivateRoute roles={["LECTURER", "ADMIN"]}><RoomLeaderboard /></PrivateRoute>} />

            {/* Notes & Flashcards */}
            <Route path="/notes" element={<PrivateRoute roles={["STUDENT", "LECTURER", "ADMIN"]}><Notes /></PrivateRoute>} />
            <Route path="/notes/:id" element={<PrivateRoute roles={["STUDENT", "LECTURER", "ADMIN"]}><ViewNote /></PrivateRoute>} />
            <Route path="/notes/create" element={<PrivateRoute roles={["STUDENT", "LECTURER", "ADMIN"]}><CreateNote /></PrivateRoute>} />
            <Route path="/flashcards" element={<PrivateRoute roles={["STUDENT", "LECTURER", "ADMIN"]}><Flashcards /></PrivateRoute>} />
            <Route path="/flashcards/create" element={<PrivateRoute roles={["STUDENT", "LECTURER", "ADMIN"]}><CreateFlashcard /></PrivateRoute>} />
            <Route path="/flashcards/study" element={<PrivateRoute roles={["STUDENT", "LECTURER", "ADMIN"]}><FlashcardStudy /></PrivateRoute>} />

          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
