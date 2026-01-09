import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyFlashcards, deleteFlashcard } from "../services/flashcards";
import { 
  Plus, 
  Play, 
  Trash2, 
  Tag, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  FolderOpen
} from "lucide-react";

// --- Skeleton Component ---
function FlashcardSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 h-48 flex flex-col justify-between animate-pulse">
          <div className="h-6 w-24 bg-slate-100 rounded-full"></div>
          <div className="space-y-3">
             <div className="h-4 w-full bg-slate-100 rounded"></div>
             <div className="h-4 w-2/3 bg-slate-100 rounded"></div>
          </div>
          <div className="flex justify-end">
             <div className="h-8 w-8 bg-slate-100 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

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

  const fetchCards = async (pageNumber = 1, topic?: string) => {
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

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Flashcards</h1>
            <p className="text-gray-500 mt-1">Review and manage your decks.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/flashcards/create"
              className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
            >
              <Plus size={18} strokeWidth={2.5} /> Create New
            </Link>
            
            <Link
              to={`/flashcards/study${selectedTopic ? `?topic=${selectedTopic}` : ""}`}
              className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition shadow-lg shadow-gray-200"
            >
              <Play size={18} fill="currentColor" /> Study Mode
            </Link>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-8 flex items-center gap-4">
          <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Tag size={16} />
             </div>
             <select
                value={selectedTopic}
                onChange={(e) => handleTopicChange(e.target.value)}
                className="pl-9 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-black focus:border-transparent outline-none appearance-none cursor-pointer shadow-sm min-w-[200px]"
             >
                <option value="">All Topics</option>
                {topics.map((t) => (
                    <option key={t} value={t}>{t}</option>
                ))}
             </select>
             <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                <ChevronDown size={16} />
             </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
            <FlashcardSkeleton />
        ) : cards.length === 0 ? (
            <div className="text-center py-20 bg-white border border-dashed border-gray-300 rounded-2xl">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-3xl mb-4 text-slate-400">
                    <FolderOpen size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">No flashcards found</h3>
                <p className="text-gray-500 mt-2">Try changing your filters or create a new card.</p>
            </div>
        ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((c) => (
                    <div
                        key={c._id}
                        className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-gray-300 transition-all duration-300 flex flex-col justify-between min-h-[200px]"
                    >
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                                    {c.topic}
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 leading-relaxed">
                                {c.question}
                            </h3>
                            <div className="mt-2 w-12 h-1 bg-gray-100 rounded-full"></div>
                        </div>

                        <div className="flex justify-end pt-4 border-t border-gray-50 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => handleDelete(c._id)}
                                className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
                            >
                                <Trash2 size={18} /> 
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={() => fetchCards(page - 1, selectedTopic || undefined)}
              disabled={page === 1}
              className="p-2 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft size={20} />
            </button>

            <span className="px-4 py-2 bg-white border rounded-lg text-sm font-medium text-gray-700 shadow-sm">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => fetchCards(page + 1, selectedTopic || undefined)}
              disabled={page === totalPages}
              className="p-2 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}