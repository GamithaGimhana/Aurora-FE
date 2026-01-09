import { type FormEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import QuestionBank from "./QuestionBank";
import { 
  ChevronLeft, 
  Plus, 
  Trash2, 
  CheckCircle, 
  FolderPlus,
  ChevronDown 
} from "lucide-react";

interface QuestionPayload {
  question: string;
  options: string[];
  answer: string;
  topic?: string;
}

export default function CreateQuiz() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState<"EASY" | "MEDIUM" | "HARD">("EASY");
  const [questions, setQuestions] = useState<QuestionPayload[]>([
    { question: "", options: ["", "", "", ""], answer: "" },
  ]);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]); // for QuestionBank selection

  const addQuestion = () => setQuestions((q) => [...q, { question: "", options: ["", "", "", ""], answer: "" }]);

  const removeQuestion = (idx: number) => setQuestions((q) => q.filter((_, i) => i !== idx));

  const updateQuestionField = (i: number, field: keyof QuestionPayload, value: any) => {
    setQuestions((q) => {
      const copy = [...q];
      copy[i] = { ...copy[i], [field]: value };
      return copy;
    });
  };

  const updateOption = (qi: number, oi: number, value: string) => {
    setQuestions((q) => {
      const copy = [...q];
      const opts = [...copy[qi].options];
      opts[oi] = value;
      copy[qi] = { ...copy[qi], options: opts };
      return copy;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Filter valid inline questions only
    const inlineQuestions = questions
      .filter(
        (q) =>
          q.question.trim() &&
          q.answer.trim() &&
          q.options.filter(Boolean).length >= 2
      )
      .map((q) => ({
        question: q.question.trim(),
        options: q.options.map((o) => o.trim()),
        answer: q.answer.trim(),
      }));

    if (!title.trim()) {
      return alert("Quiz title is required");
    }

    // Validation: Must have at least one question (either inline OR from bank)
    if (!inlineQuestions.length && !selectedQuestions.length) {
      return alert("Please add at least one question (either create one inline or select from the Question Bank)");
    }

    try {
      await api.post("/quizzes/create", {
        title: title.trim(),
        description: description?.trim(),
        difficulty,
        questions: inlineQuestions.length ? inlineQuestions : undefined,
        selectedQuestions: selectedQuestions.length ? selectedQuestions : undefined,
      });

      navigate("/lecturer/rooms/create");
    } catch (error) {
      console.error(error);
      alert("Failed to create quiz");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 pb-24">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center gap-4">
            <Link 
                to="/lecturer/dashboard"
                className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
            >
                <ChevronLeft size={20} />
            </Link>
            <h1 className="text-xl font-bold">New Quiz</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        
        <form onSubmit={handleSubmit}>
            
            {/* Section 1: Meta Data */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6 mb-8">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Quiz Details</label>
                    <input 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Quiz Title (e.g. Advanced Calculus)" 
                        className="w-full text-lg border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-gray-50 focus:bg-white transition-all" 
                        required 
                    />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        placeholder="Description..." 
                        className="w-full border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-gray-50 focus:bg-white transition-all resize-none h-32" 
                    />
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Difficulty</label>
                        <div className="relative">
                            <select 
                                value={difficulty} 
                                onChange={(e) => setDifficulty(e.target.value as any)} 
                                className="w-full appearance-none border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-gray-50 focus:bg-white transition-all cursor-pointer"
                            >
                                <option value="EASY">Easy</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HARD">Hard</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
                                <ChevronDown size={16} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 2: Inline Questions */}
            <section className="mb-8">
                <div className="flex items-center justify-between mb-4 px-2">
                    <h2 className="text-lg font-bold text-gray-800">Inline Questions</h2>
                    <button 
                        type="button" 
                        onClick={addQuestion} 
                        className="flex items-center gap-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-colors"
                    >
                        <Plus size={16} strokeWidth={3} /> Add New
                    </button>
                </div>

                <div className="space-y-6">
                    {questions.map((q, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 border-b border-gray-100 px-6 py-3 flex justify-between items-center">
                            <span className="font-bold text-gray-500 text-xs uppercase tracking-wide">Question {i + 1}</span>
                            {questions.length > 1 && (
                                <button type="button" onClick={() => removeQuestion(i)} className="text-gray-400 hover:text-red-500 transition-colors" title="Remove">
                                    <Trash2 size={18} />
                                </button>
                            )}
                        </div>
                        
                        <div className="p-6 space-y-6">
                            <input 
                                value={q.question} 
                                onChange={(e) => updateQuestionField(i, "question", e.target.value)} 
                                placeholder="Type your question here..." 
                                className="w-full text-lg border-b border-gray-200 px-0 py-2 focus:ring-0 focus:border-indigo-500 outline-none bg-transparent transition-all placeholder-gray-300" 
                            />
                            
                            <div className="grid md:grid-cols-2 gap-4">
                                {q.options.map((opt, oi) => (
                                    <div key={oi} className="relative group">
                                        <span className="absolute left-3 top-3 text-xs font-bold text-gray-300 group-focus-within:text-indigo-400">{String.fromCharCode(65 + oi)}</span>
                                        <input 
                                            value={opt} 
                                            onChange={(e) => updateOption(i, oi, e.target.value)} 
                                            placeholder={`Option ${oi + 1}`} 
                                            className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-indigo-200 rounded-lg py-2.5 pl-8 pr-3 text-sm transition-all outline-none" 
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="bg-green-50 rounded-xl p-4 flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <input 
                                    value={q.answer} 
                                    onChange={(e) => updateQuestionField(i, "answer", e.target.value)} 
                                    placeholder="Paste correct answer exactly" 
                                    className="w-full bg-transparent border-0 p-0 text-sm font-medium text-gray-800 focus:ring-0 placeholder-green-700/40" 
                                />
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </section>

            {/* Section 3: Question Bank */}
            <section className="mb-10">
                <div className="flex items-center gap-2 mb-4 px-2">
                    <FolderPlus className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
                    <h2 className="text-lg font-bold text-gray-800">From Question Bank</h2>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <p className="text-sm text-gray-500 mb-4">Select pre-made questions from your library to add to this quiz.</p>
                    <QuestionBank selected={selectedQuestions} setSelected={setSelectedQuestions} />
                </div>
            </section>

            {/* Submit Action */}
            <button 
                type="submit" 
                className="w-full bg-black text-white text-lg font-bold py-4 rounded-xl hover:bg-gray-800 transition-transform active:scale-[0.99] shadow-lg shadow-gray-200"
            >
                Publish Quiz
            </button>

        </form>
      </div>
    </div>
  );
}