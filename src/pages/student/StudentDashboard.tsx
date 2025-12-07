import { Link } from "react-router-dom";

export default function StudentDashboard() {
  return (
    <div className="min-h-screen w-full px-6 py-10">

      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Student Dashboard
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-gray-600 text-sm mb-2">Flashcards</h2>
          <p className="text-3xl font-bold text-blue-600">0</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-gray-600 text-sm mb-2">Quizzes Assigned</h2>
          <p className="text-3xl font-bold text-purple-600">0</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-gray-600 text-sm mb-2">Your Attempts</h2>
          <p className="text-3xl font-bold text-green-600">0</p>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <Link
          to="/flashcards"
          className="p-6 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 flex flex-col gap-2"
        >
          <h3 className="text-xl font-semibold">View Flashcards</h3>
          <p className="text-sm opacity-80">
            Explore all flashcards you can study.
          </p>
        </Link>

        <Link
          to="/quizzes"
          className="p-6 bg-purple-600 text-white rounded-xl shadow-md hover:bg-purple-700 flex flex-col gap-2"
        >
          <h3 className="text-xl font-semibold">My Quizzes</h3>
          <p className="text-sm opacity-80">
            Start or continue quizzes assigned to you.
          </p>
        </Link>

        <Link
          to="/attempts"
          className="p-6 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 flex flex-col gap-2"
        >
          <h3 className="text-xl font-semibold">My Attempts</h3>
          <p className="text-sm opacity-80">
            Review your completed quiz attempts.
          </p>
        </Link>

        <Link
          to="/join-room"
          className="p-6 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 flex flex-col gap-2"
        >
          <h3 className="text-xl font-semibold">Join Live Quiz Room</h3>
          <p className="text-sm opacity-80">
            Enter a quiz room with a room code.
          </p>
        </Link>

      </div>
    </div>
  );
}
