import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getNoteById, deleteNote } from "../services/notes";
import type { Note } from "../services/notes";
import { ChevronLeft, Trash2, Calendar } from "lucide-react";

export default function ViewNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      if (!id) return;
      try {
        const data = await getNoteById(id);
        setNote(data);
      } catch (err) {
        console.error("Failed to fetch note", err);
        alert("Could not load note. It might have been deleted.");
        navigate("/notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!note || !confirm("Are you sure you want to delete this note? This action cannot be undone.")) return;
    try {
      await deleteNote(note._id);
      navigate("/notes");
    } catch (err) {
      alert("Failed to delete note");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
         <div className="flex flex-col items-center gap-4 animate-pulse">
            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
            <div className="text-gray-400 font-medium">Loading Note...</div>
         </div>
      </div>
    );
  }

  if (!note) return null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/notes"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors font-medium text-sm group"
          >
            <span className="group-hover:-translate-x-1 transition-transform"><ChevronLeft size={20} /></span> 
            Back to Notes
          </Link>

          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
            title="Delete Note"
          >
            <Trash2 size={20} /> Delete
          </button>
        </div>

        {/* Note Content "Paper" */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden min-h-[600px] flex flex-col">
          
          {/* Header Section */}
          <div className="p-8 md:p-12 border-b border-gray-100 bg-white">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              {note.title || "Untitled Note"}
            </h1>
            
            <div className="flex items-center gap-4 text-sm text-gray-400 font-medium">
                {note.createdAt && (
                    <div className="flex items-center gap-1.5">
                        <Calendar size={16} />
                        {new Date(note.createdAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </div>
                )}
                <span>•</span>
                {/* FIX: Safe access operator (?.) and fallback to 0 */}
                <div>{note.content?.length || 0} characters</div>
            </div>
          </div>

          {/* Body Section */}
          <div className="flex-1 p-8 md:p-12">
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap font-serif">
                {/* FIX: Safe access to content */}
                {note.content || ""}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}