import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAvailableRooms, joinRoom } from "../../services/quizRoom"; 
import { Toaster, toast } from "sonner"; // 1. Import Sonner
import { 
  Clock, 
  FileText, 
  RotateCcw, 
  Search, 
  ChevronLeft, 
  Key 
} from "lucide-react";

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
    difficulty: "EASY" | "MEDIUM" | "HARD";
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
  const normalizedLevel = level?.toUpperCase() || "MEDIUM"; 
  const style = map[normalizedLevel] || map["MEDIUM"];

  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${style}`}>
      {normalizedLevel}
    </span>
  );
};

export default function StudentQuizRooms() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  // State for Join by Code
  const [roomCode, setRoomCode] = useState("");
  const [joining, setJoining] = useState(false);

  const loadRooms = () => {
    setLoading(true);
    getAvailableRooms()
      .then(res => setRooms(res.data.data || []))
      .catch(() => {
          // 2. Load Error Toast
          toast.error("Network Error", { description: "Could not load public rooms." });
      }) 
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const handleJoinByCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomCode.trim()) {
        toast.error("Input Required", { description: "Please enter a valid room code." });
        return;
    }

    setJoining(true);

    // 3. Join Room Promise Toast
    const joinPromise = joinRoom({ roomCode });

    toast.promise(joinPromise, {
        loading: 'Verifying room code...',
        success: (res) => {
            const roomId = res.data.data.roomId;
            // Delay navigation slightly to show success message
            setTimeout(() => navigate(`/student/rooms/${roomId}`), 500);
            return "Room found! Joining session...";
        },
        error: (err) => {
            setJoining(false);
            return err.response?.data?.message || "Invalid room code or room is closed";
        }
    });
  };

  const filteredRooms = rooms.filter(r => 
    r.quiz.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 pb-20">
      
      {/* 4. Toaster Component */}
      <Toaster position="top-center" richColors />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <Link 
                    to="/student/dashboard"
                    className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                >
                    <ChevronLeft size={20} />
                </Link>
                <h1 className="text-xl font-bold">Quiz Portal</h1>
            </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">
        
        {/* SECTION 1: JOIN PRIVATE ROOM */}
        <div className="bg-indigo-600 rounded-2xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
             {/* Decorative background circles */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-indigo-500 opacity-50 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-indigo-700 opacity-50 blur-3xl"></div>

            <div className="relative z-10 max-w-2xl">
                <h2 className="text-3xl font-bold mb-3">Have a Room Code?</h2>
                <p className="text-indigo-100 mb-8 text-lg">Enter the 6-character code provided by your lecturer to join a private quiz session.</p>
                
                <form onSubmit={handleJoinByCode} className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <Key size={20} />
                        </div>
                        <input 
                            type="text" 
                            value={roomCode}
                            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                            placeholder="Ex: X7K9P2"
                            maxLength={6}
                            disabled={joining}
                            className="w-full sm:w-64 pl-10 pr-4 py-3 bg-white text-gray-900 rounded-xl font-mono text-lg uppercase focus:ring-4 focus:ring-indigo-400 focus:outline-none placeholder:normal-case disabled:opacity-70 disabled:cursor-not-allowed"
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={joining || !roomCode}
                        className="bg-black hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                        {joining ? "Joining..." : "Join Room"}
                    </button>
                </form>
            </div>
        </div>


        {/* SECTION 2: PUBLIC ROOMS */}
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200 pb-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Public Practice Rooms</h2>
                    <p className="text-gray-500 mt-1">Browse available quizzes open to everyone.</p>
                </div>
                
                {/* Search Bar */}
                <div className="relative w-full sm:w-auto">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="w-5 h-5 text-gray-400" />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search quizzes..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full sm:w-64 pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    />
                </div>
            </div>

            {/* Content Grid */}
            {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 h-64 animate-pulse">
                            <div className="h-6 bg-gray-100 rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-gray-100 rounded w-1/4 mb-10"></div>
                            <div className="h-10 bg-gray-100 rounded-xl"></div>
                        </div>
                    ))}
                </div>
            ) : filteredRooms.length === 0 ? (
                <div className="text-center py-16 bg-white border border-dashed border-gray-300 rounded-3xl">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-3xl mb-4">
                        📭
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">No public rooms found</h3>
                    <button 
                        onClick={loadRooms} 
                        className="mt-4 inline-flex items-center gap-2 text-indigo-600 font-bold hover:bg-indigo-50 px-4 py-2 rounded-lg transition-colors"
                    >
                        <RotateCcw size={16} /> Refresh
                    </button>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRooms.map((room) => (
                    <div
                    key={room._id}
                    className="group bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <DifficultyBadge level={room.quiz.difficulty} />
                                <span className="flex h-2.5 w-2.5 relative" title="Live">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-indigo-600 transition-colors">
                                {room.quiz.title}
                            </h3>

                            <p className="text-sm text-gray-500 line-clamp-2 mb-6 leading-relaxed">
                                {room.quiz.description || "No description provided."}
                            </p>
                        </div>

                        <div>
                            <div className="flex items-center justify-between text-xs font-medium text-gray-500 mb-6 bg-gray-50 rounded-lg p-3">
                                <div className="flex items-center gap-1.5">
                                    <Clock size={16} /> <span>{room.timeLimit}m</span>
                                </div>
                                <div className="w-px h-4 bg-gray-300"></div>
                                <div className="flex items-center gap-1.5">
                                    <FileText size={16} /> <span>{room.quiz.questions?.length || "?"} Qs</span>
                                </div>
                                <div className="w-px h-4 bg-gray-300"></div>
                                <div className="flex items-center gap-1.5">
                                    <RotateCcw size={16} /> <span>{room.maxAttempts}x</span>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate(`/student/rooms/${room._id}`)}
                                className="block w-full text-center bg-black text-white py-3 rounded-xl font-bold shadow-lg hover:bg-gray-800 hover:-translate-y-0.5 transition-all active:scale-[0.98]"
                            >
                                Start Quiz
                            </button>
                        </div>
                    </div>
                ))}
                </div>
            )}
        </div>
      </div>
    </div>
  );
}