import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getMyFlashcards } from "../services/flashcards";
import { 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  X, 
  Loader2 
} from "lucide-react";

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
        const res = await getMyFlashcards({ page: 1, limit: 100, topic: topic || undefined });
        setCards(res.data || []);
      } catch {
        alert("Failed to load flashcards");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [topic]);

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center text-gray-400 gap-2">
        <Loader2 className="animate-spin" /> Loading deck...
    </div>
  );

  if (cards.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center max-w-sm bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="text-4xl mb-4">📭</div>
          <h3 className="text-lg font-bold text-gray-900">No flashcards found</h3>
          <p className="text-gray-500 mt-2 mb-6">There are no cards in this topic to study right now.</p>
          <button
            className="w-full py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const card = cards[index];
  const progress = ((index + 1) / cards.length) * 100;

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
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 md:p-8 font-sans">

      <div className="w-full max-w-2xl space-y-8">
        
        {/* Header / Progress */}
        <div className="space-y-4">
            <div className="flex justify-between items-end text-sm font-medium text-gray-500 px-1">
                <span>Card {index + 1} of {cards.length}</span>
                <span className="uppercase tracking-wide text-xs bg-gray-200 px-2 py-1 rounded text-gray-600">
                    {card.topic}
                </span>
            </div>
            
            {/* Visual Progress Bar */}
            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-indigo-600 transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>

        {/* 3D Card Container */}
        <div
          className="relative h-80 w-full cursor-pointer group perspective-1000"
          style={{ perspective: "1000px" }}
          onClick={() => setFlipped(!flipped)}
        >
          <div
            className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
              flipped ? "rotate-y-180" : ""
            }`}
            style={{ 
                transformStyle: "preserve-3d",
                transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)"
            }}
          >
            {/* FRONT */}
            <div
              className="absolute inset-0 bg-white border border-gray-200 rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 text-center backface-hidden"
              style={{ backfaceVisibility: "hidden" }}
            >
              <span className="absolute top-6 left-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Question</span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
                {card.question}
              </h2>
              <p className="absolute bottom-6 text-xs text-gray-400 font-medium animate-pulse">
                Click to flip
              </p>
            </div>

            {/* BACK */}
            <div
              className="absolute inset-0 bg-indigo-600 rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 text-center backface-hidden"
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
              }}
            >
              <span className="absolute top-6 left-6 text-xs font-bold text-indigo-200 uppercase tracking-widest">Answer</span>
              <p className="text-xl md:text-2xl font-medium text-white leading-relaxed">
                {card.answer}
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between pt-4">
            
            {/* Navigation Group */}
            <div className="flex items-center gap-4">
                <button
                    onClick={prev}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition shadow-sm active:scale-95"
                    title="Previous Card"
                >
                    <ChevronLeft size={24} />
                </button>

                <button
                    onClick={shuffle}
                    className="flex items-center gap-2 px-5 py-3 rounded-full bg-indigo-50 text-indigo-600 font-medium hover:bg-indigo-100 transition shadow-sm active:scale-95"
                >
                    <Shuffle size={20} /> Shuffle
                </button>

                <button
                    onClick={next}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800 transition shadow-lg active:scale-95"
                    title="Next Card"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Exit Button */}
            <button
                onClick={() => navigate("/flashcards")}
                className="flex items-center gap-2 text-gray-400 hover:text-red-500 font-medium transition-colors text-sm px-4 py-2"
            >
                <X size={20} /> Quit
            </button>
        </div>

      </div>
    </div>
  );
}