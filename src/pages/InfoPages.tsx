import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  Shield, 
  FileText, 
  Lock, 
  Zap, 
  CreditCard, 
  RefreshCw, 
  Users, 
  HelpCircle, 
  BookOpen,
  ArrowLeft
} from "lucide-react";

// --- CONTENT DATABASE ---
// You can edit all your text here in one place
const CONTENT: any = {
  product: {
    label: "Product",
    pages: {
      features: {
        title: "Platform Features",
        icon: Zap,
        content: (
          <div className="space-y-4">
            <p className="text-lg text-gray-600">Explore the tools that make Aurora unique.</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li><strong>Smart Notes:</strong> Markdown support with auto-save.</li>
              <li><strong>Flashcards:</strong> Spaced repetition algorithms.</li>
              <li><strong>Live Rooms:</strong> <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded text-xs font-bold">NEW</span> Real-time multiplayer quizzes.</li>
            </ul>
          </div>
        )
      },
      pricing: {
        title: "Pricing Plans",
        icon: CreditCard,
        content: (
          <div className="space-y-6">
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
              <h3 className="font-bold text-xl">Free Student</h3>
              <p className="text-3xl font-bold mt-2">$0 <span className="text-sm font-normal text-gray-500">/mo</span></p>
              <p className="text-gray-500 mt-2 text-sm">Perfect for individuals.</p>
            </div>
            <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-100">
              <h3 className="font-bold text-xl text-indigo-900">Pro Lecturer</h3>
              <p className="text-3xl font-bold mt-2 text-indigo-700">$12 <span className="text-sm font-normal text-indigo-500">/mo</span></p>
              <p className="text-indigo-600 mt-2 text-sm">For classrooms and detailed analytics.</p>
            </div>
          </div>
        )
      },
      updates: {
        title: "Changelog & Updates",
        icon: RefreshCw,
        content: <p className="text-gray-600">Version 2.0 is here! We have added live quiz rooms and improved mobile support.</p>
      }
    }
  },
  resources: {
    label: "Resources",
    pages: {
      community: { title: "Community", icon: Users, content: <p className="text-gray-600">Join our Discord server to meet other students.</p> },
      help: { title: "Help Center", icon: HelpCircle, content: <p className="text-gray-600">Need assistance? Contact support@aurora.edu.</p> },
      guides: { title: "User Guides", icon: BookOpen, content: <p className="text-gray-600">Read our documentation on how to create the perfect quiz.</p> }
    }
  },
  legal: {
    label: "Legal",
    pages: {
      privacy: { title: "Privacy Policy", icon: Lock, content: <p className="text-gray-600">We respect your data. We do not sell your personal information to third parties.</p> },
      terms: { title: "Terms of Service", icon: FileText, content: <p className="text-gray-600">By using Aurora, you agree to follow our community guidelines...</p> },
      security: { title: "Security", icon: Shield, content: <p className="text-gray-600">Our servers are encrypted using AES-256 standard...</p> }
    }
  }
};

export default function InfoPages() {
  const { category, page } = useParams();
  const navigate = useNavigate();

  // Redirect to a default page if the URL is incomplete (e.g. just /info)
  useEffect(() => {
    if (!category || !CONTENT[category]) {
      navigate("/info/product/features", { replace: true });
    } else if (!page || !CONTENT[category].pages[page]) {
      const firstPage = Object.keys(CONTENT[category].pages)[0];
      navigate(`/info/${category}/${firstPage}`, { replace: true });
    }
  }, [category, page, navigate]);

  const activeCategory = CONTENT[category || "product"];
  const activePage = activeCategory?.pages[page || "features"];

  if (!activeCategory || !activePage) return null;

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row font-sans text-gray-900">
      
      {/* --- SIDEBAR NAVIGATION --- */}
      <aside className="w-full md:w-64 lg:w-72 bg-slate-50 border-r border-gray-200 flex-shrink-0 h-auto md:h-screen md:sticky md:top-0 overflow-y-auto">
        <div className="p-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-black transition-colors mb-8">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className="font-bold text-xl flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">A</div>
            Aurora Info
          </div>

          <nav className="space-y-8">
            {Object.entries(CONTENT).map(([catKey, catData]: any) => (
              <div key={catKey}>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-3">
                  {catData.label}
                </h4>
                <div className="space-y-1">
                  {Object.entries(catData.pages).map(([pageKey, pageData]: any) => {
                    const isActive = category === catKey && page === pageKey;
                    const PageIcon = pageData.icon;
                    return (
                      <Link
                        key={pageKey}
                        to={`/info/${catKey}/${pageKey}`}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          isActive 
                            ? "bg-white text-indigo-600 shadow-sm ring-1 ring-gray-200" 
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                      >
                        <PageIcon size={16} />
                        {pageData.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 min-w-0">
        <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
          <div className="mb-8 pb-8 border-b border-gray-100">
            <div className="flex items-center gap-2 text-sm text-indigo-600 font-medium mb-4">
              {activeCategory.label} <span className="text-gray-300">/</span> {activePage.title}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              {activePage.title}
            </h1>
          </div>
          
          <div className="prose prose-lg prose-indigo max-w-none text-gray-600 leading-relaxed">
            {activePage.content}
          </div>
        </div>
      </main>
    </div>
  );
}