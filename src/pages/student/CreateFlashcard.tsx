import { useState } from "react";
import { createFlashcard } from "../../services/flashcards";
import { useNavigate } from "react-router-dom";

export default function FlashcardsCreate() {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (e: any) => {
    e.preventDefault();

    if (!front.trim() || !back.trim() || !topic.trim()) {
      alert("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const res = await createFlashcard({ front, back, topic });
      // success — backend response available in res
      alert(res.message || "Flashcard created!");
      navigate("/student/flashcards");
    } catch (err: any) {
      // show better error info
      console.error("Create flashcard error:", err);

      // axios error shape
      const serverMsg =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        "Failed to create flashcard";

      alert(`Error: ${serverMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow mt-6">
      <h1 className="text-2xl font-bold mb-4">Create Flashcard</h1>

      <form onSubmit={handleCreate}>
        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          disabled={loading}
        />

        <textarea
          className="w-full border p-3 rounded mb-4"
          placeholder="Front (Question)"
          value={front}
          onChange={(e) => setFront(e.target.value)}
          disabled={loading}
        />

        <textarea
          className="w-full border p-3 rounded mb-4"
          placeholder="Back (Answer)"
          value={back}
          onChange={(e) => setBack(e.target.value)}
          disabled={loading}
        />

        <button
          className="bg-purple-600 text-white py-2 rounded-lg w-full disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Flashcard"}
        </button>
      </form>
    </div>
  );
}
