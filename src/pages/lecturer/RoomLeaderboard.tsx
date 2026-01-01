import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";

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

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// --- Helper for Rank Styling ---
const getRankStyles = (rank: number) => {
  switch (rank) {
      case 1: return { badge: "bg-yellow-100 text-yellow-700 ring-yellow-400", row: "bg-yellow-50/50" }; // Gold
      case 2: return { badge: "bg-slate-200 text-slate-700 ring-slate-400", row: "bg-slate-50/50" }; // Silver
      case 3: return { badge: "bg-orange-100 text-orange-800 ring-orange-400", row: "bg-orange-50/50" }; // Bronze
      default: return { badge: "bg-white text-gray-500 border border-gray-200", row: "bg-white" };
  }
};

export default function RoomLeaderboard() {
  const { roomId } = useParams<{ roomId: string }>();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/attempts/room/${roomId}`);
        
        // Ensure data is sorted by score (descending)
        const sorted = (res.data.data || []).sort((a: any, b: any) => b.score - a.score);
        
        // Add rank manually if backend doesn't provide it
        const ranked = sorted.map((item: any, idx: number) => ({ ...item, rank: idx + 1 }));
        
        setData(ranked);
      } catch {
        alert("Failed to load leaderboard");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [roomId]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center gap-4">
            <Link 
                to="/lecturer/rooms"
                className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
            >
                <ChevronLeft />
            </Link>
            <h1 className="text-xl font-bold">Session Results</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        
        <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-200">
                <TrophyIcon />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Leaderboard</h2>
                <p className="text-gray-500">Real-time rankings for this room.</p>
            </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            
            {loading ? (
                 <div className="p-8 space-y-4">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="h-16 bg-slate-50 rounded-xl animate-pulse"></div>
                    ))}
                </div>
            ) : data.length === 0 ? (
                <div className="text-center py-20">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-3xl mb-4">
                        📊
                    </div>
                    <p className="text-gray-500">No attempts recorded yet.</p>
                    <p className="text-sm text-gray-400">Wait for students to submit their quizzes.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/80 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-400 font-semibold">
                                <th className="px-8 py-5">Rank</th>
                                <th className="px-6 py-5">Student</th>
                                <th className="px-6 py-5">Score</th>
                                <th className="px-6 py-5">Attempt #</th>
                                <th className="px-6 py-5 text-right">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                        {data.map((row) => {
                            const styles = getRankStyles(row.rank);
                            const name = row.student?.name || "Unknown";
                            const initials = name.slice(0, 2).toUpperCase();

                            return (
                                <tr key={row._id || row.rank} className={`border-b border-gray-50 hover:bg-indigo-50/30 transition-colors ${styles.row}`}>
                                    <td className="px-8 py-5">
                                        <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ring-2 ring-offset-2 ${styles.badge}`}>
                                            {row.rank}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0">
                                                {initials}
                                            </div>
                                            <div>
                                                <span className="font-semibold text-gray-900 block">{name}</span>
                                                <span className="text-xs text-gray-400">{row.student?.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="font-bold text-gray-900 text-lg">{row.score}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                            Attempt {row.attemptNumber}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                                            <ClockIcon />
                                            {new Date(row.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}