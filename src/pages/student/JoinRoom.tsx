import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../services/api";

export default function JoinRoom() {
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  const handleJoin = async () => {
    try {
      const res = await axios.post("/rooms/join", { roomCode });
      navigate(`/student/quiz-room/${res.data.room._id}`);
    } catch {
      alert("Invalid or closed room");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Join Quiz Room</h1>

        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Enter Room Code"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
        />

        <button
          onClick={handleJoin}
          className="w-full bg-black text-white py-3 rounded font-semibold"
        >
          Join
        </button>
      </div>
    </div>
  );
}
