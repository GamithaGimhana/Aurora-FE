import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyFlashcards, deleteFlashcard } from "../../services/flashcards";

interface Flashcard {
  _id: string;
  question: string;
  answer: string;
  topic: string;
}

export default function Flashcards() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCards = async ( pageNumber = 1, topic?: string ) => {
    try {
      const res = await getMyFlashcards({
        page: pageNumber,
        limit: 6,
        topic,
      });

      const list: Flashcard[] = res.data ?? [];

      setCards(list);
      setTotalPages(res.totalPages ?? 1);
      setPage(pageNumber);

      const uniqueTopics: string[] = Array.from(
        new Set(list.map((c) => c.topic))
      );
      setTopics(uniqueTopics);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this flashcard?")) return;
    await deleteFlashcard(id);
    fetchCards(page, selectedTopic || undefined);
  };

  const handleTopicChange = (value: string) => {
    setSelectedTopic(value);
    fetchCards(1, value || undefined);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
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

      {/* Filters */}
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

      {/* Grid */}
      {cards.length === 0 ? (
        <p>No flashcards found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c) => (
            <div
              key={c._id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="font-semibold mb-2">{c.question}</h3>
              <p className="text-sm text-gray-500">Topic: {c.topic}</p>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleDelete(c._id)}
                  className="text-red-600 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-10">
          <button
            disabled={page === 1}
            onClick={() => fetchCards(page - 1, selectedTopic || undefined)}
            className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
          >
            Prev
          </button>

          <span className="px-4 py-2">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => fetchCards(page + 1, selectedTopic || undefined)}
            className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
