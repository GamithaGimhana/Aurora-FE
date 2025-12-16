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
    <header className="sticky top-0 z-40 bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Left: Brand */}
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight text-black"
        >
          Aurora
        </Link>

        {/* Center: Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          {user?.role?.includes("STUDENT") && (
            <>
              <NavLink to="/student/dashboard">Dashboard</NavLink>
              <NavLink to="/student/notes">Notes</NavLink>
              <NavLink to="/student/flashcards">Flashcards</NavLink>
              <NavLink to="/student/quizzes">Quizzes</NavLink>
            </>
          )}

          {user?.role?.includes("LECTURER") && (
            <>
              <NavLink to="/lecturer/dashboard">Dashboard</NavLink>
              <NavLink to="/quiz-room">Quiz Room</NavLink>
            </>
          )}
        </nav>

        {/* Right: User actions */}
        <div className="flex items-center gap-4">

          {/* User badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm">
            <span className="font-medium">
              {user?.name ?? "User"}
            </span>
            <span className="text-gray-400 text-xs">
              {user?.role?.[0]}
            </span>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="text-sm px-4 py-2 rounded-lg border hover:bg-slate-100 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

/* ---------- Small helper ---------- */

function NavLink({
  to,
  children,
}: {
  to: string;
  children: string;
}) {
  return (
    <Link
      to={to}
      className="hover:text-black transition"
    >
      {children}
    </Link>
  );
}
