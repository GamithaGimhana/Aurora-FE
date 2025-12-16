import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyQuizzes, deleteQuiz } from "../../services/quiz";

interface Quiz {
  _id: string;
  title: string;
  description: string;
  difficulty: string;
  questions: any[];
}

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await getMyQuizzes();
      setQuizzes(res.data);
    } catch {
      alert("Failed to load quizzes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this quiz?")) return;
    await deleteQuiz(id);
    load();
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Quizzes</h1>

        <Link
          to="/student/quizzes/create"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg"
        >
          + Create Quiz
        </Link>
      </div>

      {quizzes.length === 0 ? (
        <p>No quizzes created yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {quizzes.map((q) => (
            <div
              key={q._id}
              className="bg-white p-6 rounded-xl shadow"
            >
              <h3 className="text-xl font-semibold">{q.title}</h3>
              <p className="text-sm text-gray-600">{q.description}</p>

              <div className="mt-3 text-sm">
                Difficulty: <b>{q.difficulty}</b>
              </div>

              <div className="mt-2 text-sm">
                Questions: {q.questions.length}
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleDelete(q._id)}
                  className="text-red-600"
                >
                  Delete
                </button>

                <Link
                  to={`/student/quizzes/${q._id}`}
                  className="text-blue-600"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
