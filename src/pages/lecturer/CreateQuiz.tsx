import { type FormEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import QuestionBank from "./QuestionBank";

// --- Icons ---
const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-600">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
  </svg>
);

const FolderPlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
  </svg>
);

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

    if (!inlineQuestions.length && !selectedQuestions.length) {
      return alert("Add at least one question (either inline or from bank)");
    }

    await api.post("/quizzes/create", {
      title: title.trim(),
      description: description?.trim(),
      difficulty,
      questions: inlineQuestions.length ? inlineQuestions : undefined,
      selectedQuestions: selectedQuestions.length ? selectedQuestions : undefined,
    });

    navigate("/lecturer/rooms/create");
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
                <ChevronLeft />
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
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
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
                        <PlusIcon /> Add New
                    </button>
                </div>

                <div className="space-y-6">
                    {questions.map((q, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 border-b border-gray-100 px-6 py-3 flex justify-between items-center">
                            <span className="font-bold text-gray-500 text-xs uppercase tracking-wide">Question {i + 1}</span>
                            {questions.length > 1 && (
                                <button type="button" onClick={() => removeQuestion(i)} className="text-gray-400 hover:text-red-500 transition-colors" title="Remove">
                                    <TrashIcon />
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
                                <CheckCircleIcon />
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
                    {/* <FolderPlusIcon className="text-gray-400" /> */}
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