import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";
import { Toaster, toast } from "sonner"; // 1. Import Sonner
import { Trophy, ChevronLeft, Clock } from "lucide-react";

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
        // 2. Fetch Error Toast
        toast.error("Data Fetch Error", { 
            description: "Failed to load session results." 
        });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [roomId]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 pb-20">
      
      {/* 3. Toaster Component */}
      <Toaster position="top-right" richColors closeButton />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center gap-4">
            <Link 
                to="/lecturer/rooms"
                className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
            >
                <ChevronLeft size={20} />
            </Link>
            <h1 className="text-xl font-bold">Session Results</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        
        <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-200">
                <Trophy className="w-8 h-8 text-yellow-500" fill="currentColor" />
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
                                            <Clock size={16} />
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