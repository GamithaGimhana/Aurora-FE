import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner"; // 1. Import Sonner
import { 
  Plus, 
  Clock, 
  Users, 
  Clipboard, 
  BarChart2, 
  Trash2, 
  Lock, 
  Unlock 
} from "lucide-react";

export default function LecturerRooms() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/rooms/me");
        setRooms(res.data.data || res.data);
      } catch {
        // 2. Initial Load Error
        toast.error("Network Error", { description: "Could not fetch your active rooms." });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    // 3. Success Toast for Copy
    toast.success("Code Copied!", { 
        description: `${code} is now in your clipboard.` 
    });
  };

  // --- TOGGLE LOCK HANDLER ---
  const toggleRoom = async (roomId: string, currentStatus: boolean) => {
      // 4. Toggle Promise Toast
      const togglePromise = api.patch(`/rooms/${roomId}/toggle`, { active: !currentStatus });

      toast.promise(togglePromise, {
          loading: currentStatus ? "Locking room..." : "Unlocking room...",
          success: () => {
              // Only update state if API succeeds
               setRooms((prev) =>
                prev.map((r) => (r._id === roomId ? { ...r, active: !currentStatus } : r))
              );
              return `Room ${currentStatus ? "locked" : "unlocked"} successfully`;
          },
          error: "Failed to update room status",
      });
  };

  const handleDelete = (roomId: string) => {
    // 5. Custom Delete Confirmation Toast
    toast("Delete this room permanently?", {
        description: "Student data associated with this session will be lost.",
        action: {
            label: "Delete",
            onClick: async () => {
                const deletePromise = api.delete(`/rooms/${roomId}`);
                
                toast.promise(deletePromise, {
                    loading: "Deleting room...",
                    success: () => {
                        setRooms((prev) => prev.filter((r) => r._id !== roomId));
                        return "Room deleted successfully";
                    },
                    error: (err) => err.response?.data?.message || "Failed to delete room"
                });
            }
        },
        cancel: {
            label: "Cancel",
            onClick: () => {}
        }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 pb-20">
      
      {/* 6. Toaster Component */}
      <Toaster position="top-right" richColors closeButton />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">My Quiz Rooms</h1>
            
            <Link
                to="/lecturer/rooms/create"
                className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition"
            >
                <Plus size={18} strokeWidth={3} /> Create Room
            </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        
        {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-48 bg-white rounded-2xl border border-gray-200 animate-pulse"></div>
                ))}
            </div>
        ) : rooms.length === 0 ? (
            <div className="text-center py-20 bg-white border border-dashed border-gray-300 rounded-2xl">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-3xl mb-4">
                    📡
                </div>
                <h3 className="text-lg font-semibold text-gray-900">No rooms active</h3>
                <p className="text-gray-500 mt-2 mb-6">Create a live room to host quizzes for students.</p>
                <Link to="/lecturer/rooms/create" className="text-indigo-600 font-bold hover:underline">
                    Launch a new room
                </Link>
            </div>
        ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map((r) => (
                    <div key={r._id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow flex flex-col justify-between">
                        
                        {/* Top Section */}
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                {/* Dynamic Status Badge */}
                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ring-1 ring-inset ${
                                    r.active 
                                    ? "bg-green-50 text-green-700 ring-green-600/20" 
                                    : "bg-red-50 text-red-700 ring-red-600/20"
                                }`}>
                                    {r.active ? "ACTIVE" : "LOCKED"}
                                </span>
                                
                                <div className="flex items-center gap-3">
                                  <Link 
                                      to={`/lecturer/rooms/${r._id}/leaderboard`} 
                                      className="text-gray-400 hover:text-indigo-600 transition-colors"
                                      title="View Leaderboard"
                                  >
                                      <BarChart2 size={20} />
                                  </Link>
                                  
                                  <button
                                    onClick={() => handleDelete(r._id)}
                                    className="text-gray-400 hover:text-red-600 transition-colors"
                                    title="Delete Room"
                                  >
                                    <Trash2 size={20} />
                                  </button>
                                </div>
                            </div>

                            <div className="text-center py-4">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Room Code</p>
                                <div 
                                    onClick={() => copyCode(r.roomCode)}
                                    className="group cursor-pointer inline-flex items-center gap-2 text-4xl font-mono font-bold text-indigo-600 tracking-wider hover:text-indigo-700 transition-colors"
                                >
                                    {r.roomCode}
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400">
                                        <Clipboard size={20} />
                                    </span>
                                </div>
                                
                                {/* TOGGLE BUTTON */}
                                <div className="mt-4 flex justify-center">
                                    <button
                                        onClick={() => toggleRoom(r._id, r.active)}
                                        className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                                            r.active 
                                            ? "border-red-200 text-red-600 hover:bg-red-50" 
                                            : "border-green-200 text-green-600 hover:bg-green-50"
                                        }`}
                                    >
                                        {r.active ? <Lock size={14} /> : <Unlock size={14} />}
                                        {r.active ? "Lock Room" : "Unlock Room"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Stats */}
                        <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-1.5">
                                <Clock size={16} />
                                <span>{r.timeLimit} mins</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Users size={16} />
                                <span>{r.maxAttempts} attempt{r.maxAttempts > 1 ? 's' : ''}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
}