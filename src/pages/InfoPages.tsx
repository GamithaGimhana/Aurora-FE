import { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
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
  ArrowLeft,
  Menu,
  X,
  CheckCircle2,
  ExternalLink
} from "lucide-react";

// --- CONTENT DATABASE (Redesigned with Tailwind Classes) ---
const CONTENT: any = {
  product: {
    label: "Product",
    pages: {
      features: {
        title: "Platform Features",
        icon: Zap,
        content: (
          <div className="space-y-8">
            <p className="text-lg text-slate-600 leading-relaxed">
              Aurora is a complete Learning Management System designed to bridge the gap between static study notes and active recall testing.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
                {[
                    { title: "Role-Based Dashboards", desc: "Tailored workflows for Admins, Lecturers, and Students." },
                    { title: "Live Quiz Rooms", desc: "Real-time multiplayer sessions with instant leaderboards." },
                    { title: "Question Bank", desc: "Build, organize, and remix questions for any exam." },
                    { title: "Spaced Repetition", desc: "Smart flashcards that schedule reviews based on performance." },
                    { title: "Rich Notes", desc: "Markdown-supported notes with organization and search." },
                    { title: "Deep Analytics", desc: "Track attempts, accuracy, and engagement trends." }
                ].map((item, i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-indigo-200 transition-colors">
                        <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                        <p className="text-sm text-slate-600">{item.desc}</p>
                    </div>
                ))}
            </div>
          </div>
        )
      },
      pricing: {
        title: "Pricing Plans",
        icon: CreditCard,
        content: (
          <div className="grid md:grid-cols-2 gap-6 pt-4">
            {/* Free Plan */}
            <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
              <h3 className="font-bold text-xl text-slate-900">Student Basic</h3>
              <div className="my-4">
                  <span className="text-4xl font-extrabold text-slate-900">$0</span>
                  <span className="text-slate-500">/mo</span>
              </div>
              <p className="text-slate-500 text-sm mb-6">Perfect for individual learners.</p>
              <ul className="space-y-3 mb-8">
                  {["Unlimited Flashcards", "Basic Quiz Participation", "Personal Notes", "Community Access"].map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                          <CheckCircle2 size={16} className="text-green-500" /> {f}
                      </li>
                  ))}
              </ul>
              <button className="w-full py-2 rounded-lg bg-slate-100 text-slate-900 font-bold text-sm hover:bg-slate-200 transition">Current Plan</button>
            </div>

            {/* Pro Plan */}
            <div className="p-8 bg-indigo-600 rounded-2xl border border-indigo-500 shadow-xl text-white relative">
              <div className="absolute top-0 right-0 bg-indigo-500 px-3 py-1 rounded-bl-xl text-xs font-bold uppercase tracking-wider">Popular</div>
              <h3 className="font-bold text-xl">Lecturer Pro</h3>
              <div className="my-4">
                  <span className="text-4xl font-extrabold">$12</span>
                  <span className="text-indigo-200">/mo</span>
              </div>
              <p className="text-indigo-200 text-sm mb-6">For classrooms and creators.</p>
              <ul className="space-y-3 mb-8">
                  {["Host Live Quiz Rooms", "Advanced Analytics", "Unlimited Question Bank", "Private Classes", "Priority Support"].map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-indigo-50">
                          <CheckCircle2 size={16} className="text-indigo-300" /> {f}
                      </li>
                  ))}
              </ul>
              <button className="w-full py-2 rounded-lg bg-white text-indigo-700 font-bold text-sm hover:bg-indigo-50 transition">Upgrade Now</button>
            </div>
          </div>
        )
      },
      updates: {
        title: "Changelog",
        icon: RefreshCw,
        content: (
          <div className="space-y-8">
            <div className="border-l-2 border-indigo-100 pl-6 relative">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-600 ring-4 ring-white"></div>
                <h3 className="text-lg font-bold text-slate-900">Aurora v2.0</h3>
                <span className="text-xs font-mono text-slate-400 mb-2 block">Released Jan 2026</span>
                <ul className="space-y-2 text-slate-600">
                    <li>🚀 <strong>Live Quiz Rooms:</strong> Real-time WebSocket connection for multiplayer quizzes.</li>
                    <li>📚 <strong>Smart Study:</strong> Added spaced-repetition algorithm to flashcards.</li>
                    <li>📱 <strong>Mobile Polish:</strong> Fully responsive dashboards for students on the go.</li>
                </ul>
            </div>
            <div className="border-l-2 border-slate-100 pl-6 relative">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-300 ring-4 ring-white"></div>
                <h3 className="text-lg font-bold text-slate-900">Aurora v1.5</h3>
                <span className="text-xs font-mono text-slate-400 mb-2 block">Released Dec 2025</span>
                <ul className="space-y-2 text-slate-600">
                    <li>Question Bank importer.</li>
                    <li>Rich text editor for notes.</li>
                </ul>
            </div>
          </div>
        )
      }
    }
  },
  resources: {
    label: "Resources",
    pages: {
      community: {
        title: "Community",
        icon: Users,
        content: (
          <div className="bg-indigo-50 rounded-2xl p-8 text-center border border-indigo-100">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600 shadow-sm">
                <Users size={32} />
            </div>
            <h3 className="text-xl font-bold text-indigo-900 mb-2">Join the Conversation</h3>
            <p className="text-indigo-700 mb-6 max-w-md mx-auto">
                Connect with thousands of students and educators sharing decks, quiz ideas, and study tips.
            </p>
            <div className="flex justify-center gap-4">
                <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">Discord Server</button>
                <button className="px-6 py-2 bg-white text-indigo-600 border border-indigo-200 rounded-lg font-medium hover:bg-indigo-50 transition">Forum</button>
            </div>
          </div>
        )
      },
      help: {
        title: "Help Center",
        icon: HelpCircle,
        content: (
          <div className="grid sm:grid-cols-2 gap-4">
             <a href="mailto:support@auroralms.io" className="block p-6 rounded-xl border border-slate-200 hover:border-indigo-200 hover:bg-slate-50 transition group">
                <h4 className="font-bold text-slate-900 mb-1 group-hover:text-indigo-600">Email Support</h4>
                <p className="text-sm text-slate-500">Get a response within 24 hours.</p>
                <span className="text-xs text-indigo-600 font-medium mt-4 inline-block">support@auroralms.io</span>
             </a>
             <div className="block p-6 rounded-xl border border-slate-200 hover:border-indigo-200 hover:bg-slate-50 transition group">
                <h4 className="font-bold text-slate-900 mb-1 group-hover:text-indigo-600">System Status</h4>
                <p className="text-sm text-slate-500">Check if API is online.</p>
                <div className="flex items-center gap-2 mt-4">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-xs font-medium text-slate-700">All Systems Operational</span>
                </div>
             </div>
          </div>
        )
      },
      guides: {
        title: "User Guides",
        icon: BookOpen,
        content: (
          <div className="space-y-4">
             {["Getting Started for Students", "Lecturer: Hosting a Live Quiz", "Creating Effective Flashcards", "Admin Console Basics"].map((guide, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:shadow-md hover:border-indigo-100 transition cursor-pointer group">
                     <div className="flex items-center gap-3">
                         <div className="p-2 bg-slate-100 text-slate-500 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition">
                             <BookOpen size={18} />
                         </div>
                         <span className="font-medium text-slate-700 group-hover:text-slate-900">{guide}</span>
                     </div>
                     <ExternalLink size={16} className="text-slate-300 group-hover:text-indigo-400" />
                 </div>
             ))}
          </div>
        )
      }
    }
  },
  legal: {
    label: "Legal",
    pages: {
      privacy: {
        title: "Privacy Policy",
        icon: Lock,
        content: (
          <div className="prose text-slate-600">
            <p>At Aurora, we take your privacy seriously. We collect only the data necessary to provide our educational services.</p>
            <h4>Data Collection</h4>
            <p>We store email addresses for authentication and study progress (quiz scores, flashcard history) to sync across devices.</p>
            <h4>Third Parties</h4>
            <p>We do not sell data to advertisers. Student data is encrypted at rest.</p>
          </div>
        )
      },
      terms: {
        title: "Terms of Service",
        icon: FileText,
        content: (
          <div className="prose text-slate-600">
            <p>By accessing Aurora, you agree to use the platform for educational purposes only.</p>
            <ul>
                <li>Do not attempt to exploit quiz logic.</li>
                <li>Respect intellectual property in shared decks.</li>
                <li>Accounts found violating academic integrity will be suspended.</li>
            </ul>
          </div>
        )
      },
      security: {
        title: "Security",
        icon: Shield,
        content: (
          <div className="bg-slate-900 text-slate-300 p-6 rounded-xl font-mono text-sm leading-relaxed">
            <p className="mb-4 text-green-400">$ status --security</p>
            <p>
                Protocol: <span className="text-white">HTTPS (TLS 1.3)</span><br/>
                Auth: <span className="text-white">JWT (RS256)</span><br/>
                Database: <span className="text-white">MongoDB Atlas (Encrypted)</span><br/>
                Hashing: <span className="text-white">Bcrypt (Salt 10)</span>
            </p>
            <p className="mt-4 text-slate-500">// All sensitive endpoints require Bearer tokens.</p>
          </div>
        )
      }
    }
  }
};

