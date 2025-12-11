import { useEffect, useState } from "react";
import { getMyFlashcards, deleteFlashcard } from "../../services/flashcards";
import { Link } from "react-router-dom";

interface Flashcard {
  _id: string;
  question: string;
  answer: string;
  topic: string;
}

export default function Flashcards() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState("");

  const load = async (topic?: string) => {
    try {
      const res = await getMyFlashcards(topic);
      const list: Flashcard[] = res.data;

      setCards(list);

      const uniqueTopics = [...new Set(list.map((c) => c.topic))] as string[];
      setTopics(uniqueTopics);

    } catch (err) {
      console.error(err);
      alert("Failed to load flashcards");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this flashcard?")) return;

    try {
      await deleteFlashcard(id);
      load(selectedTopic);
    } catch {
      alert("Failed to delete flashcard");
    }
  };

  const handleTopicChange = (value: string) => {
    setSelectedTopic(value);
    load(value || undefined);
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Flashcards</h1>

        <div className="flex gap-3">
          <Link
            to={`/student/flashcards/study${selectedTopic ? `?topic=${selectedTopic}` : ""}`}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Study Mode
          </Link>

          <Link
            to="/student/flashcards/create"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg"
          >
            + Create
          </Link>
        </div>
      </div>

      {/* Topic Filter */}
      <div className="mb-6">
        <select
          value={selectedTopic}
          onChange={(e) => handleTopicChange(e.target.value)}
          className="border p-2 rounded w-60"
        >
          <option value="">All Topics</option>
          {topics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Flashcard List */}
      {cards.length === 0 ? (
        <p>No flashcards found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((c) => {
            const isFlipped = flippedCard === c._id;

            return (
              <div key={c._id} className="relative h-48">
                <div
                  className="w-full h-full rounded-xl shadow-xl cursor-pointer"
                  style={{
                    perspective: 1000,
                  }}
                  onClick={() => setFlippedCard(isFlipped ? null : c._id)}
                >
                  <div
                    className={`relative w-full h-full transition-transform duration-500 transform ${
                      isFlipped ? "rotate-y-180" : ""
                    }`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* FRONT */}
                    <div
                      className="absolute inset-0 bg-white border rounded-xl p-4"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <h3 className="text-lg font-semibold">{c.question}</h3>
                      <p className="text-sm text-gray-500 mt-2">
                        Topic: {c.topic}
                      </p>
                    </div>

                    {/* BACK */}
                    <div
                      className="absolute inset-0 bg-indigo-600 text-white rounded-xl p-4 flex flex-col justify-center items-center"
                      style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
                    >
                      <h3 className="text-lg font-semibold">Answer</h3>
                      <p className="mt-2">{c.answer}</p>
                    </div>
                  </div>
                </div>

                {/* Delete */}
                <div className="flex justify-end mt-2">
                  <button
                    className="text-red-600 font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(c._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
