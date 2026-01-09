import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyNotes, deleteNote } from "../services/notes";
import { 
  Plus, 
  Trash2, 
  FileText, 
  ChevronLeft, 
  ChevronRight,
  FolderOpen
} from "lucide-react";

interface Note {
  _id: string;
  title: string;
  content: string;
}

// --- Skeleton Component ---
function NotesSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4 animate-pulse">
          <div className="flex justify-between items-start">
            <div className="h-10 w-10 bg-slate-100 rounded-lg"></div>
            <div className="h-5 w-5 bg-slate-100 rounded"></div>
          </div>
          <div className="h-4 bg-slate-100 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-slate-100 rounded w-full"></div>
            <div className="h-3 bg-slate-100 rounded w-full"></div>
            <div className="h-3 bg-slate-100 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchNotes = async (pageNumber = 1) => {
    try {
      const res = await getMyNotes(pageNumber, 6);

      setNotes(res.data || []);
      setTotalPages(res.totalPages || 1);
      setPage(pageNumber);
    } catch {
      alert("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this note?")) return;
    await deleteNote(id);
    fetchNotes(page);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Notes</h1>
            <p className="text-gray-500 mt-1">Organize your thoughts and study materials.</p>
          </div>

          <Link
            to="/notes/create"
            className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition shadow-lg shadow-gray-200"
          >
            <Plus size={18} strokeWidth={2.5} /> Create Note
          </Link>
        </div>

        {/* Content */}
        {loading ? (
          <NotesSkeleton />
        ) : notes.length === 0 ? (
          <div className="text-center py-20 bg-white border border-dashed border-gray-300 rounded-2xl">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-3xl mb-4 text-slate-400">
                <FolderOpen size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No notes found</h3>
            <p className="text-gray-500 mt-2">Get started by creating your first study note.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div
                key={note._id}
                className="group relative bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-gray-300 transition-all duration-300 flex flex-col"
              >
                {/* Card Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <FileText className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="text-gray-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Note"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                {/* Card Content */}
                <Link to={`/notes/${note._id}`} className="block flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {note.title}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
                    {note.content}
                    </p>
                </Link>

                {/* Card Footer */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center text-xs text-gray-400 font-medium">
                    <span>View details</span>
                    <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-indigo-600">Open →</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={() => fetchNotes(page - 1)}
              disabled={page === 1}
              className="p-2 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft size={20} />
            </button>

            <span className="px-4 py-2 bg-white border rounded-lg text-sm font-medium text-gray-700 shadow-sm">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => fetchNotes(page + 1)}
              disabled={page === totalPages}
              className="p-2 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}