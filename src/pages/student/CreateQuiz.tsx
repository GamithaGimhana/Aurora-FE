import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { createQuiz } from "../../services/quiz";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

export default function CreateQuiz() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");

  const [questions, setQuestions] = useState<Question[]>([
    { question: "", options: ["", "", "", ""], answer: "" },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], answer: "" },
    ]);
  };

  const updateQuestion = (i: number, field: keyof Question, value: any) => {
    const copy = [...questions];
    copy[i][field] = value;
    setQuestions(copy);
  };

  const updateOption = (qi: number, oi: number, value: string) => {
    const copy = [...questions];
    copy[qi].options[oi] = value;
    setQuestions(copy);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await createQuiz({
      title,
      description,
      difficulty,
      questions,
    });

    navigate("/student/quizzes");
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      <h1 className="text-3xl font-bold mb-8">Create Quiz</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow">

        <input
          className="w-full border p-2 rounded"
          placeholder="Quiz title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="EASY">Easy</option>
          <option value="MEDIUM">Medium</option>
          <option value="HARD">Hard</option>
        </select>

        {questions.map((q, qi) => (
          <div key={qi} className="border p-4 rounded-lg">
            <input
              className="w-full border p-2 rounded mb-3"
              placeholder={`Question ${qi + 1}`}
              value={q.question}
              onChange={(e) =>
                updateQuestion(qi, "question", e.target.value)
              }
              required
            />

            {q.options.map((opt, oi) => (
              <input
                key={oi}
                className="w-full border p-2 rounded mb-2"
                placeholder={`Option ${oi + 1}`}
                value={opt}
                onChange={(e) =>
                  updateOption(qi, oi, e.target.value)
                }
                required
              />
            ))}

            <input
              className="w-full border p-2 rounded"
              placeholder="Correct answer"
              value={q.answer}
              onChange={(e) =>
                updateQuestion(qi, "answer", e.target.value)
              }
              required
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          + Add Question
        </button>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-lg"
        >
          Create Quiz
        </button>
      </form>
    </div>
  );
}
