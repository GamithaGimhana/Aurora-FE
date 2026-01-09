import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "sonner"; // 1. Import toast
import { Search, CheckCircle, PlusCircle } from "lucide-react";

interface Question {
  _id: string;
  question: string;
  topic: string;
}

export default function QuestionBank({
  selected,
  setSelected,
}: {
  selected: string[];
  setSelected: (ids: string[]) => void;
}) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/questions/me");
        setQuestions(res.data.data || []);
      } catch (err) {
        // 2. Replace console.error with user-facing toast
        toast.error("Library Error", { 
            description: "Failed to load your question bank." 
        });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const toggle = (id: string) => {
    setSelected(
      selected.includes(id)
        ? selected.filter((q) => q !== id)
        : [...selected, id]
    );
  };

  const filteredQuestions = questions.filter(
    (q) =>
      q.question.toLowerCase().includes(search.toLowerCase()) ||
      q.topic?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-gray-50 rounded-xl animate-pulse border border-gray-100"></div>
        ))}
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
        <p className="text-gray-500">Your question bank is empty.</p>
        <p className="text-sm text-gray-400">Create generic questions in the Question Bank first.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between gap-4 mb-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search your library..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-2 rounded-lg whitespace-nowrap">
          {selected.length} Selected
        </div>
      </div>

      {/* List */}
      <div className="max-h-[400px] overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        {filteredQuestions.length === 0 ? (
          <p className="text-center text-gray-400 py-4">No matching questions found.</p>
        ) : (
          filteredQuestions.map((q) => {
            const isSelected = selected.includes(q._id);
            return (
              <div
                key={q._id}
                onClick={() => toggle(q._id)}
                className={`group cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 flex items-start gap-4 ${
                  isSelected
                    ? "border-indigo-500 bg-indigo-50/30"
                    : "border-gray-100 bg-white hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                {/* Checkbox Visual */}
                <div className="shrink-0 mt-0.5">
                  {isSelected ? (
                    <CheckCircle className="w-6 h-6 text-indigo-600" strokeWidth={2} />
                  ) : (
                    <PlusCircle className="w-6 h-6 text-gray-300 group-hover:text-gray-400 transition-colors" strokeWidth={1.5} />
                  )}
                </div>

                <div className="flex-1">
                  <p className={`font-medium text-sm leading-relaxed ${isSelected ? "text-indigo-900" : "text-gray-700"}`}>
                    {q.question}
                  </p>
                  {q.topic && (
                    <span className={`inline-block mt-2 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                        isSelected ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                    }`}>
                      {q.topic}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}