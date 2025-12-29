import { useEffect, useState } from "react";
import api from "../../services/api";
import { useParams } from "react-router-dom";

interface Attempt {
  _id: string;
  student: {
    name: string;
  };
  score: number;
  submittedAt: string;
}

const QuizResult = () => {
  const { roomId } = useParams();
  const [attempts, setAttempts] = useState<Attempt[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const res = await api.get(`/attempts/room/${roomId}`);
      setAttempts(res.data);
    };

    fetchLeaderboard();
  }, [roomId]);

  return (
    <div>
      <h2>Leaderboard</h2>

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Student</th>
            <th>Score</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {attempts.map((attempt, index) => (
            <tr key={attempt._id}>
              <td>{index + 1}</td>
              <td>{attempt.student.name}</td>
              <td>{attempt.score}</td>
              <td>
                {new Date(attempt.submittedAt).toLocaleTimeString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuizResult;
