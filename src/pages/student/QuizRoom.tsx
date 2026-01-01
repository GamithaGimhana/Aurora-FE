import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

// --- Icons ---
const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-indigo-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
  </svg>
);

const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-purple-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-orange-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

export default function QuizRoom() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!roomId) return;
    const load = async () => {
      try {
        const res = await api.get(`/rooms/${roomId}`);
        setRoom(res.data.data || res.data);
      } catch (err) {
        setError("Failed to load room details.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [roomId]);

  const startQuiz = async () => {
    setStarting(true);
    setError("");
    try {
      const res = await api.post(`/rooms/${roomId}/start`);
      const payload = res.data;
      const attemptId = payload.attempt._id || payload.attempt.id;
      navigate(`/student/attempt/${attemptId}`);
    } catch (err: any) {
      console.error(err.response?.data || err);
      setError(err.response?.data?.message || "Failed to start quiz. You may have used all attempts.");
      setStarting(false);
    }
  };

  if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="bg-white p-8 rounded-3xl shadow-sm w-full max-w-lg space-y-4 animate-pulse">
                <div className="h-8 bg-gray-100 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-100 rounded w-1/2 mx-auto"></div>
                <div className="h-20 bg-gray-50 rounded-xl mt-8"></div>
            </div>
        </div>
      );
  }

  if (!room) return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center">
              <h2 className="text-xl font-bold">Room not found</h2>
              <Link to="/student/dashboard" className="text-indigo-600 hover:underline">Go back home</Link>
          </div>
      </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 relative overflow-hidden">
      
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>

      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-lg text-center relative z-10 border border-gray-100">
        
        {/* Navigation */}
        <div className="absolute top-6 left-6">
            <Link to="/student/dashboard" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 block">
                <ChevronLeft />
            </Link>
        </div>

        {/* Header */}
        <div className="mb-6 mt-2">
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wide mb-3">
                Quiz Session
            </span>
            <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">{room.quiz?.title}</h1>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
                {room.quiz?.description || "No description provided."}
            </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="bg-gray-50 rounded-2xl p-4 flex flex-col items-center justify-center border border-gray-100">
                <ClockIcon />
                <span className="text-lg font-bold text-gray-900 mt-1">{room.timeLimit}</span>
                <span className="text-[10px] uppercase font-bold text-gray-400">Mins</span>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 flex flex-col items-center justify-center border border-gray-100">
                <DocumentIcon />
                <span className="text-lg font-bold text-gray-900 mt-1">{room.quiz?.questions?.length || "?"}</span>
                <span className="text-[10px] uppercase font-bold text-gray-400">Questions</span>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 flex flex-col items-center justify-center border border-gray-100">
                <ShieldIcon />
                <span className="text-lg font-bold text-gray-900 mt-1">{room.maxAttempts}</span>
                <span className="text-[10px] uppercase font-bold text-gray-400">Attempts</span>
            </div>
        </div>

        {/* Error Message */}
        {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                {error}
            </div>
        )}

        {/* Action */}
        <button
          onClick={startQuiz}
          disabled={starting}
          className={`w-full flex items-center justify-center gap-2 bg-black text-white text-lg font-bold py-4 rounded-xl shadow-lg hover:bg-gray-800 transition-all transform active:scale-[0.98] ${
              starting ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {starting ? (
               <span className="flex items-center gap-2">
                 <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Starting...
            </span>
          ) : (
            <>
                <PlayIcon /> Start Quiz
            </>
          )}
        </button>

        <p className="text-xs text-gray-400 mt-4">
            ⚠️ Timer starts immediately after clicking Start.
        </p>
      </div>
    </div>
  );
}