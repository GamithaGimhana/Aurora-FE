import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

interface ResponseItem {
  question: string;
  options: string[];
  correctAnswer: string;
  selectedAnswer: string;
  correct: boolean;
}

const AttemptReview = () => {
  const { attemptId } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchAttempt = async () => {
      const res = await api.get(`/attempts/${attemptId}`);
      setData(res.data);
    };

    fetchAttempt();
  }, [attemptId]);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>Quiz Result</h2>
      <p><strong>Student:</strong> {data.student}</p>
      <p><strong>Score:</strong> {data.score}</p>

      <hr />

      {data.responses.map((r: ResponseItem, index: number) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <h4>{index + 1}. {r.question}</h4>

          <ul>
            {r.options.map((opt, i) => (
              <li
                key={i}
                style={{
                  color:
                    opt === r.correctAnswer
                      ? "green"
                      : opt === r.selectedAnswer
                      ? "red"
                      : "black",
                }}
              >
                {opt}
              </li>
            ))}
          </ul>

          <p>
            <strong>Your Answer:</strong> {r.selectedAnswer} <br />
            <strong>Correct Answer:</strong> {r.correctAnswer}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AttemptReview;
