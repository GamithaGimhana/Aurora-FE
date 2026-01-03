import { Link, useNavigate, useLocation } from "react-router-dom";
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

  // Generate initials for the avatar (e.g., "John Doe" -> "J")
  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Left: Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm group-hover:bg-gray-800 transition-colors">
            A
          </div>
          <span className="text-lg font-bold tracking-tight text-gray-900">
            Aurora
          </span>
        </Link>

        {/* Center: Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-gray-100/50 p-1 rounded-full border border-gray-100">
          {user?.role?.includes("STUDENT") && (
            <>
              <NavLink to="/student/dashboard">Dashboard</NavLink>
              <NavLink to="/notes">Notes</NavLink>
              <NavLink to="/flashcards">Flashcards</NavLink>
              <NavLink to="/student/quizzes">Quizzes</NavLink>
            </>
          )}

          {user?.role?.includes("LECTURER") && (
            <>
              <NavLink to="/lecturer/dashboard">Dashboard</NavLink>
              <NavLink to="/notes">Notes</NavLink>
              <NavLink to="/flashcards">Flashcards</NavLink>
              <NavLink to="/lecturer/rooms">Quiz Room</NavLink>
            </>
          )}
        </nav>

        {/* Right: User actions */}
        <div className="flex items-center gap-4">
          
          {/* User badge */}
          <div className="hidden sm:flex items-center gap-3 pl-1 pr-4 py-1 rounded-full border border-gray-200 bg-white shadow-sm">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
              {initial}
            </div>
            <div className="flex flex-col text-xs">
              <span className="font-semibold text-gray-900 leading-none">
                {user?.name ?? "User"}
              </span>
              <span className="text-gray-500 lowercase mt-0.5 leading-none">
                {/* {user?.role?.[0]} */}
                {user?.role?.join(", ")}
              </span>
            </div>
          </div>

          <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>

          {/* Logout */}
          <button
            onClick={logout}
            className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors px-2"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}

/* ---------- Helper Component ---------- */

function NavLink({
  to,
  children,
}: {
  to: string;
  children: string;
}) {
  const location = useLocation();
  // Check if this link is currently active
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
        isActive
          ? "bg-white text-black shadow-sm"
          : "text-gray-500 hover:text-gray-900 hover:bg-gray-200/50"
      }`}
    >
      {children}
    </Link>
  );
}