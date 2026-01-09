import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";
import { downloadAttemptReport } from "../../services/attempts";
import { 
  ChevronLeft, 
  CheckCircle, 
  XCircle, 
  Trophy, 
  Download 
} from "lucide-react";

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
  const [downloading, setDownloading] = useState(false);

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
                <ChevronLeft size={20} />
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
                    <Trophy className="w-12 h-12 text-yellow-500" strokeWidth={1.5} />
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
                            {isCorrect ? (
                                <CheckCircle className="w-6 h-6 text-green-500" />
                            ) : (
                                <XCircle className="w-6 h-6 text-red-500" />
                            )}
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
        <div className="flex flex-col gap-4 text-center pt-4">
             {/* Download PDF Button */}
            <button
                disabled={downloading}
                onClick={async () => {
                    try {
                    setDownloading(true);
                    const blob = await downloadAttemptReport(attempt._id);
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = `attempt-${attempt._id}.pdf`;
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    window.URL.revokeObjectURL(url);
                    } catch (err) {
                    console.error(err);
                    alert("Failed to download PDF");
                    } finally { 
                    setDownloading(false); 
                    }
                }}
                className="w-full sm:w-auto mx-auto inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-transform active:scale-95"
            >
                <Download size={20} />
                {downloading ? "Downloading..." : "Download Report"}
            </button>

            <Link
                to="/student/dashboard"
                className="w-full sm:w-auto mx-auto inline-block bg-black text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-gray-800 transition-transform active:scale-95"
            >
                Back to Dashboard
            </Link>
        </div>

      </div>
    </div>
  );
}