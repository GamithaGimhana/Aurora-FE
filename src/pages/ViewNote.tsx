import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getNoteById, deleteNote } from "../services/notes";
import type { Note } from "../services/notes";

// --- Icons ---
const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
);

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
            <span className="group-hover:-translate-x-1 transition-transform"><ChevronLeft /></span> 
            Back to Notes
          </Link>

          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
            title="Delete Note"
          >
            <TrashIcon /> Delete
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
                        <CalendarIcon />
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