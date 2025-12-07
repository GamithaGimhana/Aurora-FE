import { Link } from "react-router-dom";

export default function LecturerDashboard() {
  return (
    <div className="min-h-screen w-full px-6 py-10">

      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Lecturer Dashboard
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-gray-600 text-sm mb-2">Notes</h2>
          <p className="text-3xl font-bold text-blue-600">0</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-gray-600 text-sm mb-2">Flashcards</h2>
          <p className="text-3xl font-bold text-purple-600">0</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-gray-600 text-sm mb-2">Quizzes</h2>
          <p className="text-3xl font-bold text-green-600">0</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-gray-600 text-sm mb-2">Quiz Rooms</h2>
          <p className="text-3xl font-bold text-indigo-600">0</p>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        <Link
          to="/lecturer/notes/create"
          className="p-6 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition-all"
        >
          <h3 className="text-xl font-semibold">Create Notes</h3>
          <p className="text-sm opacity-80">Write structured study notes.</p>
        </Link>

        <Link
          to="/lecturer/flashcards/create"
          className="p-6 bg-purple-600 text-white rounded-xl shadow-md hover:bg-purple-700 transition-all"
        >
          <h3 className="text-xl font-semibold">Create Flashcards</h3>
          <p className="text-sm opacity-80">Add flashcards for students.</p>
        </Link>

        <Link
          to="/lecturer/quiz/create"
          className="p-6 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 transition-all"
        >
          <h3 className="text-xl font-semibold">Create Quiz</h3>
          <p className="text-sm opacity-80">Build question-based quizzes.</p>
        </Link>

        <Link
          to="/lecturer/rooms/create"
          className="p-6 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition-all"
        >
          <h3 className="text-xl font-semibold">Create Quiz Room</h3>
          <p className="text-sm opacity-80">Generate live quiz rooms.</p>
        </Link>

        <Link
          to="/lecturer/resources"
          className="p-6 bg-cyan-600 text-white rounded-xl shadow-md hover:bg-cyan-700 transition-all"
        >
          <h3 className="text-xl font-semibold">My Resources</h3>
          <p className="text-sm opacity-80">Manage all your notes & materials.</p>
        </Link>

        <Link
          to="/ai/generate"
          className="p-6 bg-rose-600 text-white rounded-xl shadow-md hover:bg-rose-700 transition-all"
        >
          <h3 className="text-xl font-semibold">AI Generate Content</h3>
          <p className="text-sm opacity-80">Generate notes, flashcards, quizzes.</p>
        </Link>

      </div>
    </div>
  );
}
