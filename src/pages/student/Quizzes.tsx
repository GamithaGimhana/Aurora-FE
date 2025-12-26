import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyQuizzes, deleteQuiz } from "../../services/quiz";

// --- Icons ---
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

const QuestionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

// --- Difficulty Badge Helper ---
const DifficultyBadge = ({ level }: { level: string }) => {
  const styles: Record<string, string> = {
    Easy: "bg-green-100 text-green-700 border-green-200",
    Medium: "bg-orange-100 text-orange-700 border-orange-200",
    Hard: "bg-red-100 text-red-700 border-red-200",
  };

  const defaultStyle = "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${styles[level] || defaultStyle}`}>
      {level}
    </span>
  );
};

// --- Skeleton ---
function QuizSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 animate-pulse h-48 flex flex-col justify-between">
          <div className="flex justify-between">
             <div className="h-6 w-32 bg-slate-100 rounded"></div>
             <div className="h-6 w-16 bg-slate-100 rounded-full"></div>
          </div>
          <div className="h-4 w-full bg-slate-100 rounded"></div>
          <div className="h-10 w-full bg-slate-100 rounded-xl mt-4"></div>
        </div>
      ))}
    </div>
  );
}

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

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Quizzes</h1>
            <p className="text-gray-500 mt-1">Create and take quizzes to test your knowledge.</p>
          </div>

          <Link
            to="/student/quizzes/create"
            className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition shadow-lg shadow-gray-200"
          >
            <PlusIcon /> Create Quiz
          </Link>
        </div>

        {/* Content */}
        {loading ? (
            <QuizSkeleton />
        ) : quizzes.length === 0 ? (
            <div className="text-center py-20 bg-white border border-dashed border-gray-300 rounded-2xl">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-3xl mb-4">
                    🧩
                </div>
                <h3 className="text-lg font-semibold text-gray-900">No quizzes yet</h3>
                <p className="text-gray-500 mt-2">Create a quiz to challenge yourself.</p>
            </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {quizzes.map((q) => (
              <div
                key={q._id}
                className="group bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Card Top */}
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {q.title}
                    </h3>
                    <DifficultyBadge level={q.difficulty} />
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-6 leading-relaxed line-clamp-2">
                    {q.description || "No description provided."}
                  </p>
                </div>

                {/* Card Bottom */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg">
                    <QuestionIcon /> {q.questions.length} Questions
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleDelete(q._id)}
                      className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                      title="Delete Quiz"
                    >
                      <TrashIcon />
                    </button>

                    <Link
                      to={`/student/quizzes/${q._id}`}
                      className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-100 transition-colors"
                    >
                      Start <ArrowRightIcon />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}