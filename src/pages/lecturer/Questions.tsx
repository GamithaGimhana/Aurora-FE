import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate, Link } from "react-router-dom";
import { Toaster, toast } from "sonner"; // 1. Import Sonner
import { 
  Plus, 
  Trash2, 
  Search, 
  CheckCircle, 
  ChevronLeft 
} from "lucide-react";

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
      // 2. Fetch Error Toast
      toast.error("Network Error", { description: "Failed to load question bank." });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    // 3. Custom Confirmation Toast
    toast("Delete this question?", {
        description: "This action cannot be undone.",
        action: {
            label: "Delete",
            onClick: async () => {
                // 4. Delete API Promise
                const deletePromise = api.delete(`/questions/${id}`);

                toast.promise(deletePromise, {
                    loading: "Deleting question...",
                    success: () => {
                        setQuestions((prev) => prev.filter((q) => q._id !== id));
                        return "Question deleted successfully";
                    },
                    error: "Failed to delete question"
                });
            }
        },
        cancel: {
            label: "Cancel",
            onClick: () => {}
        }
    });
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
      
      {/* 5. Toaster Component */}
      <Toaster position="top-right" richColors closeButton />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <Link 
                    to="/lecturer/dashboard"
                    className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                >
                    <ChevronLeft size={20} />
                </Link>
                <h1 className="text-xl font-bold">Question Bank</h1>
            </div>
            
            <Link 
                to="/lecturer/questions/create" 
                className="hidden sm:flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition"
            >
                <Plus size={18} strokeWidth={3} /> Add Question
            </Link>
             <Link 
                to="/lecturer/questions/create" 
                className="sm:hidden flex items-center justify-center bg-black text-white w-10 h-10 rounded-full"
            >
                <Plus size={24} />
            </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        
        {/* Search Bar */}
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Search className="w-5 h-5" />
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
                            <Trash2 size={20} />
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
                                        <CheckCircle className="w-5 h-5 text-green-600" />
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