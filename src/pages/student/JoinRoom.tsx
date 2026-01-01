import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

// --- Icons ---
const TicketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-600">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
  </svg>
);

const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
  </svg>
);

export default function JoinRoom() {
  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const joinRoom = async () => {
    setError("");

    if (!roomCode.trim()) {
      setError("Please enter a valid room code.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/rooms/join", {
        roomCode: roomCode.trim().toUpperCase(),
      });

      const roomId = res.data.data.roomId;
      navigate(`/student/rooms/${roomId}`);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Invalid room code or room is closed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Navigation */}
        <div className="mb-8">
            <Link 
                to="/student/dashboard"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors font-medium text-sm"
            >
                <ChevronLeft /> Back to Dashboard
            </Link>
        </div>

        {/* Card */}
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 text-center">
            
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <TicketIcon />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Enter Room PIN</h1>
            <p className="text-gray-500 mb-8">
                Enter the 6-character code provided by your lecturer to join the live session.
            </p>

            <div className="space-y-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="000000"
                        value={roomCode}
                        onChange={(e) => {
                            setRoomCode(e.target.value.toUpperCase());
                            setError("");
                        }}
                        maxLength={6}
                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-4xl font-bold text-center tracking-[0.25em] py-5 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder-gray-300 uppercase font-mono"
                    />
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 text-sm font-medium py-3 px-4 rounded-xl border border-red-100 flex items-center justify-center gap-2 animate-pulse">
                        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {error}
                    </div>
                )}

                <button
                    onClick={joinRoom}
                    disabled={loading || roomCode.length < 4}
                    className={`w-full flex items-center justify-center gap-2 bg-black text-white text-lg font-bold py-4 rounded-xl shadow-lg hover:bg-gray-800 transition-all transform active:scale-[0.98] ${
                        (loading || roomCode.length < 4) ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                             <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Connecting...
                        </span>
                    ) : (
                        <>
                            Join Room <ArrowRight />
                        </>
                    )}
                </button>
            </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
            Connection secure. Ready for quiz.
        </p>

      </div>
    </div>
  );
}