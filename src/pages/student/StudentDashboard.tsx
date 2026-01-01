import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyNotes } from "../../services/notes";
import type { Note } from "../../services/notes";

// --- Icons ---
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
  </svg>
);
const NoteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);
const FlashcardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-orange-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const QuizIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const TicketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-rose-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
  </svg>
);

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
        to="/student/notes"
        className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition shadow-lg shadow-gray-200"
      >
        <PlusIcon /> Create Note
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
        console.error("Failed to load notes", err);
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      
      {/* Dashboard Header Banner */}
      <header className="bg-slate-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Study Dashboard</h1>
                    <p className="text-gray-500 mt-2">Welcome back. Ready to learn something new today?</p>
                </div>
                
                <Link
                    to="/student/quiz-generator"
                    className="inline-flex items-center justify-center gap-2 bg-black text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition shadow-lg shadow-gray-200"
                >
                    <PlusIcon /> New Study Material
                </Link>
            </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Recent Activity */}
        <section className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
             <h2 className="font-bold text-xl text-gray-900">Recent Notes</h2>
             <Link to="/student/notes" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
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
                   to={`/student/notes/${note._id}`}
                   className="group block bg-white border border-gray-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-md transition-all duration-200"
                 >
                   <div className="flex items-start gap-4">
                     <div className="p-3 bg-indigo-50 rounded-xl group-hover:bg-indigo-100 transition-colors">
                        <NoteIcon />
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
                <TicketIcon /> Live Session
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
                    <TicketIcon />
                </div>
                <span className="font-medium text-sm text-gray-700">Join Live Room</span>
              </Link>

              <Link to="/student/notes" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                    <NoteIcon />
                </div>
                <span className="font-medium text-sm text-gray-700">Write a Note</span>
              </Link>
              
              <Link to="/student/flashcards" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                    <FlashcardIcon />
                </div>
                <span className="font-medium text-sm text-gray-700">Create Flashcards</span>
              </Link>

              <Link to="/student/quizzes" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                    <QuizIcon />
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