import { Link } from "react-router-dom";

export default function StudentDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* =========================
          SIDEBAR
      ============================ */}
      <aside className="w-64 bg-white shadow-md px-6 py-8 flex flex-col">

        {/* Logo */}
        <div className="flex items-center gap-2 mb-10">
          <div className="w-6 h-6 rounded-full border-2 border-blue-600"></div>
          <h1 className="text-xl font-bold">Easy Study</h1>
        </div>

        {/* Create New Button */}
        <button className="w-full bg-blue-600 text-white py-3 rounded-xl mb-8 hover:bg-blue-700">
          + Create New
        </button>

        {/* Nav Items */}
        <nav className="flex flex-col gap-6 text-gray-700">
          <Link to="/student/dashboard" className="flex items-center gap-3 text-blue-600 font-semibold">
            <span className="text-lg">▦</span> Dashboard
          </Link>

          <Link to="/student/upgrade" className="flex items-center gap-3 hover:text-black">
            <span className="text-lg">🛡</span> Upgrade
          </Link>

          <Link to="/student/profile" className="flex items-center gap-3 hover:text-black">
            <span className="text-lg">👤</span> Profile
          </Link>
        </nav>
      </aside>

      {/* =========================
          MAIN CONTENT
      ============================ */}
      <main className="flex-1 px-10 py-8">

        {/* Hero Banner */}
        <div className="w-full bg-blue-600 text-white rounded-xl p-10 flex justify-between items-center mb-10 shadow">
          <div>
            <h2 className="text-3xl font-bold">Hello, Game Play</h2>
            <p className="mt-2 text-white/90">
              Welcome Back, It's time to get back and start learning new course
            </p>
          </div>

          <img
            src="/banner-illustration.png"
            alt="Laptop"
            className="w-40 h-40 object-contain"
          />
        </div>

        {/* Study Materials Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Your Study Material
          </h3>

          <button className="flex items-center gap-2 text-gray-600 px-4 py-2 border rounded-lg hover:bg-gray-100">
            🔄 Refresh
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card */}
          <div className="bg-white rounded-xl shadow p-5">
            <div className="flex justify-between items-start">
              <img src="/book-icon.png" className="w-12 h-12" />
              <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                20 Dec 2024
              </span>
            </div>

            <h4 className="text-lg font-semibold mt-4">
              Full Stack React Developer Interview Prep
            </h4>

            <p className="text-gray-600 mt-2 text-sm">
              This course prepares you for full-stack React developer interviews…
            </p>

            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
              View
            </button>
          </div>

          {/* Duplicate card example 2 */}
          <div className="bg-white rounded-xl shadow p-5">
            <div className="flex justify-between items-start">
              <img src="/book-icon.png" className="w-12 h-12" />
              <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                20 Dec 2024
              </span>
            </div>

            <h4 className="text-lg font-semibold mt-4">Easy Python</h4>

            <p className="text-gray-600 mt-2 text-sm">
              A concise introduction to Python programming fundamentals.
            </p>

            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
              View
            </button>
          </div>

          {/* Duplicate card example 3 */}
          <div className="bg-white rounded-xl shadow p-5">
            <div className="flex justify-between items-start">
              <img src="/book-icon.png" className="w-12 h-12" />
              <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                20 Dec 2024
              </span>
            </div>

            <h4 className="text-lg font-semibold mt-4">ReactJS for Beginners</h4>

            <p className="text-gray-600 mt-2 text-sm">
              A beginner-friendly introduction to ReactJS.
            </p>

            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
              View
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
