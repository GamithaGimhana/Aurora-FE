import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api"; 
// import { useAuth } from "../../hooks/useAuth"; 

// --- Icons ---
const TrophyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-yellow-500">
    <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.612-3.125 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z" clipRule="evenodd" />
  </svg>
);

const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

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
        // const res = await api.get(`/attempts/room/${roomId}`);
        const res = await api.get(`/attempts/room/${roomId}`);
        setData(res.data.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [roomId]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      
      {/* Header / Nav */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center gap-4">
          <Link 
            to={`/student/rooms/${roomId}`} // Go back to the Quiz Entry page
            className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors font-medium text-sm"
          >
            <ChevronLeft /> Back to Quiz
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
                    <TrophyIcon />
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
                                                {/* Mask email for privacy */}
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