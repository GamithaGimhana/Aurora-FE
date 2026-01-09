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
  ExternalLink,
  ChevronRight,
  Search
} from "lucide-react";

// --- CONTENT DATABASE ---
// Data preserved intact, styling classes updated for the new design system.
const CONTENT: any = {
  product: {
    label: "Product",
    pages: {
      features: {
        title: "Platform Features",
        icon: Zap,
        content: (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
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
                    <div key={i} className="group p-5 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] hover:shadow-lg hover:border-indigo-100 hover:-translate-y-0.5 transition-all duration-300">
                        <h4 className="font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{item.title}</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
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
          <div className="grid lg:grid-cols-2 gap-6 pt-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Free Plan */}
            <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow relative overflow-hidden flex flex-col">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-200 to-slate-300"></div>
              <h3 className="font-bold text-xl text-slate-900 tracking-tight">Student Basic</h3>
              <div className="my-6 flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold text-slate-900 tracking-tight">$0</span>
                  <span className="text-slate-400 font-medium">/mo</span>
              </div>
              <p className="text-slate-500 text-sm mb-8">Perfect for individual learners starting their journey.</p>
              <ul className="space-y-4 mb-8 flex-1">
                  {["Unlimited Flashcards", "Basic Quiz Participation", "Personal Notes", "Community Access"].map(f => (
                      <li key={f} className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                          <div className="p-1 rounded-full bg-green-50 text-green-600">
                            <CheckCircle2 size={14} strokeWidth={3} />
                          </div>
                          {f}
                      </li>
                  ))}
              </ul>
              <button className="w-full py-3 rounded-xl bg-slate-50 text-slate-900 font-bold text-sm hover:bg-slate-100 border border-slate-200 transition-all active:scale-[0.98]">Current Plan</button>
            </div>

            {/* Pro Plan */}
            <div className="p-8 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl shadow-indigo-900/20 text-white relative flex flex-col overflow-hidden">
               {/* Decorative gradient blob */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-600 rounded-full blur-[80px] opacity-40 pointer-events-none"></div>
              
              <div className="flex justify-between items-start relative z-10">
                <h3 className="font-bold text-xl tracking-tight">Lecturer Pro</h3>
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-500/30">Popular</span>
              </div>
              
              <div className="my-6 flex items-baseline gap-1 relative z-10">
                  <span className="text-5xl font-extrabold tracking-tight">$12</span>
                  <span className="text-slate-400 font-medium">/mo</span>
              </div>
              <p className="text-slate-400 text-sm mb-8 relative z-10">For classrooms, creators, and power users.</p>
              <ul className="space-y-4 mb-8 flex-1 relative z-10">
                  {["Host Live Quiz Rooms", "Advanced Analytics", "Unlimited Question Bank", "Private Classes", "Priority Support"].map(f => (
                      <li key={f} className="flex items-center gap-3 text-sm text-slate-200 font-medium">
                          <div className="p-1 rounded-full bg-indigo-500/20 text-indigo-400">
                            <CheckCircle2 size={14} strokeWidth={3} />
                          </div>
                          {f}
                      </li>
                  ))}
              </ul>
              <button className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-500 shadow-lg shadow-indigo-900/50 transition-all active:scale-[0.98] relative z-10">Upgrade Now</button>
            </div>
          </div>
        )
      },
      updates: {
        title: "Changelog",
        icon: RefreshCw,
        content: (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-2xl">
            <div className="relative pl-8 border-l border-indigo-100">
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-indigo-600 ring-4 ring-white shadow-sm"></div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                  <h3 className="text-lg font-bold text-slate-900">Aurora v2.0</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-indigo-50 text-indigo-600 border border-indigo-100 w-fit">Current</span>
                  <span className="text-xs text-slate-400 sm:ml-auto">Jan 2026</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                  <ul className="space-y-3 text-slate-600 text-sm">
                      <li className="flex gap-3">
                        <span className="shrink-0 pt-0.5">🚀</span>
                        <span><strong>Live Quiz Rooms:</strong> Real-time WebSocket connection for multiplayer quizzes.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="shrink-0 pt-0.5">📚</span>
                        <span><strong>Smart Study:</strong> Added spaced-repetition algorithm to flashcards.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="shrink-0 pt-0.5">📱</span>
                        <span><strong>Mobile Polish:</strong> Fully responsive dashboards for students on the go.</span>
                      </li>
                  </ul>
                </div>
            </div>
            <div className="relative pl-8 border-l border-slate-100">
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-slate-300 ring-4 ring-white"></div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                  <h3 className="text-lg font-bold text-slate-900">Aurora v1.5</h3>
                  <span className="text-xs text-slate-400 sm:ml-auto">Dec 2025</span>
                </div>
                <ul className="space-y-2 text-slate-500 text-sm pl-1">
                    <li className="flex items-center gap-2 before:w-1 before:h-1 before:rounded-full before:bg-slate-300">Question Bank importer.</li>
                    <li className="flex items-center gap-2 before:w-1 before:h-1 before:rounded-full before:bg-slate-300">Rich text editor for notes.</li>
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
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl shadow-indigo-900/20 animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-inner">
                <Users size={40} className="text-white" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">Join the Conversation</h3>
            <p className="text-indigo-100 mb-8 max-w-lg mx-auto text-lg leading-relaxed">
                Connect with thousands of students and educators sharing decks, quiz ideas, and study tips.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="px-8 py-3.5 bg-white text-indigo-700 rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-lg shadow-black/10">Join Discord</button>
                <button className="px-8 py-3.5 bg-indigo-800/50 text-white border border-white/20 rounded-xl font-bold hover:bg-indigo-800/70 transition-colors backdrop-blur-sm">Visit Forum</button>
            </div>
          </div>
        )
      },
      help: {
        title: "Help Center",
        icon: HelpCircle,
        content: (
          <div className="grid sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <a href="mailto:support@auroralms.io" className="block p-8 rounded-3xl border border-slate-100 bg-white hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-900/5 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <HelpCircle size={24} />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">Email Support</h4>
                <p className="text-slate-500 mb-6">Detailed questions and account recovery.</p>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 bg-slate-50 w-fit px-3 py-1.5 rounded-lg">
                   support@auroralms.io
                </div>
             </a>
             <div className="block p-8 rounded-3xl border border-slate-100 bg-white hover:border-green-100 hover:shadow-xl hover:shadow-green-900/5 transition-all group cursor-default">
                <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <RefreshCw size={24} />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-green-700 transition-colors">System Status</h4>
                <p className="text-slate-500 mb-6">Real-time API availability check.</p>
                <div className="flex items-center gap-2.5 bg-green-50 w-fit px-3 py-1.5 rounded-lg border border-green-100">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                    <span className="text-sm font-bold text-green-700">All Systems Operational</span>
                </div>
             </div>
          </div>
        )
      },
      guides: {
        title: "User Guides",
        icon: BookOpen,
        content: (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {[{
              title: "Getting Started for Students",
              summary: "Set up your account, join your first class, and ace your first quiz.",
              steps: [
                "Sign up with your school email and verify your profile in Settings → Profile.",
                "Join a class using the room code from your lecturer (Join Room → Enter Code).",
                "Open Flashcards to review decks; star tricky cards to revisit later.",
                "Start your first quiz from Student Dashboard → Available Quizzes and submit before the timer ends.",
                "Check Attempt Result to see accuracy, time per question, and recommended review cards."
              ],
              cta: "View Student Dashboard"
            }, {
              title: "Lecturer: Hosting a Live Quiz",
              summary: "Create a multiplayer quiz room and monitor live performance.",
              steps: [
                "Go to Lecturer Dashboard → Create Quiz and add at least 10 questions (MCQ or short answer).",
                "Create a Quiz Room, pick the quiz, and set duration + leaderboard visibility.",
                "Share the room code; students join via Join Room. Start the room when ready.",
                "Watch live stats in Room Leaderboard: accuracy, speed, and top performers update in real time.",
                "Close the room to auto-publish results and export a CSV summary if needed."
              ],
              cta: "Open Lecturer Rooms"
            }, {
              title: "Creating Effective Flashcards",
              summary: "Author flashcards that boost recall with spaced repetition.",
              steps: [
                "Use Create Flashcard to add a focused question and a concise answer (avoid multiple facts per card).",
                "Tag cards by topic and difficulty so spaced repetition can prioritize reviews.",
                "Include mnemonics or examples; keep answers short (<40 words) for quick scanning.",
                "Practice in Flashcard Study; mark cards as Hard/Good/Easy to tune the schedule.",
                "Review analytics weekly to archive mastered cards and refresh weak areas."
              ],
              cta: "Start a Study Session"
            }, {
              title: "Admin Console Basics",
              summary: "Oversee users, content, and platform health from one place.",
              steps: [
                "Open Admin Dashboard to view active users, rooms, and recent quiz traffic.",
                "In Admin Users, search or filter accounts; suspend or reset passwords when necessary.",
                "Review Question Bank uploads for policy compliance before approving new decks.",
                "Check Admin Stats to track usage trends and identify peak load windows.",
                "Export reports monthly for audits and share with security or compliance teams."
              ],
              cta: "Go to Admin Dashboard"
            }].map((guide) => (
              <div key={guide.title} className="p-6 bg-white border border-slate-100 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg hover:border-indigo-100 transition-all group">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-50 text-slate-500 rounded-xl flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors">{guide.title}</h3>
                      <p className="text-sm text-slate-500">{guide.summary}</p>
                    </div>
                  </div>
                  <ExternalLink size={18} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
                </div>
                <div className="pl-14 space-y-3 mb-6">
                  {guide.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-3 text-sm text-slate-600">
                      <span className="text-xs font-bold text-slate-300 bg-slate-50 w-5 h-5 flex items-center justify-center rounded-full shrink-0 group-hover:text-indigo-500 group-hover:bg-indigo-50 transition-colors">{idx + 1}</span>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
                <div className="pl-14">
                    <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-50 text-slate-600 text-sm font-bold group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    {guide.cta} <ChevronRight size={14} />
                    </button>
                </div>
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
          <div className="prose prose-slate max-w-none text-slate-600 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm animate-in fade-in slide-in-from-bottom-4">
            <p className="lead">At Aurora, we take your privacy seriously. We collect only the data necessary to provide our educational services.</p>
            <h4 className="text-slate-900">Data Collection</h4>
            <p>We store email addresses for authentication and study progress (quiz scores, flashcard history) to sync across devices.</p>
            <h4 className="text-slate-900">Third Parties</h4>
            <p>We do not sell data to advertisers. Student data is encrypted at rest.</p>
          </div>
        )
      },
      terms: {
        title: "Terms of Service",
        icon: FileText,
        content: (
          <div className="prose prose-slate max-w-none text-slate-600 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm animate-in fade-in slide-in-from-bottom-4">
            <p className="lead">By accessing Aurora, you agree to use the platform for educational purposes only.</p>
            <ul className="marker:text-indigo-500">
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
          <div className="bg-slate-900 text-slate-300 p-8 rounded-3xl font-mono text-sm leading-relaxed shadow-2xl shadow-slate-900/10 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex gap-2 mb-6 border-b border-slate-800 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <p className="mb-4">
                <span className="text-green-400">root@aurora:~$</span> status --security
            </p>
            <div className="pl-4 space-y-2 border-l-2 border-slate-800 ml-1">
                <p>Protocol: <span className="text-white font-bold">HTTPS (TLS 1.3)</span></p>
                <p>Auth: <span className="text-white font-bold">JWT (RS256)</span></p>
                <p>Database: <span className="text-white font-bold">MongoDB Atlas (Encrypted)</span></p>
                <p>Hashing: <span className="text-white font-bold">Bcrypt (Salt 10)</span></p>
            </div>
            <p className="mt-6 text-slate-500">// All sensitive endpoints require Bearer tokens.</p>
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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* --- MOBILE HEADER --- */}
      <div className="md:hidden sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <Link to="/" className="font-bold text-lg flex items-center gap-2 text-slate-900">
            <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-violet-600 text-white rounded-lg flex items-center justify-center font-bold text-sm shadow-md">A</div>
            Aurora
        </Link>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 -mr-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- SIDEBAR NAVIGATION --- */}
      <aside className={`
        fixed md:sticky top-[73px] md:top-0 left-0 w-full md:w-80 h-[calc(100vh-73px)] md:h-screen 
        bg-white md:bg-transparent border-r border-slate-200 md:border-none overflow-y-auto transition-transform duration-300 z-40
        ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="p-6 md:p-8 md:pr-4 h-full flex flex-col">
          {/* Desktop Logo Area */}
          <div className="hidden md:flex items-center gap-3 mb-10 pl-2">
            <Link to="/" className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-violet-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-500/20 hover:scale-105 transition-transform">
                A
            </Link>
            <div>
                <h1 className="font-bold text-xl text-slate-900 leading-none">Aurora</h1>
                <span className="text-xs text-slate-400 font-medium">Docs & Help</span>
            </div>
          </div>

          {/* Search Placeholder */}
          <div className="relative mb-8 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-indigo-500 transition-colors" size={16} />
            <input 
                type="text" 
                placeholder="Search documentation..." 
                className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
            />
          </div>

          <nav className="space-y-8 flex-1">
            {Object.entries(CONTENT).map(([catKey, catData]: any) => (
              <div key={catKey}>
                <h4 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-3 px-3">
                  {catData.label}
                </h4>
                <div className="space-y-0.5">
                  {Object.entries(catData.pages).map(([pageKey, pageData]: any) => {
                    const isActive = category === catKey && page === pageKey;
                    const PageIcon = pageData.icon;
                    return (
                      <Link
                        key={pageKey}
                        to={`/info/${catKey}/${pageKey}`}
                        className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative overflow-hidden ${
                          isActive 
                            ? "bg-white text-indigo-600 shadow-md shadow-slate-200/50 ring-1 ring-slate-200/50" 
                            : "text-slate-500 hover:text-slate-900 hover:bg-white/60"
                        }`}
                      >
                        <PageIcon 
                            size={18} 
                            className={`transition-colors duration-200 ${isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"}`} 
                        />
                        <span className="relative z-10">{pageData.title}</span>
                        {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 rounded-r-full"></div>}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Footer Link */}
          <div className="mt-8 pt-6 border-t border-slate-200/60">
             <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Application
             </Link>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 min-w-0 md:h-screen md:overflow-y-auto scroll-smooth">
        <div className="max-w-5xl mx-auto px-6 py-12 md:py-16 lg:px-12">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm font-medium mb-8 bg-white w-fit px-4 py-2 rounded-full border border-slate-200 shadow-sm">
             <span className="text-slate-400 hover:text-slate-600 transition-colors cursor-default">{activeCategory.label}</span>
             <ChevronRight size={14} className="text-slate-300" />
             <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">{activePage.title}</span>
          </nav>

          {/* Page Header */}
          <header className="mb-12">
            <div className="inline-flex p-3 bg-white border border-slate-100 rounded-2xl shadow-sm mb-6 text-indigo-600">
                {(() => {
                    const Icon = activePage.icon;
                    return <Icon size={32} strokeWidth={1.5} />;
                })()}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">
               {activePage.title}
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
                Everything you need to understand about {activePage.title.toLowerCase()} and how to use it effectively.
            </p>
          </header>
          
          {/* Content Body */}
          <div className="w-full">
            {activePage.content}
          </div>

          {/* Page Footer */}
          <footer className="mt-24 pt-10 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-400">
             <p>© 2026 Aurora Education Inc.</p>
             <div className="flex gap-6">
                <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
                <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
                <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
             </div>
          </footer>

        </div>
      </main>
    </div>
  );
}