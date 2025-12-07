import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between">
        
        <Link to="/" className="text-2xl font-semibold">AI Quiz</Link>

        <nav className="flex items-center gap-6">
          {user?.role?.includes("STUDENT") && (
            <>
              <Link to="/student/dashboard">Dashboard</Link>
              <Link to="/student/notes">Notes</Link>
              <Link to="/student/flashcards">Flashcards</Link>
              <Link to="/student/quiz-generator">Quiz Generator</Link>
            </>
          )}

          {user?.role?.includes("LECTURER") && (
            <>
              <Link to="/lecturer/dashboard">Lecturer Panel</Link>
              <Link to="/quiz-room">Quiz Room</Link>
            </>
          )}

          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </nav>

      </div>
    </header>
  );
}
