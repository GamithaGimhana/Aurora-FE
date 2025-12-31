import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate, Link } from "react-router-dom";

// --- Icons ---
const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const PresentationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
  </svg>
);

const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const HashtagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
  </svg>
);

export default function CreateQuizRoom() {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [quizId, setQuizId] = useState("");
  const [timeLimit, setTimeLimit] = useState<number>(10);
  const [maxAttempts, setMaxAttempts] = useState<number>(1);
  
  const [loading, setLoading] = useState(false); // For form submission
  const [fetching, setFetching] = useState(true); // For initial data load
  
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/quizzes/me");
        setQuizzes(res.data.data || res.data);
      } catch (err) {
        alert("Failed to load quizzes");
      } finally {
        setFetching(false);
      }
    })();
  }, []);

  const createRoom = async () => {
    if (!quizId) return alert("Select a quiz");
    
    setLoading(true);
    try {
      const res = await api.post("/rooms/create", {
        quiz: quizId,
        timeLimit,
        maxAttempts,
      });
      // expecting { data: { room } } or res.data.room
      const room = res.data.data || res.data;
      // Optional: Replace alert with a toast or just navigation
      // alert(`Room created — code: ${room.roomCode || room.code || room.roomCode}`);
      navigate(`/lecturer/rooms`);
    } catch (err) {
      console.error(err);
      alert("Failed to create room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center gap-4">
            <Link 
                to="/lecturer/dashboard"
                className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
            >
                <ChevronLeft />
            </Link>
            <h1 className="text-xl font-bold">Launch Quiz Room</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        
        {/* Intro Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white mb-8 shadow-lg flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-bold mb-2">Live Session</h2>
                <p className="text-indigo-100 max-w-md">
                    Create a real-time room where students can join using a unique 6-digit code. Perfect for classroom activities.
                </p>
            </div>
            <div className="hidden sm:flex h-16 w-16 bg-white/20 rounded-2xl items-center justify-center backdrop-blur-sm">
                <PresentationIcon />
            </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-8">
            
            {/* Quiz Select */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Select Quiz Content</label>
                {fetching ? (
                    <div className="h-12 bg-gray-50 rounded-xl animate-pulse"></div>
                ) : (
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <DocumentIcon />
                        </div>
                        <select 
                            className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none appearance-none cursor-pointer transition-all"
                            value={quizId} 
                            onChange={(e) => setQuizId(e.target.value)}
                        >
                            <option value="">Choose a quiz...</option>
                            {quizzes.map((q) => <option key={q._id} value={q._id}>{q.title}</option>)}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                )}
                <p className="text-xs text-gray-400 mt-2">Only quizzes you created are listed here.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Time Limit */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Time Limit</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <ClockIcon />
                        </div>
                        <input 
                            type="number" 
                            className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                            value={timeLimit} 
                            onChange={(e) => setTimeLimit(Number(e.target.value))} 
                            placeholder="10" 
                            min={1}
                        />
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Duration in minutes.</p>
                </div>

                {/* Max Attempts */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Max Attempts</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <HashtagIcon />
                        </div>
                        <input 
                            type="number" 
                            className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                            value={maxAttempts} 
                            onChange={(e) => setMaxAttempts(Number(e.target.value))} 
                            placeholder="1" 
                            min={1}
                        />
                    </div>
                    <p className="text-xs text-gray-400 mt-2">How many times a student can join.</p>
                </div>
            </div>

            {/* Action */}
            <div className="pt-4">
                <button 
                    onClick={createRoom} 
                    disabled={loading}
                    className={`w-full bg-black text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-gray-200 transition-all ${
                        loading ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-800 hover:-translate-y-1"
                    }`}
                >
                    {loading ? "Generating Room..." : "Create Room"}
                </button>
            </div>

        </div>
      </div>
    </div>
  );
}