import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";

// --- Icons ---
const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-500">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
  </svg>
);

const XCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500">
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
  </svg>
);

const TrophyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-yellow-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-8.718c-.621 0-1.125.504-1.125 1.125v3.375m3-9h6v3.75H9.75a3.75 3.75 0 01-3.75-3.75v-3h11.25v3a3.75 3.75 0 01-3.75 3.75z" />
  </svg>
);

// --- Helper for Grades ---
const getGrade = (percentage: number) => {
    if (percentage >= 90) return { text: "Outstanding!", color: "text-green-600", bg: "bg-green-50" };
    if (percentage >= 75) return { text: "Great Job!", color: "text-indigo-600", bg: "bg-indigo-50" };
    if (percentage >= 50) return { text: "Good Effort", color: "text-yellow-600", bg: "bg-yellow-50" };
    return { text: "Keep Practicing", color: "text-red-600", bg: "bg-red-50" };
};

export default function AttemptResult() {
  const { attemptId } = useParams<{ attemptId: string }>();
  const [attempt, setAttempt] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/attempts/${attemptId}`);
        setAttempt(res.data.data || res.data); // Handle wrapper if needed
      } catch {
        alert("Failed to load result");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [attemptId]);

  if (loading) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-slate-50">
              <div className="animate-pulse flex flex-col items-center">
                  <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
              </div>
          </div>
      );
  }

  if (!attempt) return <div className="p-10 text-center">Result not found</div>;

  const { quizRoom, responses, score } = attempt;
  const questions = quizRoom.quiz.questions;
  const percentage = Math.round((score / questions.length) * 100);
  const grade = getGrade(percentage);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center gap-4">
            <Link 
                to="/student/dashboard"
                className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
            >
                <ChevronLeft />
            </Link>
            <h1 className="text-xl font-bold">Result Summary</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">

        {/* Scorecard */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 text-center relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-2 ${grade.bg.replace("bg-", "bg-gradient-to-r from-transparent via-")}`}></div>
            
            <div className="flex flex-col items-center justify-center mb-6">
                <div className={`p-4 rounded-full ${grade.bg} mb-4`}>
                    <TrophyIcon />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{quizRoom.quiz.title}</h2>
                <p className="text-gray-500 text-sm">Attempt #{attempt.attemptNumber}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                <div className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Score</p>
                    <p className="text-3xl font-extrabold text-gray-900 mt-1">
                        {score}<span className="text-lg text-gray-400 font-medium">/{questions.length}</span>
                    </p>
                </div>
                <div className={`${grade.bg} rounded-2xl p-4`}>
                    <p className={`text-xs font-bold uppercase tracking-wide opacity-60 ${grade.color}`}>Grade</p>
                    <p className={`text-2xl font-bold mt-1 ${grade.color}`}>
                        {percentage}%
                    </p>
                </div>
            </div>
            
            <p className={`mt-6 font-medium ${grade.color}`}>{grade.text}</p>
        </div>

        {/* Detailed Review */}
        <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 px-2">Detailed Analysis</h3>
            <div className="space-y-6">
            {questions.map((q: any, idx: number) => {
                const r = responses.find((x: any) => x.question === q._id);
                const isCorrect = r?.correct;

                return (
                <div 
                    key={q._id} 
                    className={`bg-white rounded-2xl p-6 border transition-all ${
                        isCorrect 
                            ? "border-green-200 shadow-sm" 
                            : "border-red-200 shadow-sm"
                    }`}
                >
                    <div className="flex items-start gap-4 mb-4">
                        <div className="shrink-0 mt-1">
                            {isCorrect ? <CheckCircleIcon /> : <XCircleIcon />}
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 leading-relaxed">
                                <span className="text-gray-400 mr-2">{idx + 1}.</span>
                                {q.question}
                            </h3>
                        </div>
                    </div>

                    <div className="pl-10 space-y-3 text-sm">
                        {/* User Answer */}
                        <div className={`p-3 rounded-lg border flex items-center justify-between ${
                            isCorrect 
                                ? "bg-green-50 border-green-100 text-green-900" 
                                : "bg-red-50 border-red-100 text-red-900"
                        }`}>
                            <span className="font-medium">
                                {r?.selected || "Not answered"}
                            </span>
                            <span className="text-xs uppercase font-bold tracking-wide opacity-70">You</span>
                        </div>

                        {/* Correct Answer (Show only if wrong) */}
                        {!isCorrect && (
                            <div className="p-3 rounded-lg border bg-slate-50 border-slate-100 text-gray-700 flex items-center justify-between">
                                <span className="font-medium">
                                    {q.answer}
                                </span>
                                <span className="text-xs uppercase font-bold tracking-wide text-gray-400">Correct Answer</span>
                            </div>
                        )}
                    </div>
                </div>
                );
            })}
            </div>
        </div>

        {/* Footer Action */}
        <div className="text-center pt-4">
          <Link
            to="/student/dashboard"
            className="inline-block w-full sm:w-auto bg-black text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-gray-800 transition-transform active:scale-95"
          >
            Back to Dashboard
          </Link>
        </div>

      </div>
    </div>
  );
}