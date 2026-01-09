import { type FormEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import { 
  ChevronLeft, 
  Plus, 
  Trash2, 
  CheckCircle, 
  Hash 
} from "lucide-react";

export default function CreateQuestion() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [answer, setAnswer] = useState("");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);

  const updateOption = (index: number, value: string) => {
    setOptions((prev) => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  };

  const addOption = () => setOptions((prev) => [...prev, ""]);
  
  const removeOption = (index: number) => {
    if (options.length <= 2) return;
    setOptions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!question.trim() || !answer.trim() || options.some((o) => !o.trim())) {
      return alert("All fields must be filled, at least 2 options.");
    }

    setLoading(true);
    try {
      await api.post("/questions/create", {
        question: question.trim(),
        options: options.map((o) => o.trim()),
        answer: answer.trim(),
        topic: topic.trim() || undefined,
      });

      navigate("/lecturer/questions"); // go to list page
    } catch (err) {
      console.error(err);
      alert("Failed to create question");
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
                to="/lecturer/questions"
                className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
            >
                <ChevronLeft size={20} />
            </Link>
            <h1 className="text-xl font-bold">New Question Item</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-8">
            
            {/* 1. Topic (Metadata) */}
            <div>
                 <label className="block text-sm font-bold text-gray-700 mb-2">Topic / Category</label>
                 <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Hash className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="e.g. Physics, Calculus, React Hooks"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
                    />
                 </div>
                 <p className="text-xs text-gray-400 mt-2">Helping you filter questions later.</p>
            </div>

            <hr className="border-gray-100" />

            {/* 2. Question Body */}
            <div>
                 <label className="block text-sm font-bold text-gray-700 mb-2">Question Text</label>
                 <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full text-lg border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-gray-50 focus:bg-white transition-all h-32 resize-none placeholder-gray-300"
                    placeholder="Type your question here..."
                    required
                  />
            </div>

            {/* 3. Options */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-bold text-gray-700">Answer Options</label>
                    <button 
                        type="button" 
                        onClick={addOption} 
                        className="text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                    >
                        <Plus className="w-4 h-4" strokeWidth={3} /> Add Option
                    </button>
                </div>
                
                <div className="space-y-3">
                    {options.map((opt, idx) => (
                        <div key={idx} className="flex items-center gap-3 group">
                            <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-xs font-bold shrink-0 border border-gray-200">
                                {String.fromCharCode(65 + idx)}
                            </div>
                            <input
                                type="text"
                                value={opt}
                                onChange={(e) => updateOption(idx, e.target.value)}
                                className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"
                                placeholder={`Option ${idx + 1}`}
                                required
                            />
                            {options.length > 2 && (
                                <button 
                                    type="button" 
                                    onClick={() => removeOption(idx)} 
                                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                    title="Remove option"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. Correct Answer */}
            <div className="bg-green-50 rounded-xl p-5 border border-green-100">
                <label className="block text-xs font-bold text-green-800 uppercase tracking-wide mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" /> Correct Answer
                </label>
                
                <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="w-full bg-white border-green-200 text-green-900 font-medium rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all placeholder-green-700/30"
                    placeholder="Paste the correct answer exactly as written above"
                    required
                />
            </div>

            {/* Submit */}
            <div className="pt-4">
                <button 
                    type="submit" 
                    className="w-full bg-black text-white text-lg font-bold py-4 rounded-xl shadow-lg hover:bg-gray-800 transition-transform active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Create Question"}
                </button>
            </div>

        </form>
      </div>
    </div>
  );
}