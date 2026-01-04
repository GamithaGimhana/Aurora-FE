import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

// --- Icons ---
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const UserGroupIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
  </svg>
);

const ClipboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
  </svg>
);

const ChartBarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

// --- New Lock Icons ---
const LockClosedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

const LockOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

export default function LecturerRooms() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/rooms/me");
        setRooms(res.data.data || res.data);
      } catch {
        alert("Failed to load rooms");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Room code ${code} copied!`);
  };

  // --- TOGGLE LOCK HANDLER ---
  const toggleRoom = async (roomId: string, currentStatus: boolean) => {
    try {
      // Optimistically update UI
      setRooms((prev) =>
        prev.map((r) => (r._id === roomId ? { ...r, active: !currentStatus } : r))
      );

      // Call API (Assuming standard PUT/PATCH request to update status)
      // If your backend endpoint is different (e.g., /toggle), update this line
      await api.patch(`/rooms/${roomId}/toggle`, { active: !currentStatus });
      
    } catch (err: any) {
      console.error(err);
      // Revert change on error
      setRooms((prev) =>
        prev.map((r) => (r._id === roomId ? { ...r, active: currentStatus } : r))
      );
      alert("Failed to update room status");
    }
  };

  const handleDelete = async (roomId: string) => {
    if (!window.confirm("Are you sure you want to delete this room? This action cannot be undone.")) {
      return;
    }

    try {
      await api.delete(`/rooms/${roomId}`);
      setRooms((prev) => prev.filter((r) => r._id !== roomId));
    } catch (err: any) {
      console.error(err);
      const errorMessage = err.response?.data?.message || "Failed to delete room";
      alert(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">My Quiz Rooms</h1>
            
            <Link
                to="/lecturer/rooms/create"
                className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition"
            >
                <PlusIcon /> Create Room
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
                                      <ChartBarIcon />
                                  </Link>
                                  
                                  <button
                                    onClick={() => handleDelete(r._id)}
                                    className="text-gray-400 hover:text-red-600 transition-colors"
                                    title="Delete Room"
                                  >
                                    <TrashIcon />
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
                                        <ClipboardIcon />
                                    </span>
                                </div>
                                
                                {/* TOGGLE BUTTON ADDED HERE */}
                                <div className="mt-4 flex justify-center">
                                    <button
                                        onClick={() => toggleRoom(r._id, r.active)}
                                        className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                                            r.active 
                                            ? "border-red-200 text-red-600 hover:bg-red-50" 
                                            : "border-green-200 text-green-600 hover:bg-green-50"
                                        }`}
                                    >
                                        {r.active ? <LockClosedIcon /> : <LockOpenIcon />}
                                        {r.active ? "Lock Room" : "Unlock Room"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Stats */}
                        <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-1.5">
                                <ClockIcon />
                                <span>{r.timeLimit} mins</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <UserGroupIcon />
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