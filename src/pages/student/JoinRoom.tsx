import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import { 
  Ticket, 
  ChevronLeft, 
  ArrowRight, 
  AlertCircle, 
  Loader2 
} from "lucide-react";

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
                <ChevronLeft size={20} /> Back to Dashboard
            </Link>
        </div>

        {/* Card */}
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 text-center">
            
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Ticket className="w-8 h-8 text-indigo-600" strokeWidth={1.5} />
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
                        <AlertCircle size={16} />
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
                            <Loader2 className="animate-spin h-5 w-5 text-white" />
                            Connecting...
                        </span>
                    ) : (
                        <>
                            Join Room <ArrowRight size={20} />
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