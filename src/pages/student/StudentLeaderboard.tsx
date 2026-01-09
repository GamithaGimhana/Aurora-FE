import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api"; 
import { Toaster, toast } from "sonner"; // 1. Import Sonner
import { Trophy, ChevronLeft } from "lucide-react";

// --- Helper for Rank Styling ---
const getRankStyles = (rank: number) => {
  switch (rank) {
      case 1: return { badge: "bg-yellow-100 text-yellow-700 ring-yellow-400", row: "bg-yellow-50/30" }; // Gold
      case 2: return { badge: "bg-slate-200 text-slate-700 ring-slate-400", row: "bg-slate-50/30" }; // Silver
      case 3: return { badge: "bg-orange-100 text-orange-800 ring-orange-400", row: "bg-orange-50/30" }; // Bronze
      default: return { badge: "bg-white text-gray-500 border border-gray-200", row: "bg-white" };
  }
};

export default function StudentLeaderboard() {
  const { roomId } = useParams<{ roomId: string }>();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const currentUserId = currentUser._id || currentUser.id;

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/attempts/room/${roomId}`);
        setData(res.data.data);
      } catch (err) {
        // 2. Error Handling Toast
        toast.error("Data Unavailable", { 
            description: "Could not load the leaderboard rankings." 
        });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [roomId]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      
      {/* 3. Toaster Component */}
      <Toaster position="top-center" richColors />

      {/* Header / Nav */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center gap-4">
          <Link 
            to={`/student/rooms/${roomId}`} // Go back to the Quiz Entry page
            className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors font-medium text-sm"
          >
            <ChevronLeft size={20} /> Back to Quiz
          </Link>
          <div className="h-4 w-px bg-gray-300 mx-2"></div>
          <h1 className="text-lg font-bold text-gray-800">Leaderboard</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        
        {/* Banner */}
        <div className="bg-indigo-600 rounded-3xl p-6 sm:p-10 text-white mb-8 relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <div className="relative z-10 flex items-center gap-4">
                <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/10">
                    <Trophy className="w-8 h-8 text-yellow-500" fill="currentColor" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Top Performers</h2>
                    <p className="text-indigo-100 opacity-90">See how you rank against your classmates.</p>
                </div>
            </div>
        </div>

        {/* List Container */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            
            {loading ? (
                 <div className="p-8 space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex gap-4 items-center">
                            <div className="h-10 w-10 bg-gray-100 rounded-full animate-pulse"></div>
                            <div className="h-4 bg-gray-100 rounded w-full animate-pulse"></div>
                        </div>
                    ))}
                </div>
            ) : data.length === 0 ? (
                <div className="text-center py-16">
                    <div className="text-4xl mb-3">📉</div>
                    <p className="text-gray-500 font-medium">No scores available yet.</p>
                    <p className="text-xs text-gray-400 mt-1">Be the first to finish the quiz!</p>
                </div>
            ) : (
                <div className="divide-y divide-gray-100">
                      {/* Column Headers */}
                      <div className="hidden sm:grid grid-cols-12 px-6 py-3 bg-gray-50/50 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        <div className="col-span-2 text-center">Rank</div>
                        <div className="col-span-6">Student</div>
                        <div className="col-span-4 text-right">Score</div>
                      </div>

                    {data.map((row) => {
                        const styles = getRankStyles(row.rank);
                        const isMe = row.student?._id === currentUserId; // Highlight user
                        const name = isMe ? "You" : (row.student?.name || "Anonymous");
                        const initials = (row.student?.name || "AN").slice(0, 2).toUpperCase();

                        return (
                            <div 
                                key={row._id} 
                                className={`
                                    relative grid grid-cols-12 items-center px-4 sm:px-6 py-4 transition-colors
                                    ${styles.row} 
                                    ${isMe ? "bg-indigo-50 ring-1 ring-inset ring-indigo-200" : "hover:bg-gray-50"}
                                `}
                            >
                                {/* Rank */}
                                <div className="col-span-2 flex justify-center">
                                    <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold shadow-sm ${styles.badge}`}>
                                        {row.rank}
                                    </div>
                                </div>

                                {/* Student Details */}
                                <div className="col-span-6 flex items-center gap-3 pl-2">
                                    <div className={`
                                        w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0
                                        ${isMe ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-500"}
                                    `}>
                                        {isMe ? "ME" : initials}
                                    </div>
                                    <div className="min-w-0">
                                        <p className={`font-semibold truncate ${isMe ? "text-indigo-900" : "text-gray-900"}`}>
                                            {name}
                                        </p>
                                        {!isMe && (
                                            <p className="text-[10px] text-gray-400 truncate">
                                                Student
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Score */}
                                <div className="col-span-4 text-right">
                                    <span className={`text-lg font-bold ${isMe ? "text-indigo-600" : "text-gray-800"}`}>
                                        {row.score}
                                    </span>
                                    <span className="text-xs text-gray-400 block -mt-1">points</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
      </div>
    </div>
  );
}