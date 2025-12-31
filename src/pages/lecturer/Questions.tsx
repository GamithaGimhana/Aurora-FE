import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate, Link } from "react-router-dom";

// --- Icons ---
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-600">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
  </svg>
);

const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

interface Question {
  _id: string;
  question: string;
  options: string[];
  answer: string;
  topic?: string;
}

export default function Questions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchQuestions = async () => {
    try {
      const res = await api.get("/questions/me");
      setQuestions(res.data.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch questions");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this question? This cannot be undone.")) return;

    try {
      await api.delete(`/questions/${id}`);
      setQuestions((prev) => prev.filter((q) => q._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete question");
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const filteredQuestions = questions.filter(q => 
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    q.topic?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <Link 
                    to="/lecturer/dashboard"
                    className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                >
                    <ChevronLeft />
                </Link>
                <h1 className="text-xl font-bold">Question Bank</h1>
            </div>
            
            <Link 
                to="/lecturer/questions/create" 
                className="hidden sm:flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition"
            >
                <PlusIcon /> Add Question
            </Link>
             <Link 
                to="/lecturer/questions/create" 
                className="sm:hidden flex items-center justify-center bg-black text-white w-10 h-10 rounded-full"
            >
                <PlusIcon />
            </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        
        {/* Search Bar */}
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon />
            </div>
            <input 
                type="text" 
                placeholder="Search by question or topic..." 
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-shadow shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        {/* Content */}
        {loading ? (
             <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-40 bg-white rounded-2xl border border-gray-200 animate-pulse"></div>
                ))}
             </div>
        ) : filteredQuestions.length === 0 ? (
            <div className="text-center py-20 bg-white border border-dashed border-gray-300 rounded-2xl">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-3xl mb-4">
                    📚
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                    {searchTerm ? "No matches found" : "Your bank is empty"}
                </h3>
                <p className="text-gray-500 mt-2 mb-6">
                    {searchTerm ? "Try a different search term." : "Start building your library of questions."}
                </p>
                {!searchTerm && (
                    <button onClick={() => navigate("/lecturer/questions/create")} className="text-indigo-600 font-bold hover:underline">
                        Create your first question
                    </button>
                )}
            </div>
        ) : (
            <div className="space-y-4">
            {filteredQuestions.map((q) => (
                <div key={q._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:border-indigo-200 transition-colors group">
                    <div className="flex justify-between items-start gap-4 mb-4">
                        <div>
                            {q.topic && (
                                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-600 mb-2 uppercase tracking-wide">
                                    {q.topic}
                                </span>
                            )}
                            <h3 className="text-lg font-bold text-gray-900 leading-snug">
                                {q.question}
                            </h3>
                        </div>
                        <button
                            onClick={() => handleDelete(q._id)}
                            className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Question"
                        >
                            <TrashIcon />
                        </button>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-2 text-sm">
                        {q.options.map((opt, idx) => {
                            const isAnswer = opt === q.answer;
                            return (
                                <div 
                                    key={idx} 
                                    className={`px-3 py-2 rounded-lg border flex items-center gap-2 ${
                                        isAnswer 
                                            ? "bg-green-50 border-green-200 text-green-800 font-medium" 
                                            : "bg-gray-50 border-transparent text-gray-600"
                                    }`}
                                >
                                    {isAnswer ? (
                                        <CheckCircleIcon />
                                    ) : (
                                        <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-[10px] text-gray-400 font-bold bg-white">
                                            {String.fromCharCode(65 + idx)}
                                        </div>
                                    )}
                                    <span>{opt}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
            </div>
        )}
      </div>
    </div>
  );
}