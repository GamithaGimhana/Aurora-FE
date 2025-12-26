import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createQuiz } from "../../services/quiz";

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
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-500">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
  </svg>
);

interface Question {
  question: string;
  options: string[];
  answer: string;
}

export default function CreateQuiz() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");

  const [questions, setQuestions] = useState<Question[]>([
    { question: "", options: ["", "", "", ""], answer: "" },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], answer: "" },
    ]);
  };

  // Logic to remove a question (UI helper, logic added to support the delete button visually)
  const removeQuestion = (index: number) => {
    if (questions.length === 1) return; // Prevent deleting the last question
    const copy = [...questions];
    copy.splice(index, 1);
    setQuestions(copy);
  };

  const updateQuestion = (i: number, field: keyof Question, value: any) => {
    const copy = [...questions];
    copy[i][field] = value;
    setQuestions(copy);
  };

  const updateOption = (qi: number, oi: number, value: string) => {
    const copy = [...questions];
    copy[qi].options[oi] = value;
    setQuestions(copy);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    for (const q of questions) {
      if (!q.question || !q.answer || q.options.some((opt) => !opt)) {
        return alert("Please fill all fields for all questions");
      }
    }

    await createQuiz({
      title,
      description,
      difficulty,
      questions,
    });

    navigate("/student/quizzes");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 pb-20">
      
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                >
                    <ChevronLeft />
                </button>
                <h1 className="text-xl font-bold">New Quiz</h1>
            </div>
            <div className="text-sm text-gray-400">
                {questions.length} Question{questions.length !== 1 ? 's' : ''}
            </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Quiz Meta */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-5">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Quiz Title</label>
                <input
                    className="w-full text-lg font-medium border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-gray-50 focus:bg-white transition-all"
                    placeholder="e.g. Introduction to React Hooks"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                    <textarea
                        className="w-full h-32 border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-gray-50 focus:bg-white transition-all resize-none"
                        placeholder="Briefly describe what this quiz covers..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Difficulty Level</label>
                    <div className="relative">
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
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
                    <p className="text-xs text-gray-400 mt-2">
                        This helps students gauge the complexity before starting.
                    </p>
                </div>
            </div>
          </section>

          {/* Section 2: Questions */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
                 <h2 className="text-xl font-bold text-gray-800">Questions</h2>
                 <button
                    type="button"
                    onClick={addQuestion}
                    className="flex items-center gap-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-colors"
                >
                    <PlusIcon /> Add Question
                </button>
            </div>

            {questions.map((q, qi) => (
              <div key={qi} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Question Header */}
                <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex justify-between items-center">
                    <span className="font-bold text-gray-500 text-sm uppercase tracking-wide">Question {qi + 1}</span>
                    {questions.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removeQuestion(qi)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            title="Remove Question"
                        >
                            <TrashIcon />
                        </button>
                    )}
                </div>

                <div className="p-6 space-y-6">
                    {/* Question Input */}
                    <div>
                        <input
                            className="w-full text-lg font-medium border-0 border-b-2 border-gray-100 px-0 py-2 focus:ring-0 focus:border-indigo-500 outline-none bg-transparent transition-all placeholder-gray-300"
                            placeholder="Type your question here..."
                            value={q.question}
                            onChange={(e) => updateQuestion(qi, "question", e.target.value)}
                            required
                        />
                    </div>

                    {/* Options Grid */}
                    <div className="grid md:grid-cols-2 gap-4">
                        {q.options.map((opt, oi) => (
                        <div key={oi} className="relative group">
                            <span className="absolute left-3 top-3 text-xs font-bold text-gray-300 group-focus-within:text-indigo-400">
                                {String.fromCharCode(65 + oi)}
                            </span>
                            <input
                                className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-indigo-200 rounded-lg py-2.5 pl-8 pr-3 text-sm transition-all outline-none"
                                placeholder={`Option ${oi + 1}`}
                                value={opt}
                                onChange={(e) => updateOption(qi, oi, e.target.value)}
                                required
                            />
                        </div>
                        ))}
                    </div>

                    {/* Correct Answer */}
                    <div className="bg-green-50 rounded-xl p-4 flex items-center gap-4">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                            <CheckCircleIcon />
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs font-bold text-green-700 uppercase mb-1">Correct Answer</label>
                            <input
                                className="w-full bg-transparent border-0 p-0 text-sm font-medium text-gray-800 focus:ring-0 placeholder-green-700/30"
                                placeholder="Paste the correct answer exactly as above"
                                value={q.answer}
                                onChange={(e) => updateQuestion(qi, "answer", e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>
              </div>
            ))}
          </section>

          {/* Submit Action */}
          <div className="pt-4 pb-12">
            <button
              type="submit"
              className="w-full bg-black text-white text-lg font-bold py-4 rounded-xl hover:bg-gray-800 transition-transform active:scale-[0.99] shadow-lg shadow-gray-200"
            >
              Publish Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}