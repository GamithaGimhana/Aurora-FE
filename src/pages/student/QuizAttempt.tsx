// fe/pages/student/QuizAttempt.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function QuizAttempt() {
  const { attemptId } = useParams<{ attemptId: string }>();
  const navigate = useNavigate();
  const [attempt, setAttempt] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!attemptId) return;
    (async () => {
      try {
        const res = await api.get(`/attempts/${attemptId}`);
        setAttempt(res.data.attempt || res.data); // adapt to your backend shape
      } catch (err) {
        alert("Failed to load attempt");
      }
    })();
  }, [attemptId]);

  const setAnswer = (questionId: string, selected: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: selected })); 
  };

  const submitQuiz = async () => {
    try {
      // shape: { answers: [{ questionId, selected }, ...] }
      const payload = {
        answers: Object.entries(answers).map(([questionId, selected]) => ({
          questionId,
          selected,
        })),
      };

      await api.post(`/attempts/${attemptId}/submit`, payload);
      // After submit go to leaderboard / results page
      navigate(`/student/quiz/result/${attempt.quiz?._id || attempt.quiz}`);
    } catch (err) {
      console.error(err);
      alert("Failed to submit quiz");
    }
  };

  if (!attempt) return <p>Loading attempt...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">{attempt.quiz?.title || attempt.quizTitle}</h1>

      {attempt.quiz.questions.map((q: any, index: number) => (
        <div key={q._id} className="mb-6 bg-white p-4 rounded shadow">
          <p className="font-semibold mb-3">
            {index + 1}. {q.question || q.text}
          </p>

          {q.options.map((opt: string) => (
            <label key={opt} className="block mb-2">
              <input
                type="radio"
                name={q._id}
                value={opt}
                checked={answers[q._id] === opt}
                onChange={() => setAnswer(q._id, opt)}
              />{" "}
              {opt}
            </label>
          ))}
        </div>
      ))}

      <button onClick={submitQuiz} className="w-full bg-black text-white py-3 rounded font-bold">
        Submit Quiz
      </button>
    </div>
  );
}
