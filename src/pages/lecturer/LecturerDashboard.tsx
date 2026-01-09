import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { 
  FileText, 
  Layers, 
  CheckCircle, 
  Presentation 
} from "lucide-react";

/* ---------- UI Blocks ---------- */

function StatCard({
  title,
  value,
  icon: Icon,
  color,
  loading,
}: {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
  loading: boolean;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center justify-between hover:shadow-md transition-shadow">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">
          {loading ? "..." : value}
        </p>
      </div>
      <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
        {/* Lucide icons accept className for size and color */}
        <Icon className={`w-8 h-8 ${color.replace("bg-", "text-")}`} />
      </div>
    </div>
  );
}

function ActionCard({
  title,
  description,
  to,
  icon: Icon,
  special = false,
}: {
  title: string;
  description: string;
  to: string;
  icon: React.ElementType;
  special?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`group relative flex flex-col p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        special
          ? "bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100 hover:border-indigo-200"
          : "bg-white border-gray-200 hover:border-gray-300"
      }`}
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
          special
            ? "bg-white shadow-sm text-indigo-600"
            : "bg-gray-50 text-gray-900 group-hover:bg-black group-hover:text-white"
        }`}
      >
        <Icon size={24} />
      </div>

      <h3 className={`font-bold text-lg ${special ? "text-indigo-900" : "text-gray-900"}`}>
        {title}
      </h3>

      <p className={`text-sm mt-2 leading-relaxed ${special ? "text-indigo-700/80" : "text-gray-500"}`}>
        {description}
      </p>

      {special && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700">
            New
          </span>
        </div>
      )}
    </Link>
  );
}

/* ---------- Dashboard ---------- */

export default function LecturerDashboard() {
  const [stats, setStats] = useState({
    notes: 0,
    flashcards: 0,
    quizzes: 0,
    rooms: 0,
  });
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState<any[]>([]);

  // Function to lock/unlock a room
  const toggleRoom = async (roomId: string) => {
    try {
      const res = await api.patch(`/rooms/${roomId}/toggle`);
      setRooms(prev =>
        prev.map(r =>
          r._id === roomId ? { ...r, active: res.data.active } : r
        )
      );
    } catch {
      alert("Failed to toggle room status");
    }
  };

  useEffect(() => {
    const loadStats = async () => {
      try {
        const results = await Promise.allSettled([
          api.get("/notes/me"),
          api.get("/flashcards/me"),
          api.get("/quizzes/me"),
          api.get("/rooms/me"),
        ]);

        // Helper to extract data or default to 0/[]
        const getValue = (result: PromiseSettledResult<any>, fallback: any) => 
            result.status === 'fulfilled' ? result.value.data.data : fallback;

        const notesData = getValue(results[0], []);
        const flashcardsData = getValue(results[1], []);
        const quizzesData = getValue(results[2], []);
        const roomsData = getValue(results[3], []);

        setStats({
          notes: notesData.length,
          flashcards: flashcardsData.length,
          quizzes: quizzesData.length,
          rooms: roomsData.length,
        });

        setRooms(roomsData);

      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Lecturer Dashboard
            </h1>
            <p className="text-base text-gray-500 mt-2">
              Manage your teaching materials, assessments, and track student progress.
            </p>
          </div>
          <div className="text-sm text-gray-400 font-medium">
            Academic Year 2026
          </div>
        </div>

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Active Notes" value={stats.notes} icon={FileText} color="bg-blue-500" loading={loading} />
          <StatCard title="Flashcard Sets" value={stats.flashcards} icon={Layers} color="bg-orange-500" loading={loading} />
          <StatCard title="Total Quizzes" value={stats.quizzes} icon={CheckCircle} color="bg-green-500" loading={loading} />
          <StatCard title="Live Rooms" value={stats.rooms} icon={Presentation} color="bg-purple-500" loading={loading} />
        </section>

        {/* Actions Grid */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-black rounded-full"></span>
            Management Console
          </h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            <ActionCard title="Notes" to="/notes" description="Write structured study notes." icon={FileText} />
            <ActionCard title="Flashcards" to="/flashcards" description="Design active recall decks." icon={Layers} />
            <ActionCard title="Question Bank" to="/lecturer/questions" description="Manage your library of questions." icon={CheckCircle} />
            <ActionCard title="Create Quiz" to="/lecturer/quizzes/create" description="Combine questions into quizzes." icon={CheckCircle} />
            <ActionCard title="Launch Live Room" to="/lecturer/rooms/create" description="Start a synchronous quiz session." icon={Presentation} />
          </div>
        </section>

        {/* Live Rooms Management */}
        <section>
          <div className="flex items-center justify-between mb-6">
             <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="w-1 h-6 bg-indigo-600 rounded-full"></span>
                My Quiz Rooms
             </h2>
             <Link to="/lecturer/rooms" className="text-sm font-bold text-indigo-600 hover:text-indigo-800">
                View All →
             </Link>
          </div>

          {loading ? (
             <div className="h-40 bg-gray-100 rounded-2xl animate-pulse"></div>
          ) : rooms.length === 0 ? (
            <div className="text-center py-12 bg-white border border-dashed border-gray-300 rounded-2xl">
                <p className="text-gray-500">No active quiz rooms found.</p>
                <Link to="/lecturer/rooms/create" className="text-indigo-600 font-bold hover:underline mt-2 inline-block">
                    Create your first room
                </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.slice(0, 3).map(room => ( // Show only recent 3
                <div key={room._id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        room.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                        {room.active ? "ACTIVE" : "LOCKED"}
                      </span>
                      <span className="text-xs text-gray-400 font-mono">
                        {new Date(room.createdAt).toLocaleDateString()}
                      </span>
                  </div>

                  <h3 className="font-bold text-gray-900 truncate mb-1">{room.quiz?.title || "Untitled Quiz"}</h3>
                  <p className="text-sm text-gray-500 mb-6 font-mono">
                    Code: <span className="font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded">{room.roomCode}</span>
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => toggleRoom(room._id)}
                      className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-colors ${
                        room.active 
                            ? "bg-white border border-red-200 text-red-600 hover:bg-red-50" 
                            : "bg-white border border-green-200 text-green-600 hover:bg-green-50"
                      }`}
                    >
                      {room.active ? "Lock" : "Unlock"}
                    </button>

                    <Link
                      to={`/lecturer/rooms/${room._id}/leaderboard`}
                      className="flex-1 text-center bg-black text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
                    >
                      Results
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}