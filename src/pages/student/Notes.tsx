import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyNotes, deleteNote } from "../../services/notes";

interface Note {
  _id: string;
  title: string;
  content: string;
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

  if (loading) return <p className="text-center mt-10">Loading notes...</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Notes</h1>

        <Link
          to="/student/notes/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Create Note
        </Link>
      </div>

      {/* Notes Grid */}
      {notes.length === 0 ? (
        <p className="text-gray-600">No notes created yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold mb-2">
                {note.title}
              </h3>

              <p className="text-gray-600 text-sm line-clamp-4">
                {note.content}
              </p>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleDelete(note._id)}
                  className="text-red-600 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={() => fetchNotes(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
          >
            Prev
          </button>

          <span className="px-4 py-2">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => fetchNotes(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
