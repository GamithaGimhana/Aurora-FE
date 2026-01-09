import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyNotes } from "../../services/notes";
import type { Note } from "../../services/notes";
import { Toaster, toast } from "sonner"; // 1. Import Sonner
import { 
  Plus, 
  FileText, 
  Layers, 
  CheckCircle, 
  Ticket 
} from "lucide-react";

function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white border border-gray-100 rounded-2xl p-6 flex gap-4">
      <div className="h-12 w-12 bg-slate-100 rounded-lg shrink-0" />
      <div className="flex-1 space-y-3">
        <div className="h-4 bg-slate-100 rounded w-1/3" />
        <div className="h-3 bg-slate-100 rounded w-full" />
        <div className="h-3 bg-slate-100 rounded w-5/6" />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12 px-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl">
      <div className="mx-auto w-20 h-20 mb-4 overflow-hidden rounded-full bg-indigo-50 flex items-center justify-center">
          <span className="text-3xl">📝</span>
      </div>
      <h3 className="text-lg font-bold text-gray-900">No notes created yet</h3>
      <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto">
        Your dashboard is looking a bit empty. Create your first note to start building your knowledge base.
      </p>
      <Link
        to="/notes"
        className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition shadow-lg shadow-gray-200"
      >
        <Plus size={20} /> Create Note
      </Link>
    </div>
  );
}

// --- Component ---

export default function StudentDashboard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const res = await getMyNotes();
        setNotes(res.data.slice(0, 3)); // recent 3
      } catch (err) {
        // 2. Error Toast
        toast.error("Sync Error", { 
            description: "Could not retrieve your recent notes." 
        });
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      
      {/* 3. Toaster Component */}
      <Toaster position="top-right" richColors closeButton />

      {/* Dashboard Header Banner */}
      <header className="bg-slate-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Study Dashboard</h1>
                    <p className="text-gray-500 mt-2">Welcome back. Ready to learn something new today?</p>
                </div>

            </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Recent Activity */}
        <section className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
             <h2 className="font-bold text-xl text-gray-900">Recent Notes</h2>
             <Link to="/notes" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
               View all notes →
             </Link>
          </div>

           {/* Loading */}
           {loading && (
             <div className="grid gap-4">
               <SkeletonCard />
               <SkeletonCard />
               <SkeletonCard />
             </div>
           )}

           {/* Empty */}
           {!loading && notes.length === 0 && <EmptyState />}

           {/* Notes List */}
           {!loading && notes.length > 0 && (
             <div className="grid gap-4">
               {notes.map((note) => (
                 <Link 
                   key={note._id} 
                   to={`/notes/${note._id}`}
                   className="group block bg-white border border-gray-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-md transition-all duration-200"
                 >
                   <div className="flex items-start gap-4">
                     <div className="p-3 bg-indigo-50 rounded-xl group-hover:bg-indigo-100 transition-colors">
                        <FileText className="w-6 h-6 text-indigo-500" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                            {note.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                            {note.content}
                        </p>
                        <div className="mt-3 flex items-center text-xs text-gray-400 font-medium">
                            <span>Last edited recently</span>
                        </div>
                     </div>
                   </div>
                 </Link>
               ))}
             </div>
           )}
        </section>

        {/* Right Column: Sidebar */}
        <aside className="lg:col-span-4 space-y-6">

          {/* Live Quiz Card (New!) */}
          <div className="bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-100 rounded-2xl p-6">
            <h3 className="font-bold text-rose-900 mb-2 flex items-center gap-2">
                <Ticket className="w-6 h-6 text-rose-500" /> Live Session
            </h3>
            <p className="text-sm text-rose-800/80 mb-4 leading-relaxed">
                Got a game code? Join a live quiz room now.
            </p>
            <Link 
                to="/student/join" 
                className="block w-full text-center bg-white text-rose-600 border border-rose-200 font-bold py-2.5 rounded-xl hover:bg-rose-50 hover:border-rose-300 transition-colors"
            >
                Enter Game PIN
            </Link>
          </div>

          {/* Quick Actions Grid */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-3">
              <Link to="/student/join" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-rose-100 transition-colors">
                    <Ticket size={20} />
                </div>
                <span className="font-medium text-sm text-gray-700">Join Live Room</span>
              </Link>

              <Link to="/notes" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                    <FileText size={20} />
                </div>
                <span className="font-medium text-sm text-gray-700">Write a Note</span>
              </Link>
              
              <Link to="/flashcards" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                    <Layers size={20} />
                </div>
                <span className="font-medium text-sm text-gray-700">Create Flashcards</span>
              </Link>

              <Link to="/student/rooms/available" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                    <CheckCircle size={20} />
                </div>
                <span className="font-medium text-sm text-gray-700">Start a Quiz</span>
              </Link>
            </div>
          </div>

          {/* Study Tip Card */}
          <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl"></div>
            
            <h3 className="relative font-bold text-lg mb-2 flex items-center gap-2">
                <span className="text-xl">💡</span> Daily Insight
            </h3>
            <p className="relative text-sm text-indigo-100 leading-relaxed">
              "Active recall is 50% more effective than passive reading. Try turning this note into a flashcard!"
            </p>
          </div>

        </aside>
      </main>
    </div>
  );
}