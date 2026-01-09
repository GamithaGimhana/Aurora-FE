import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { logout } from "../store/auth/authSlice";
import { Menu, X } from "lucide-react"; // Icons

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setIsMenuOpen(false); // Close menu on logout
  };

  // Safely check roles
  const isStudent = user?.role?.includes("STUDENT");
  const isLecturer = user?.role?.includes("LECTURER");
  const isAdmin = user?.role?.includes("ADMIN");

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  // Helper to render links so we don't duplicate logic
  // passing "mobile" prop to change styling slightly for the dropdown
  const renderLinks = (isMobile = false) => (
    <>
      {isStudent && (
        <>
          <NavLink to="/student/dashboard" mobile={isMobile} onClick={() => setIsMenuOpen(false)}>Dashboard</NavLink>
          <NavLink to="/notes" mobile={isMobile} onClick={() => setIsMenuOpen(false)}>Notes</NavLink>
          <NavLink to="/flashcards" mobile={isMobile} onClick={() => setIsMenuOpen(false)}>Flashcards</NavLink>
          <NavLink to="/student/rooms/available" mobile={isMobile} onClick={() => setIsMenuOpen(false)}>Quizzes</NavLink>
        </>
      )}

      {isLecturer && (
        <>
          <NavLink to="/lecturer/dashboard" mobile={isMobile} onClick={() => setIsMenuOpen(false)}>Dashboard</NavLink>
          <NavLink to="/notes" mobile={isMobile} onClick={() => setIsMenuOpen(false)}>Notes</NavLink>
          <NavLink to="/flashcards" mobile={isMobile} onClick={() => setIsMenuOpen(false)}>Flashcards</NavLink>
          <NavLink to="/lecturer/rooms" mobile={isMobile} onClick={() => setIsMenuOpen(false)}>Quiz Rooms</NavLink>
        </>
      )}

      {isAdmin && (
        <>
          <NavLink to="/admin/dashboard" mobile={isMobile} onClick={() => setIsMenuOpen(false)}>Admin</NavLink>
          <NavLink to="/admin/users" mobile={isMobile} onClick={() => setIsMenuOpen(false)}>Users</NavLink>
        </>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Left: Brand */}
        <Link to="/" className="flex items-center gap-2 z-50">
          <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">
            A
          </div>
          <span className="text-lg font-bold tracking-tight text-gray-900">
            Aurora
          </span>
        </Link>

        {/* Center: Desktop Navigation (Hidden on Mobile) */}
        <nav className="hidden md:flex items-center gap-1 bg-gray-100/50 p-1 rounded-full border border-gray-100">
          {renderLinks(false)}
        </nav>

        {/* Right: User actions & Mobile Toggle */}
        <div className="flex items-center gap-4 z-50">
          
          {/* User badge (Hidden on very small screens if you want, or keep it) */}
          <Link
            to="/profile"
            className="hidden sm:flex items-center gap-3 pl-1 pr-4 py-1 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
              {initial}
            </div>
            <div className="flex flex-col text-xs">
              <span className="font-semibold text-gray-900 leading-none">
                {user?.name ?? "User"}
              </span>
              <span className="text-gray-500 lowercase mt-0.5 leading-none">
                {user?.role?.join(", ").toLowerCase()}
              </span>
            </div>
          </Link>

          {/* Desktop Logout */}
          <button
            onClick={handleLogout}
            className="hidden md:block text-sm font-medium text-gray-500 hover:text-red-600 transition-colors px-2"
          >
            Sign out
          </button>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-lg flex flex-col p-4 animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-2">
            {renderLinks(true)}
          </nav>
          
          <div className="border-t border-gray-100 my-4 pt-4 flex flex-col gap-3">
             {/* Mobile User Profile Link */}
             <Link to="/profile" className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                    {initial}
                </div>
                <span className="font-semibold text-gray-900">My Profile</span>
             </Link>

            <button
              onClick={handleLogout}
              className="text-left text-sm font-medium text-red-600 hover:text-red-700 transition-colors py-2"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({
  to,
  children,
  mobile = false,
  onClick,
}: {
  to: string;
  children: string;
  mobile?: boolean;
  onClick?: () => void;
}) {
  const location = useLocation();
  const isActive = location.pathname === to;

  // Different styles for Desktop (Pill) vs Mobile (Full width block)
  const baseStyles = "text-sm font-medium transition-all";
  const desktopStyles = `px-4 py-1.5 rounded-full ${
    isActive
      ? "bg-white text-black shadow-sm"
      : "text-gray-500 hover:text-gray-900 hover:bg-gray-200/50"
  }`;
  const mobileStyles = `block px-4 py-3 rounded-lg ${
    isActive
      ? "bg-gray-100 text-black font-semibold"
      : "text-gray-600 hover:bg-gray-50"
  }`;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`${baseStyles} ${mobile ? mobileStyles : desktopStyles}`}
    >
      {children}
    </Link>
  );
}