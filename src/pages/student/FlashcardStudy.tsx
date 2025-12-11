import { useEffect, useState } from "react";
import { getMyFlashcards } from "../../services/flashcards";
import { useNavigate } from "react-router-dom";

interface Flashcard {
  _id: string;
  question: string;
  answer: string;
  topic: string;
}

export default function FlashcardStudy() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getMyFlashcards();
        setCards(res.data);
      } catch {
        alert("Failed to load flashcards");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const shuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setIndex(0);
    setFlipped(false);
  };

  const next = () => {
    if (index < cards.length - 1) {
      setIndex(index + 1);
      setFlipped(false);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
      setFlipped(false);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (cards.length === 0) return <div>No flashcards to study.</div>;

  const card = cards[index];

  return (
    <div className="max-w-xl mx-auto text-center py-10">
      
      <h1 className="text-3xl font-bold mb-4">Study Mode</h1>
      <p className="text-gray-500 mb-6">
        {index + 1} / {cards.length}
      </p>

      <div
        className="bg-white shadow-xl rounded-xl p-8 cursor-pointer min-h-[200px]"
        onClick={() => setFlipped(!flipped)}
      >
        {!flipped ? (
          <h2 className="text-xl font-bold">{card.question}</h2>
        ) : (
          <p className="text-lg text-indigo-600 font-medium">{card.answer}</p>
        )}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={prev}
          disabled={index === 0}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <button
          onClick={shuffle}
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Shuffle
        </button>

        <button
          onClick={next}
          disabled={index === cards.length - 1}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <button
        onClick={() => navigate("/student/flashcards")}
        className="mt-8 text-red-600 underline"
      >
        Exit Study Mode
      </button>

    </div>
  );
}
