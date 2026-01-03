import { useState } from "react";
import { createNote } from "../services/notes";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

// --- Icons ---
const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

const SaveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

export default function CreateNote() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiTopic, setAiTopic] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const handleCreate = async (e: any) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Both title and content are required");
      return;
    }

    setIsSubmitting(true);

    try {
      await createNote({ title, content });
      // Small delay to let the user see the button state (optional, just for feel)
      setTimeout(() => {
        alert("Note created successfully!");
        navigate("/notes");
      }, 500);
    } catch (err) {
      console.error(err);
      alert("Failed to create note");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation / Header */}
        <div className="flex items-center justify-between mb-8">
            <Link 
                to="/notes" 
                className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors text-sm font-medium"
            >
                <ArrowLeftIcon /> Back to Notes
            </Link>
            <div className="text-sm text-gray-400">
                Drafting...
            </div>
        </div>

        {/* Editor Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <form onSubmit={handleCreate} className="flex flex-col min-h-[600px]">
            
            {/* Top Toolbar / Actions */}
            <div className="px-8 py-6 border-b border-gray-100 flex justify-end bg-white">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-xl font-medium transition-all transform active:scale-95 ${
                        isSubmitting ? "opacity-70 cursor-wait" : "hover:bg-gray-800"
                    }`}
                >
                    {isSubmitting ? (
                        "Saving..."
                    ) : (
                        <>
                            <SaveIcon /> Save Note
                        </>
                    )}
                </button>
            </div>

            {/* Inputs Area */}
            <div className="p-8 md:p-12 flex-1 space-y-6">
                
                {/* Title Input - Styled to look like a document header */}
                <input
                    type="text"
                    placeholder="Untitled Note"
                    className="w-full text-4xl font-bold text-gray-900 placeholder-gray-300 border-none focus:ring-0 outline-none bg-transparent p-0"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                />

                {/* Content Input - Styled to look like a seamless document body */}
                <textarea
                    placeholder="Start typing your thoughts here..."
                    className="w-full h-full min-h-[400px] text-lg text-gray-600 leading-relaxed placeholder-gray-300 border-none focus:ring-0 outline-none bg-transparent resize-none p-0"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}