import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 px-6">
      
      <h1 className="text-5xl font-extrabold text-gray-800 mb-4 text-center">
        QuizMaster Pro
      </h1>

      <p className="text-lg text-gray-700 max-w-xl text-center mb-8">
        Create flashcards. Build quizzes. Run live classrooms.  
        Learn smarter — teach smarter.
      </p>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 shadow-md"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg text-lg hover:bg-blue-50 shadow-md"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
