import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAvailableRooms } from "../../services/quizRoom";

// --- Icons ---
const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const RefreshIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
);

const ChevronLeft = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);

// --- Types ---
interface Room {
  _id: string;
  roomCode: string;
  timeLimit: number;
  maxAttempts: number;
  quiz: {
    _id: string;
    title: string;
    description: string;
    difficulty: "EASY" | "MEDIUM" | "HARD"; // Enforce type
    questions: any[];
  };
}

// --- Difficulty Badge ---
const DifficultyBadge = ({ level }: { level: string }) => {
  const map: Record<string, string> = {
    EASY: "bg-green-100 text-green-700 ring-green-600/20",
    MEDIUM: "bg-yellow-100 text-yellow-700 ring-yellow-600/20",
    HARD: "bg-red-100 text-red-700 ring-red-600/20",
  };

  // Fallback and normalization
  const normalizedLevel = level?.toUpperCase() || "MEDIUM"; 
  const style = map[normalizedLevel] || map["MEDIUM"];

  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${style}`}>
      {normalizedLevel}
    </span>
  );
};

export default function StudentQuizRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadRooms = () => {
    setLoading(true);
    getAvailableRooms()
      .then(res => setRooms(res.data.data || []))
      .catch(() => alert("Failed to load quiz rooms")) // Could use toast here
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const filteredRooms = rooms.filter(r => 
    r.quiz.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <Link 
                    to="/student/dashboard"
                    className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                >
                    <ChevronLeft />
                </Link>
                <h1 className="text-xl font-bold">Quiz Rooms</h1>
            </div>
            
            <div className="relative hidden sm:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon />
                </div>
                <input 
                    type="text" 
                    placeholder="Search rooms..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none w-64 transition-all"
                />
            </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        
        {/* Intro */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
                <h2 className="text-3xl font-bold text-gray-900">Available Sessions</h2>
                <p className="text-gray-500 mt-2">Join an active quiz room to test your knowledge live.</p>
            </div>
            {/* Mobile Search */}
            <div className="relative sm:hidden w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon />
                </div>
                <input 
                    type="text" 
                    placeholder="Search rooms..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
            </div>
        </div>

        {/* Content */}
        {loading ? (
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 h-64 animate-pulse flex flex-col justify-between">
                        <div className="space-y-3">
                            <div className="h-6 bg-gray-100 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-100 rounded w-1/4"></div>
                            <div className="h-20 bg-gray-50 rounded-xl mt-4"></div>
                        </div>
                        <div className="h-10 bg-gray-100 rounded-xl"></div>
                    </div>
                ))}
             </div>
        ) : filteredRooms.length === 0 ? (
            <div className="text-center py-24 bg-white border border-dashed border-gray-300 rounded-3xl">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-3xl mb-4">
                    📭
                </div>
                <h3 className="text-lg font-semibold text-gray-900">No active rooms found</h3>
                <p className="text-gray-500 mt-2 mb-6 max-w-sm mx-auto">
                    {search ? `No matches for "${search}". Try a different term.` : "There are no quizzes available at the moment. Check back later!"}
                </p>
                <button 
                    onClick={loadRooms} 
                    className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:bg-indigo-50 px-4 py-2 rounded-lg transition-colors"
                >
                    <RefreshIcon /> Refresh List
                </button>
            </div>
        ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
                <div
                key={room._id}
                className="group bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between"
                >
                    {/* Card Body */}
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <DifficultyBadge level={room.quiz.difficulty} />
                            {/* Optional: Add active status indicator */}
                            <span className="flex h-2.5 w-2.5 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                            </span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-indigo-600 transition-colors">
                            {room.quiz.title}
                        </h3>

                        <p className="text-sm text-gray-500 line-clamp-3 mb-6 leading-relaxed">
                            {room.quiz.description || "No description provided for this quiz."}
                        </p>
                    </div>

                    {/* Card Footer */}
                    <div>
                        <div className="flex items-center justify-between text-xs font-medium text-gray-500 mb-6 bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center gap-1.5" title="Time Limit">
                                <ClockIcon />
                                <span>{room.timeLimit}m</span>
                            </div>
                            <div className="w-px h-4 bg-gray-300"></div>
                            <div className="flex items-center gap-1.5" title="Total Questions">
                                <DocumentIcon />
                                <span>{room.quiz.questions?.length || "?"} Qs</span>
                            </div>
                            <div className="w-px h-4 bg-gray-300"></div>
                            <div className="flex items-center gap-1.5" title="Max Attempts">
                                <RefreshIcon />
                                <span>{room.maxAttempts}x</span>
                            </div>
                        </div>

                        <Link
                            to={`/student/rooms/${room._id}`}
                            className="block w-full text-center bg-black text-white py-3 rounded-xl font-bold shadow-lg hover:bg-gray-800 hover:-translate-y-0.5 transition-all active:scale-[0.98]"
                        >
                            Start Quiz
                        </Link>
                    </div>
                </div>
            ))}
            </div>
        )}
      </div>
    </div>
  );
}