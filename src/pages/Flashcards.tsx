import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyFlashcards, deleteFlashcard } from "../services/flashcards";

// --- Icons ---
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
  </svg>
);

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

const TagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
  </svg>
);

const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

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
              <PlusIcon /> Create New
            </Link>
            
            <Link
              to={`/flashcards/study${selectedTopic ? `?topic=${selectedTopic}` : ""}`}
              className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition shadow-lg shadow-gray-200"
            >
              <PlayIcon /> Study Mode
            </Link>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-8 flex items-center gap-4">
          <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <TagIcon />
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
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
             </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
            <FlashcardSkeleton />
        ) : cards.length === 0 ? (
            <div className="text-center py-20 bg-white border border-dashed border-gray-300 rounded-2xl">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-3xl mb-4">
                    🗂️
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
                                <TrashIcon /> 
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
              <ChevronLeft />
            </button>

            <span className="px-4 py-2 bg-white border rounded-lg text-sm font-medium text-gray-700 shadow-sm">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => fetchCards(page + 1, selectedTopic || undefined)}
              disabled={page === totalPages}
              className="p-2 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}