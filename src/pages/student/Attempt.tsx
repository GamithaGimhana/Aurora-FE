import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

// --- Icons ---
const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-indigo-600">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
  </svg>
);

// --- Helper: Format Seconds ---
const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

export default function Attempt() {
  const { attemptId } = useParams<{ attemptId: string }>();
  const navigate = useNavigate();
  const [attempt, setAttempt] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [remaining, setRemaining] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!attemptId) return;

    const load = async () => {
      try {
        const res = await api.get(`/attempts/${attemptId}`);
        const data = res.data.data; 
        setAttempt(data);

        // Timer calculation
        const startedAt = new Date(data.createdAt).getTime();
        const timeLimit = data.quizRoom.timeLimit * 60 * 1000;
        const end = startedAt + timeLimit;
        setRemaining(Math.max(0, Math.floor((end - Date.now()) / 1000)));
      } catch (err) {
        alert("Failed to load attempt");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [attemptId]);

  // Countdown logic
  useEffect(() => {
    if (remaining <= 0) return;
    const t = setInterval(() => setRemaining((r) => r - 1), 1000);
    
    // Auto-submit logic could go here if remaining === 0
    
    return () => clearInterval(t);
  }, [remaining]);

  const selectAnswer = (questionId: string, option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const submit = async () => {
    if(!confirm("Are you sure you want to submit?")) return;
    
    setSubmitting(true);
    try {
      const payload = Object.entries(answers).map(
        ([questionId, selected]) => ({
          questionId,
          selected,
        })
      );

      const res = await api.post(
        `/attempts/${attemptId}/submit`,
        { answers: payload }
      );

      alert(`Quiz Submitted!\nScore: ${res.data.score}/${res.data.total}`);
      //   navigate("/student/dashboard");
      navigate(`/student/attempt/result/${attemptId}`);

    } catch (err) {
      alert("Failed to submit");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center gap-4">
                <div className="h-12 w-12 bg-indigo-200 rounded-full"></div>
                <div className="text-gray-400">Loading quiz...</div>
            </div>
        </div>
    );
  }

  if (!attempt) return <div className="p-10 text-center">Attempt not found</div>;

  const questions = attempt.quizRoom.quiz.questions;
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = (answeredCount / totalQuestions) * 100;
  const isUrgent = remaining < 60; // Red timer if < 1 min

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 pb-24">
      
      {/* --- Sticky Header --- */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
            <h1 className="font-bold text-lg text-gray-900 truncate max-w-[200px] sm:max-w-md">
                {attempt.quizRoom.quiz.title}
            </h1>
            
            <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full font-mono font-bold text-sm transition-colors ${
                isUrgent ? "bg-red-100 text-red-600 animate-pulse" : "bg-black text-white"
            }`}>
                <ClockIcon />
                {formatTime(remaining)}
            </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-100">
            <div 
                className="h-full bg-indigo-600 transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
            />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">
        
        {/* Question List */}
        {questions.map((q: any, index: number) => (
          <div key={q._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            
            <div className="mb-4">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Question {index + 1}</span>
                <h3 className="text-lg font-semibold text-gray-900 mt-1 leading-relaxed">
                    {q.question}
                </h3>
            </div>

            <div className="space-y-3">
              {q.options.map((opt: string) => {
                const isSelected = answers[q._id] === opt;
                
                return (
                  <label 
                    key={opt} 
                    className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 group ${
                        isSelected 
                            ? "border-indigo-600 bg-indigo-50/50 shadow-sm" 
                            : "border-gray-100 bg-white hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name={q._id}
                      value={opt}
                      checked={isSelected}
                      onChange={() => selectAnswer(q._id, opt)}
                      className="peer sr-only"
                    />
                    
                    {/* Custom Radio Circle */}
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-4 transition-colors ${
                        isSelected ? "border-indigo-600 bg-indigo-600" : "border-gray-300 bg-white"
                    }`}>
                        {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>

                    <span className={`flex-1 font-medium ${isSelected ? "text-indigo-900" : "text-gray-700"}`}>
                        {opt}
                    </span>

                    {/* Checkmark Icon for selected state */}
                    {isSelected && (
                        <div className="absolute right-4 animate-in fade-in zoom-in duration-200">
                            <CheckCircleIcon />
                        </div>
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        ))}

        {/* Footer Action */}
        <div className="pt-6 border-t border-gray-200 flex flex-col items-center gap-4">
            <p className="text-sm text-gray-500">
                {answeredCount} of {totalQuestions} questions answered
            </p>
            
            <button
                onClick={submit}
                disabled={submitting}
                className={`w-full sm:w-auto min-w-[200px] bg-black text-white text-lg font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-gray-800 transition-transform active:scale-95 ${
                    submitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
            >
                {submitting ? "Submitting..." : "Submit Quiz"}
            </button>
        </div>

      </div>
    </div>
  );
}