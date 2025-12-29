import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function JoinQuizRoom() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const joinRoom = async () => {
    if (!code.trim()) return alert("Enter room code");

    try {
      setLoading(true);
      const res = await axios.get(`/rooms/join/${code}`);
      navigate(`/student/quiz/room/${res.data.data._id}`);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to join room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Join Quiz</h1>

        <input
          className="w-full border px-4 py-2 rounded mb-4"
          placeholder="Enter Room Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button
          onClick={joinRoom}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Joining..." : "Join Quiz"}
        </button>
      </div>
    </div>
  );
}
