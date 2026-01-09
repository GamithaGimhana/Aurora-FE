import { useState } from "react";
import { createFlashcard } from "../services/flashcards";
import { useNavigate, Link } from "react-router-dom";
import { Toaster, toast } from "sonner"; // 1. Import Sonner
import { 
  ChevronLeft, 
  Tag, 
  HelpCircle, 
  Lightbulb, 
  Plus, 
  Loader2 
} from "lucide-react";

export default function FlashcardsCreate() {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (e: any) => {
    e.preventDefault();

    // 2. Validation Toast
    if (!front.trim() || !back.trim() || !topic.trim()) {
      toast.error("Incomplete Card", { description: "Please fill in the topic, question (front), and answer (back)." });
      return;
    }

    setLoading(true);

    // 3. Create Promise Toast
    const createPromise = createFlashcard({ front, back, topic });

    toast.promise(createPromise, {
        loading: 'Saving flashcard...',
        success: () => {
            navigate("/flashcards");
            return "Flashcard created successfully!";
        },
        error: (err) => {
            setLoading(false);
            return err?.response?.data?.message || err?.message || "Failed to create flashcard";
        }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 pb-20">
      
      {/* 4. Toaster Component */}
      <Toaster position="top-right" richColors closeButton />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center gap-4">
            <Link 
                to="/flashcards"
                className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
            >
                <ChevronLeft size={20} />
            </Link>
            <h1 className="text-xl font-bold">New Flashcard</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <form onSubmit={handleCreate} className="space-y-8">
          
          {/* Topic Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
             <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Tag className="w-5 h-5 text-gray-400" /> Topic
             </label>
             <input
                className="w-full text-lg border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-gray-50 focus:bg-white transition-all placeholder-gray-400"
                placeholder="e.g. History, Biology, React..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                disabled={loading}
             />
             <p className="text-xs text-gray-400 mt-2 pl-1">
                Group this card with others by using the same topic name.
             </p>
          </div>

          {/* Card Faces Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Front (Question) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-80">
                <div className="bg-gray-50 border-b border-gray-100 px-4 py-3 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-indigo-500" />
                    <span className="text-sm font-bold text-gray-600 uppercase tracking-wide">Front</span>
                </div>
                <textarea
                    className="flex-1 w-full p-6 text-lg font-medium resize-none focus:outline-none placeholder-gray-300"
                    placeholder="Type your question here..."
                    value={front}
                    onChange={(e) => setFront(e.target.value)}
                    disabled={loading}
                />
            </div>

            {/* Back (Answer) */}
            <div className="bg-indigo-50/50 rounded-2xl shadow-sm border border-indigo-100 overflow-hidden flex flex-col h-80">
                <div className="bg-indigo-100/50 border-b border-indigo-100 px-4 py-3 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm font-bold text-indigo-900 uppercase tracking-wide">Back</span>
                </div>
                <textarea
                    className="flex-1 w-full p-6 text-lg resize-none focus:outline-none bg-transparent placeholder-indigo-300 text-indigo-900"
                    placeholder="Type the answer here..."
                    value={back}
                    onChange={(e) => setBack(e.target.value)}
                    disabled={loading}
                />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4">
            <button
              type="submit"
              className={`w-full flex items-center justify-center gap-2 bg-black text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-gray-200 transition-all ${
                  loading ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-800 hover:-translate-y-1"
              }`}
              disabled={loading}
            >
              {loading ? (
                  <span className="flex items-center gap-2">
                      <Loader2 className="animate-spin h-5 w-5 text-white" />
                      Creating...
                  </span>
              ) : (
                  <>
                    <Plus size={20} /> Create Flashcard
                  </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}