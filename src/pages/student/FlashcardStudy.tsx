import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getMyFlashcards } from "../../services/flashcards";

interface Flashcard {
  _id: string;
  question: string;
  answer: string;
  topic: string;
}

export default function FlashcardStudy() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const topic = params.get("topic");

  const [cards, setCards] = useState<Flashcard[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getMyFlashcards(topic || undefined);
        setCards(res.data || []);
      } catch {
        alert("Failed to load flashcards");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [topic]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (cards.length === 0) {
    return (
      <div className="text-center mt-10">
        <p>No flashcards to study.</p>
        <button
          className="mt-4 px-4 py-2 bg-gray-600 text-white rounded"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  const card = cards[index];

  const next = () => {
    setFlipped(false);
    setIndex((i) => (i + 1) % cards.length);
  };

  const prev = () => {
    setFlipped(false);
    setIndex((i) => (i - 1 + cards.length) % cards.length);
  };

  const shuffle = () => {
    setFlipped(false);
    setCards([...cards].sort(() => Math.random() - 0.5));
    setIndex(0);
  };

  return (
    <div className="max-w-xl mx-auto mt-10">

      {/* Progress */}
      <div className="text-center text-sm text-gray-500 mb-4">
        {index + 1} / {cards.length} • Topic: {card.topic}
      </div>

      {/* Card */}
      <div
        className="h-64 cursor-pointer"
        style={{ perspective: 1000 }}
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 ${
            flipped ? "rotate-y-180" : ""
          }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* FRONT */}
          <div
            className="absolute inset-0 bg-white rounded-xl shadow-xl p-6 flex items-center justify-center text-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            <h2 className="text-xl font-semibold">{card.question}</h2>
          </div>

          {/* BACK */}
          <div
            className="absolute inset-0 bg-indigo-600 text-white rounded-xl shadow-xl p-6 flex items-center justify-center text-center"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
            }}
          >
            <p className="text-lg">{card.answer}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prev}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          ◀ Prev
        </button>

        <button
          onClick={shuffle}
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Shuffle
        </button>

        <button
          onClick={next}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Next ▶
        </button>
      </div>

      {/* Exit */}
      <div className="text-center mt-6">
        <button
          onClick={() => navigate("/student/flashcards")}
          className="text-red-600 font-medium"
        >
          Exit Study Mode
        </button>
      </div>
    </div>
  );
}
