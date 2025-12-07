import { useEffect, useState } from "react";
import { getMyNotes, deleteNote } from "../../services/notes";
import { Link } from "react-router-dom";

interface Note {
  _id: string;
  title: string;
  content: string;
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const loadNotes = async () => {
    try {
      const res = await getMyNotes();
      setNotes(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this note?")) return;

    try {
      await deleteNote(id);
      loadNotes();
    } catch (err) {
      console.error(err);
      alert("Failed to delete note");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading notes...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">My Notes</h1>
        <Link
          to="/student/notes/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Create Note
        </Link>
      </div>

      {notes.length === 0 ? (
        <p className="text-gray-600">No notes yet. Create your first note.</p>
      ) : (
        <div className="grid gap-4">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white p-4 rounded-xl shadow border"
            >
              <h2 className="text-xl font-semibold">{note.title}</h2>
              <p className="text-gray-600 mt-1 line-clamp-3">
                {note.content}
              </p>

              <div className="flex justify-end mt-3 gap-2">
                <button
                  onClick={() => handleDelete(note._id)}
                  className="text-red-600 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
