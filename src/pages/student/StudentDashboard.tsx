import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyNotes } from "../../services/notes";
import type { Note } from "../../services/notes";


function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white border rounded-xl p-6 space-y-3">
      <div className="h-4 bg-slate-200 rounded w-1/3" />
      <div className="h-3 bg-slate-200 rounded w-full" />
      <div className="h-3 bg-slate-200 rounded w-5/6" />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="text-5xl mb-4">📘</div>
      <h3 className="text-lg font-semibold">No notes yet</h3>
      <p className="text-sm text-gray-500 mt-2">
        Create your first note and start learning smarter.
      </p>
      <Link
        to="/student/notes"
        className="inline-block mt-6 px-5 py-2 bg-black text-white rounded-lg text-sm"
      >
        Create Note
      </Link>
    </div>
  );
}

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
    <div className="min-h-screen bg-slate-50">

      {/* Top Bar */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Study Dashboard</h1>

          <Link
            to="/student/quiz-generator"
            className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800"
          >
            + New Study Material
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-12 gap-8">

        {/* Activity Feed */}
        <section className="col-span-12 lg:col-span-8">
          <div className="bg-white border rounded-xl">

            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="font-semibold text-lg">Recent Notes</h2>
              <Link
                to="/student/notes"
                className="text-sm text-gray-500 hover:text-black"
              >
                View all
              </Link>
            </div>

            {/* Loading */}
            {loading && (
              <div className="p-6 grid gap-4">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            )}

            {/* Empty */}
            {!loading && notes.length === 0 && <EmptyState />}

            {/* Notes */}
            {!loading && notes.length > 0 && (
              <div className="divide-y">
                {notes.map((note) => (
                  <div key={note._id} className="p-6 hover:bg-slate-50">
                    <p className="font-medium">{note.title}</p>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {note.content}
                    </p>

                    <Link
                      to={`/student/notes/${note._id}`}
                      className="inline-block mt-3 text-sm text-blue-600"
                    >
                      Open →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Right Panel */}
        <aside className="col-span-12 lg:col-span-4 space-y-6">

          <div className="bg-white border rounded-xl p-6">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link className="block border rounded-lg px-4 py-3 text-sm hover:bg-slate-100" to="/student/notes">
                Create Notes
              </Link>
              <Link className="block border rounded-lg px-4 py-3 text-sm hover:bg-slate-100" to="/student/flashcards">
                Create Flashcards
              </Link>
              <Link className="block border rounded-lg px-4 py-3 text-sm hover:bg-slate-100" to="/student/quizzes">
                Create Quiz
              </Link>
            </div>
          </div>

          <div className="bg-black text-white rounded-xl p-6">
            <h3 className="font-semibold mb-2">Study Tip</h3>
            <p className="text-sm text-white/80">
              Writing notes in your own words improves long-term retention.
            </p>
          </div>

        </aside>
      </main>
    </div>
  );
}
