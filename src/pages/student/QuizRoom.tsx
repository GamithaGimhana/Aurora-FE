import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api"; // [cite: 33] Using your configured axios instance

interface Question {
  _id: string;
  question: string;
  options: string[];
}

export default function QuizRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  
  const [room, setRoom] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await api.get(`/rooms/code/${roomId}`); 
        const response = await api.get(`/rooms/code/${roomId}`); 

        await api.post(`/rooms/${roomId}/start`);
        
        setRoom(response.data.data);
        
        if (response.data.data.timeLimit) {
           setTimeLeft(response.data.data.timeLimit * 60); // mins to seconds
        }
      } catch (err) {
        alert("Failed to join room");
        navigate("/student/dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [roomId, navigate]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev !== null && prev <= 1) {
          clearInterval(timer);
          handleSubmit(true); // Auto-submit
          return 0;
        }
        return prev !== null ? prev - 1 : null;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSelect = (questionId: string, option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option
    }));
  };

  const handleSubmit = useCallback(async (auto = false) => {
    if (submitting) return;
    setSubmitting(true);

    if (auto) alert("Time's up! Submitting your answers...");

    const formattedResponses = Object.entries(answers).map(([qId, val]) => ({
      question: qId,
      selected: val
    }));

    try {
      await api.post("/attempts/create", {
        quizRoomId: room._id,
        responses: formattedResponses
      });
      navigate(`/student/quiz/result/${room._id}`); 
    } catch (err: any) {
      alert(err.response?.data?.message || "Submission failed");
      setSubmitting(false);
    }
  }, [answers, room, navigate, submitting]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (loading) return <div className="p-10 text-center">Loading Quiz...</div>;
  if (!room) return <div className="p-10 text-center">Room not found</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="sticky top-4 z-20 bg-white shadow-md rounded-xl p-4 flex justify-between items-center mb-6 border border-gray-200">
            <div>
                <h1 className="font-bold text-xl">{room.quiz.title}</h1>
                <p className="text-xs text-gray-500">Room: {room.roomCode}</p>
            </div>
            {timeLeft !== null && (
                <div className={`text-2xl font-mono font-bold ${timeLeft < 60 ? 'text-red-600 animate-pulse' : 'text-indigo-600'}`}>
                    {formatTime(timeLeft)}
                </div>
            )}
        </div>

        {/* Questions List */}
        <div className="space-y-6">
            {room.quiz.questions.map((q: Question, idx: number) => (
                <div key={q._id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-medium mb-4 flex gap-3">
                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-sm h-fit mt-1">
                            {idx + 1}
                        </span> 
                        {q.question}
                    </h3>
                    <div className="grid gap-3">
                        {q.options.map((opt) => (
                            <label 
                                key={opt} 
                                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                                    answers[q._id] === opt 
                                        ? "bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500" 
                                        : "hover:bg-gray-50 border-gray-200"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name={q._id}
                                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                                    checked={answers[q._id] === opt}
                                    onChange={() => handleSelect(q._id, opt)}
                                />
                                <span className="text-gray-700">{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>
            ))}
        </div>

        <div className="mt-8 pb-12">
            <button
                onClick={() => handleSubmit(false)}
                disabled={submitting}
                className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
            >
                {submitting ? "Submitting..." : "Submit Quiz"}
            </button>
        </div>

        <button
          onClick={async () => {
            await api.put(`/rooms/${room._id}/close`);
            alert("Quiz room closed");
          }}
        >
          Close Room
        </button>

      </div>
    </div>
  );
}