import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate, Link } from "react-router-dom";
import { 
  ChevronLeft, 
  Globe, 
  Lock, 
  Clock, 
  Calendar, 
  Sparkles 
} from "lucide-react";

export default function CreateQuizRoom() {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [quizId, setQuizId] = useState("");
  
  // Settings
  const [timeLimit, setTimeLimit] = useState<number>(10);
  const [maxAttempts, setMaxAttempts] = useState<number>(1);
  const [visibility, setVisibility] = useState("PUBLIC");
  
  // Schedule
  const [startsAt, setStartsAt] = useState<string>("");
  const [endsAt, setEndsAt] = useState<string>("");
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/quizzes/me");
        setQuizzes(res.data.data || res.data);
      } catch (err) {
        // Handle error gracefully
      } finally {
        setFetching(false);
      }
    })();
  }, []);

  const createRoom = async () => {
    if (!quizId) return alert("Please select a quiz to continue.");
    
    setLoading(true);
    try {
      await api.post("/rooms/create", {
        quizId,
        timeLimit: Number(timeLimit),
        maxAttempts: Number(maxAttempts),
        startsAt: startsAt || null,
        endsAt: endsAt || null,
        visibility,
      });

      navigate("/lecturer/rooms");
    } catch (err) {
      console.error(err);
      alert("Failed to create room. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const selectedQuiz = quizzes.find(q => q._id === quizId);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Link 
                    to="/lecturer/dashboard"
                    className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                >
                    <ChevronLeft size={20} />
                </Link>
                <h1 className="text-lg font-bold">New Session</h1>
            </div>
            
            {/* Quick Tip for Lecturer */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full">
                <Sparkles className="w-4 h-4" />
                <span>Room codes are generated automatically</span>
            </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        
        <div className="grid lg:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN - Main Config */}
            <div className="lg:col-span-2 space-y-6">

                {/* Section 1: Quiz Selection */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-xs">1</span>
                        Select Content
                    </h2>
                    
                    {fetching ? (
                        <div className="h-12 bg-gray-50 rounded-xl animate-pulse"></div>
                    ) : (
                        <div className="space-y-4">
                            <select 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none appearance-none cursor-pointer font-medium transition-all hover:bg-white"
                                value={quizId} 
                                onChange={(e) => setQuizId(e.target.value)}
                            >
                                <option value="">Select a quiz from library...</option>
                                {quizzes.map((q) => <option key={q._id} value={q._id}>{q.title}</option>)}
                            </select>

                            {/* Mini Preview of Selected Quiz */}
                            {selectedQuiz && (
                                <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100 flex items-start gap-4">
                                    <div className="bg-white p-2 rounded-lg text-2xl shadow-sm border border-indigo-100">
                                        📝
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-indigo-900">{selectedQuiz.title}</h4>
                                        <p className="text-xs text-indigo-700 mt-1 line-clamp-2">{selectedQuiz.description || "No description available."}</p>
                                        <div className="flex gap-2 mt-2">
                                            <span className="text-[10px] uppercase font-bold tracking-wider bg-white text-indigo-600 px-2 py-0.5 rounded border border-indigo-200">
                                                {selectedQuiz.difficulty}
                                            </span>
                                            <span className="text-[10px] uppercase font-bold tracking-wider bg-white text-indigo-600 px-2 py-0.5 rounded border border-indigo-200">
                                                {selectedQuiz.questions?.length || 0} Questions
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Section 2: Constraints */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-xs">2</span>
                        Constraints
                    </h2>
                    
                    <div className="grid sm:grid-cols-2 gap-6">
                        {/* Time Limit */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Duration (Minutes)</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none group-focus-within:text-indigo-600 transition-colors text-gray-400">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <input 
                                    type="number" 
                                    className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-bold text-gray-900"
                                    value={timeLimit} 
                                    onChange={(e) => setTimeLimit(Number(e.target.value))} 
                                    min={1}
                                />
                            </div>
                        </div>

                        {/* Max Attempts */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Max Attempts</label>
                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={() => setMaxAttempts(Math.max(1, maxAttempts - 1))}
                                    className="w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-xl font-bold text-lg transition-colors"
                                >-</button>
                                <div className="flex-1 text-center font-bold text-xl bg-gray-50 py-2.5 rounded-xl border border-gray-200">
                                    {maxAttempts}
                                </div>
                                <button 
                                    onClick={() => setMaxAttempts(maxAttempts + 1)}
                                    className="w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-xl font-bold text-lg transition-colors"
                                >+</button>
                            </div>
                        </div>
                    </div>
                </div>

                 {/* Section 3: Scheduling */}
                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-xs">3</span>
                        Scheduling (Optional)
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                             <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Starts At</label>
                             <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <input 
                                    type="datetime-local" 
                                    className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium text-gray-600"
                                    value={startsAt}
                                    onChange={(e) => setStartsAt(e.target.value)}
                                />
                             </div>
                        </div>
                        <div>
                             <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Ends At</label>
                             <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <input 
                                    type="datetime-local" 
                                    className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium text-gray-600"
                                    value={endsAt}
                                    onChange={(e) => setEndsAt(e.target.value)}
                                />
                             </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* RIGHT COLUMN - Visibility & Action */}
            <div className="space-y-6">
                
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
                     <h2 className="text-base font-bold text-gray-900 mb-4">Visibility</h2>
                     
                     <div className="space-y-3">
                        {/* Public Option */}
                        <div 
                            onClick={() => setVisibility("PUBLIC")}
                            className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex items-start gap-3 ${
                                visibility === "PUBLIC" 
                                ? "border-indigo-600 bg-indigo-50/50" 
                                : "border-gray-100 hover:border-indigo-200 hover:bg-gray-50"
                            }`}
                        >
                            <div className={`mt-0.5 ${visibility === "PUBLIC" ? "text-indigo-600" : "text-gray-400"}`}>
                                <Globe className="w-6 h-6" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className={`font-bold text-sm ${visibility === "PUBLIC" ? "text-indigo-900" : "text-gray-900"}`}>Public Room</h3>
                                <p className="text-xs text-gray-500 mt-1">Listed on student dashboard. Anyone can find it.</p>
                            </div>
                        </div>

                        {/* Private Option */}
                        <div 
                            onClick={() => setVisibility("PRIVATE")}
                            className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex items-start gap-3 ${
                                visibility === "PRIVATE" 
                                ? "border-indigo-600 bg-indigo-50/50" 
                                : "border-gray-100 hover:border-indigo-200 hover:bg-gray-50"
                            }`}
                        >
                            <div className={`mt-0.5 ${visibility === "PRIVATE" ? "text-indigo-600" : "text-gray-400"}`}>
                                <Lock className="w-6 h-6" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className={`font-bold text-sm ${visibility === "PRIVATE" ? "text-indigo-900" : "text-gray-900"}`}>Private Room</h3>
                                <p className="text-xs text-gray-500 mt-1">Hidden from dashboard. Students need the PIN code.</p>
                            </div>
                        </div>
                     </div>

                     <div className="border-t border-gray-100 my-6"></div>

                     <button 
                        onClick={createRoom} 
                        disabled={loading}
                        className={`w-full bg-black text-white text-lg font-bold py-4 rounded-xl shadow-xl shadow-gray-200 hover:shadow-gray-300 transition-all active:scale-[0.98] ${
                            loading ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-800"
                        }`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                                Creating...
                            </span>
                        ) : (
                            "Launch Room"
                        )}
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-4">
                        The room code will be displayed on the next screen.
                    </p>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}