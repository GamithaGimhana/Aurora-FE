import { useEffect, useState } from "react";
import api from "../../services/api";
import { useParams, Link } from "react-router-dom";

// --- Icons ---
const TrophyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-yellow-500">
    <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.612-3.125 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z" clipRule="evenodd" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

interface Attempt {
  _id: string;
  student: {
    name: string;
  };
  score: number;
  submittedAt: string;
}

// --- Helper for Rank Styling ---
const getRankStyles = (index: number) => {
    switch (index) {
        case 0: return { badge: "bg-yellow-100 text-yellow-700 ring-yellow-400", row: "bg-yellow-50/50" }; // Gold
        case 1: return { badge: "bg-slate-200 text-slate-700 ring-slate-400", row: "bg-slate-50/50" }; // Silver
        case 2: return { badge: "bg-orange-100 text-orange-800 ring-orange-400", row: "bg-orange-50/50" }; // Bronze
        default: return { badge: "bg-white text-gray-500 border border-gray-200", row: "bg-white" };
    }
};

export default function QuizResult() {
  const { roomId } = useParams();
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await api.get(`/attempts/room/${roomId}`);
        // Sort by score descending just to be safe
        const sorted = (res.data || []).sort((a: Attempt, b: Attempt) => b.score - a.score);
        setAttempts(sorted);
      } catch (err) {
        console.error("Failed to load leaderboard");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [roomId]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 py-12 px-6">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <Link to="/lecturer/dashboard" className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors font-medium text-sm mb-6">
            <ChevronLeft /> Back to Dashboard
        </Link>
        
        <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-200">
                <TrophyIcon />
            </div>
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Quiz Leaderboard</h1>
                <p className="text-gray-500">Live results from the session.</p>
            </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        
        {loading ? (
            <div className="p-8 space-y-4">
                {[1,2,3,4].map(i => (
                    <div key={i} className="h-16 bg-slate-50 rounded-xl animate-pulse"></div>
                ))}
            </div>
        ) : attempts.length === 0 ? (
            <div className="text-center py-20">
                <p className="text-gray-400">No attempts recorded yet.</p>
            </div>
        ) : (
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/80 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-400 font-semibold">
                            <th className="px-8 py-5">Rank</th>
                            <th className="px-6 py-5">Student</th>
                            <th className="px-6 py-5">Score</th>
                            <th className="px-6 py-5 text-right">Submitted</th>
                        </tr>
                    </thead>
                    <tbody>
                    {attempts.map((attempt, index) => {
                        const styles = getRankStyles(index);
                        const initials = attempt.student.name.slice(0, 2).toUpperCase();

                        return (
                        <tr key={attempt._id} className={`border-b border-gray-50 hover:bg-indigo-50/30 transition-colors ${styles.row}`}>
                            <td className="px-8 py-5">
                                <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ring-2 ring-offset-2 ${styles.badge}`}>
                                    {index + 1}
                                </div>
                            </td>
                            <td className="px-6 py-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                                        {initials}
                                    </div>
                                    <span className="font-semibold text-gray-900">{attempt.student.name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-5">
                                <span className="font-bold text-gray-900">{attempt.score}</span>
                                <span className="text-xs text-gray-400 ml-1">pts</span>
                            </td>
                            <td className="px-6 py-5 text-right">
                                <div className="inline-flex items-center gap-1.5 text-sm text-gray-500 bg-white border border-gray-100 px-3 py-1 rounded-full">
                                    <ClockIcon />
                                    {new Date(attempt.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
  );
};