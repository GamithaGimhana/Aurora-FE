// fe/pages/student/QuizRoom.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api"; // <-- use your api wrapper

export default function QuizRoom() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roomId) return;
    const load = async () => {
      try {
        const res = await api.get(`/rooms/${roomId}`); // GET room by id
        // backend returned data shape maybe res.data.data or res.data — adapt if necessary
        setRoom(res.data.data || res.data);
      } catch (err) {
        alert("Failed to load room");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [roomId]);

  const startQuiz = async () => {
    try {
      // IMPORTANT: backend expects POST /rooms/:roomId/start according to routes.
      const res = await api.post(`/rooms/${roomId}/start`);
      const payload = res.data; // { attempt, quiz, endsAt } per the controller above
      const attemptId = payload.attempt._id || payload.attempt.id;
      navigate(`/student/attempt/${attemptId}`);
    } catch (err) {
      console.error(err);
      alert("Failed to start quiz");
    }
  };

  if (loading) return <p>Loading room...</p>;
  if (!room) return <p>Room not found.</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-lg text-center">
        <h1 className="text-2xl font-bold">{room.quiz?.title}</h1>
        <p className="text-gray-500 mt-2">{room.quiz?.description}</p>

        <button
          onClick={startQuiz}
          className="mt-6 bg-black text-white px-6 py-3 rounded font-semibold"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