export default function InfoPages() {
  const { category, page } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto-redirect logic
  useEffect(() => {
    if (!category || !CONTENT[category]) {
      navigate("/info/product/features", { replace: true });
    } else if (!page || !CONTENT[category].pages[page]) {
      const firstPage = Object.keys(CONTENT[category].pages)[0];
      navigate(`/info/${category}/${firstPage}`, { replace: true });
    }
    // Close mobile menu on nav change
    setMobileMenuOpen(false);
  }, [category, page, navigate, location]);

  const activeCategory = CONTENT[category || "product"];
  const activePage = activeCategory?.pages[page || "features"];

  if (!activeCategory || !activePage) return null;

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row font-sans text-gray-900">
      
      {/* --- MOBILE HEADER --- */}
      <div className="md:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-lg flex items-center gap-2">
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">A</div>
            Aurora
        </Link>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 -mr-2 text-gray-600">
            {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* --- SIDEBAR NAVIGATION --- */}
      <aside className={`
        fixed md:sticky top-[73px] md:top-0 left-0 w-full md:w-72 h-[calc(100vh-73px)] md:h-screen 
        bg-slate-50 border-r border-gray-200 overflow-y-auto transition-transform duration-300 z-40
        ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="p-6 md:p-8">
          <Link to="/" className="hidden md:inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-black uppercase tracking-wider mb-8 transition-colors">
            <ArrowLeft size={14} /> Back Home
          </Link>
          
          <div className="hidden md:flex font-bold text-2xl items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">A</div>
            Aurora Docs
          </div>

          <nav className="space-y-8">
            {Object.entries(CONTENT).map(([catKey, catData]: any) => (
              <div key={catKey}>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-3">
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
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                          isActive 
                            ? "bg-white text-indigo-600 shadow-sm ring-1 ring-gray-200 translate-x-1" 
                            : "text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm"
                        }`}
                      >
                        <PageIcon size={18} className={isActive ? "text-indigo-600" : "text-slate-400"} />
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
      <main className="flex-1 min-w-0 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mb-6">
             <span className="hover:text-black transition-colors cursor-pointer">{activeCategory.label}</span>
             <span className="text-slate-300">/</span>
             <span className="text-indigo-600">{activePage.title}</span>
          </div>

          {/* Page Header */}
          <div className="mb-10 pb-8 border-b border-gray-100 flex items-start gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl hidden sm:block">
                {(() => {
                    const Icon = activePage.icon;
                    return <Icon size={32} />;
                })()}
            </div>
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-2">
                {activePage.title}
                </h1>
                <p className="text-lg text-slate-500">
                    Everything you need to know about {activePage.title.toLowerCase()}.
                </p>
            </div>
          </div>
          
          {/* Content Body */}
          <div className="animate-fadeIn">
            {activePage.content}
          </div>

          {/* Footer Navigation (Next/Prev could go here) */}
          <div className="mt-20 pt-8 border-t border-gray-100 text-center">
             <p className="text-slate-400 text-sm">
                Need more help? <a href="mailto:support@aurora.io" className="text-indigo-600 hover:underline">Contact Support</a>
             </p>
          </div>

        </div>
      </main>
    </div>
  );
}