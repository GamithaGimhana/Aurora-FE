import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../services/api";

export default function Leaderboard() {
  const { roomId } = useParams();
  const [scores, setScores] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`/leaderboard/${roomId}`).then(res => setScores(res.data));
  }, [roomId]);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>

      <ul className="bg-white rounded shadow divide-y">
        {scores.map((s, i) => (
          <li key={s.user._id} className="p-4 flex justify-between">
            <span>{i + 1}. {s.user.name}</span>
            <span className="font-bold">{s.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
