import { useState } from "react";
import { createFlashcard } from "../services/flashcards";
import { useNavigate, Link } from "react-router-dom";

// --- Icons ---
const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const TagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
  </svg>
);

const QuestionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-indigo-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
  </svg>
);

const BulbIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-yellow-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-4.5 6.01 6.01 0 00-1.5-4.5 6.01 6.01 0 00-1.5 4.5 6.01 6.01 0 001.5 4.5zM13.5 18a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 01-3 0m3 0h-3" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

export default function FlashcardsCreate() {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (e: any) => {
    e.preventDefault();

    if (!front.trim() || !back.trim() || !topic.trim()) {
      alert("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const res = await createFlashcard({ front, back, topic });

      if (res?.message) {
        console.log(res.message);
      }
      // success — backend response available in res
      // alert(res.message || "Flashcard created!"); // Optional: Remove alert for smoother flow
      navigate("/student/flashcards");
    } catch (err: any) {
      // show better error info
      console.error("Create flashcard error:", err);

      // axios error shape
      const serverMsg =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        "Failed to create flashcard";

      alert(`Error: ${serverMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center gap-4">
            <Link 
                to="/flashcards"
                className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
            >
                <ChevronLeft />
            </Link>
            <h1 className="text-xl font-bold">New Flashcard</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <form onSubmit={handleCreate} className="space-y-8">
          
          {/* Topic Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
             <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <TagIcon /> Topic
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
                    <QuestionIcon />
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
                    <BulbIcon />
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
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                  </span>
              ) : (
                  <>
                    <PlusIcon /> Create Flashcard
                  </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}