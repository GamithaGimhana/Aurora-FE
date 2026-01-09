import { useState } from "react";
import { createNote } from "../services/notes";
import { useNavigate, Link } from "react-router-dom";
import { Toaster, toast } from "sonner"; // 1. Import Sonner
import { ArrowLeft, Save, Loader2, FileText } from "lucide-react";

export default function CreateNote() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (e: any) => {
    e.preventDefault();

    // 2. Validation Toast
    if (!title.trim() || !content.trim()) {
      toast.error("Empty Fields", { 
          description: "Please add a title and some content before saving." 
      });
      return;
    }

    setIsSubmitting(true);

    // 3. API Promise Toast
    const createPromise = createNote({ title, content });

    toast.promise(createPromise, {
        loading: 'Saving note...',
        success: () => {
            // Navigate back to notes list
            // Small delay isn't strictly necessary with toasts, but feels smoother
            setTimeout(() => navigate("/notes"), 500);
            return "Note created successfully!";
        },
        error: () => {
            setIsSubmitting(false);
            return "Failed to save note. Please try again.";
        }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 py-12 px-6">
      
      {/* 4. Toaster Component */}
      <Toaster position="top-right" richColors closeButton />

      <div className="max-w-4xl mx-auto">
        
        {/* Navigation / Header */}
        <div className="flex items-center justify-between mb-8">
            <Link 
                to="/notes" 
                className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors text-sm font-medium"
            >
                <ArrowLeft size={20} /> Back to Notes
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-400 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                Drafting...
            </div>
        </div>

        {/* Editor Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[70vh] flex flex-col relative">
          <form onSubmit={handleCreate} className="flex flex-col flex-1">
            
            {/* Top Toolbar / Actions */}
            <div className="px-8 py-4 border-b border-gray-100 flex justify-between items-center bg-white/80 backdrop-blur-sm sticky top-0 z-10">
                <div className="flex items-center gap-2 text-gray-400">
                    <FileText size={18} />
                    <span className="text-xs font-bold uppercase tracking-wider">Editor</span>
                </div>
                
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-xl font-medium transition-all transform active:scale-95 shadow-md hover:shadow-lg ${
                        isSubmitting ? "opacity-70 cursor-wait" : "hover:bg-gray-800"
                    }`}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="animate-spin h-5 w-5 text-white" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save size={20} /> Save Note
                        </>
                    )}
                </button>
            </div>

            {/* Inputs Area */}
            <div className="p-8 md:p-12 flex-1 space-y-8">
                
                {/* Title Input - Styled to look like a document header */}
                <input
                    type="text"
                    placeholder="Untitled Note"
                    className="w-full text-4xl md:text-5xl font-bold text-gray-900 placeholder-gray-300 border-none focus:ring-0 outline-none bg-transparent p-0 tracking-tight"
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