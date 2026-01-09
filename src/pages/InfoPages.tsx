import { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { Toaster, toast } from "sonner"; // 1. Import Sonner
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
  ArrowRight,
  Copy
} from "lucide-react";

// --- CONTENT DATABASE ---
// We can use toast() directly inside this object since Sonner manages state globally
const CONTENT: any = {
  product: {
    label: "Product",
    pages: {
      features: {
        title: "Platform Features",
        icon: Zap,
        content: (
          <div className="space-y-8">
            <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
              Aurora is a complete Learning Management System designed to bridge the gap between static study notes and active recall testing.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
                {[
                    { title: "Role-Based Dashboards", desc: "Tailored workflows for Admins, Lecturers, and Students." },
                    { title: "Live Quiz Rooms", desc: "Real-time multiplayer sessions with instant leaderboards." },
                    { title: "Question Bank", desc: "Build, organize, and remix questions for any exam." },
                    { title: "Spaced Repetition", desc: "Smart flashcards that schedule reviews based on performance." },
                    { title: "Rich Notes", desc: "Markdown-supported notes with organization and search." },
                    { title: "Deep Analytics", desc: "Track attempts, accuracy, and engagement trends." }
                ].map((item, i) => (
                    <div key={i} className="p-6 bg-white rounded-2xl border border-gray-200 hover:border-indigo-100 hover:shadow-lg transition-all duration-300 group">
                        <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center mb-4 text-indigo-600 group-hover:scale-110 transition-transform">
                           <Zap size={20} />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                        <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
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
          <div className="grid md:grid-cols-2 gap-8 pt-4">
            {/* Free Plan */}
            <div className="p-8 bg-white rounded-3xl border border-gray-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col">
              <h3 className="font-bold text-xl text-gray-900">Student Basic</h3>
              <div className="my-6">
                  <span className="text-5xl font-bold text-gray-900 tracking-tight">$0</span>
                  <span className="text-gray-500 font-medium ml-2">/mo</span>
              </div>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">Perfect for individual learners looking to organize their study habits.</p>
              <ul className="space-y-4 mb-8 flex-1">
                  {["Unlimited Flashcards", "Basic Quiz Participation", "Personal Notes", "Community Access"].map(f => (
                      <li key={f} className="flex items-center gap-3 text-sm text-gray-700">
                          <CheckCircle2 size={18} className="text-indigo-600 shrink-0" /> {f}
                      </li>
                  ))}
              </ul>
              <button 
                onClick={() => toast.info("Active Plan", { description: "You are currently on the Student Basic plan." })}
                className="w-full py-4 rounded-xl border border-gray-200 text-gray-900 font-bold text-sm hover:bg-gray-50 transition-colors"
              >
                Current Plan
              </button>
            </div>

            {/* Pro Plan */}
            <div className="p-8 bg-gray-900 rounded-3xl border border-gray-800 shadow-2xl text-white relative flex flex-col transform md:-translate-y-4">
              <div className="absolute top-6 right-6 bg-indigo-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Popular</div>
              <h3 className="font-bold text-xl">Lecturer Pro</h3>
              <div className="my-6">
                  <span className="text-5xl font-bold tracking-tight">$12</span>
                  <span className="text-gray-400 font-medium ml-2">/mo</span>
              </div>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">For classrooms, creators, and institutions needing power.</p>
              <ul className="space-y-4 mb-8 flex-1">
                  {["Host Live Quiz Rooms", "Advanced Analytics", "Unlimited Question Bank", "Private Classes", "Priority Support"].map(f => (
                      <li key={f} className="flex items-center gap-3 text-sm text-gray-300">
                          <CheckCircle2 size={18} className="text-indigo-400 shrink-0" /> {f}
                      </li>
                  ))}
              </ul>
              <button 
                onClick={() => toast.success("Redirecting...", { description: "Taking you to the secure payment gateway." })}
                className="w-full py-4 rounded-xl bg-white text-black font-bold text-sm hover:bg-gray-100 transition-colors shadow-lg"
              >
                Upgrade Now
              </button>
            </div>
          </div>
        )
      },
      updates: {
        title: "Changelog",
        icon: RefreshCw,
        content: (
          <div className="space-y-12">
            <div className="relative pl-8 border-l border-indigo-100">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-600 ring-4 ring-white shadow-sm"></div>
                <div className="mb-2">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-600 uppercase tracking-wider mb-2">Latest</span>
                    <h3 className="text-xl font-bold text-gray-900">Aurora v2.0</h3>
                    <span className="text-sm text-gray-400 font-medium">Released Jan 2026</span>
                </div>
                <ul className="space-y-3 text-gray-600 mt-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <li className="flex gap-3"><span className="text-lg">🚀</span> <span><strong>Live Quiz Rooms:</strong> Real-time WebSocket connection for multiplayer quizzes.</span></li>
                    <li className="flex gap-3"><span className="text-lg">📚</span> <span><strong>Smart Study:</strong> Added spaced-repetition algorithm to flashcards.</span></li>
                    <li className="flex gap-3"><span className="text-lg">📱</span> <span><strong>Mobile Polish:</strong> Fully responsive dashboards for students on the go.</span></li>
                </ul>
            </div>
            <div className="relative pl-8 border-l border-gray-100">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-300 ring-4 ring-white"></div>
                <div className="mb-2">
                    <h3 className="text-xl font-bold text-gray-900">Aurora v1.5</h3>
                    <span className="text-sm text-gray-400 font-medium">Released Dec 2025</span>
                </div>
                <ul className="space-y-3 text-gray-600 mt-4">
                    <li className="flex gap-3"><CheckCircle2 size={16} className="text-gray-400 mt-1"/> Question Bank importer.</li>
                    <li className="flex gap-3"><CheckCircle2 size={16} className="text-gray-400 mt-1"/> Rich text editor for notes.</li>
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
          <div className="bg-slate-900 rounded-3xl p-10 text-center border border-gray-800 relative overflow-hidden group">
             {/* Decorative blob */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500 to-transparent"></div>
            
            <div className="relative z-10">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-inner border border-white/10">
                    <Users size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Join the Conversation</h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
                    Connect with thousands of students and educators sharing decks, quiz ideas, and study tips.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button 
                        onClick={() => toast.success("Invite Copied", { description: "Discord invite link copied to clipboard." })}
                        className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition shadow-lg shadow-indigo-900/20"
                    >
                        Discord Server
                    </button>
                    <button 
                        onClick={() => toast("External Link", { description: "Opening community forums..." })}
                        className="px-8 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-100 transition shadow-lg"
                    >
                        Forum
                    </button>
                </div>
            </div>
          </div>
        )
      },
      help: {
        title: "Help Center",
        icon: HelpCircle,
        content: (
          <div className="grid sm:grid-cols-2 gap-6">
             <div 
                onClick={() => {
                    navigator.clipboard.writeText("support@auroralms.io");
                    toast.success("Email Copied", { description: "support@auroralms.io copied to clipboard" });
                }}
                className="cursor-pointer block p-8 rounded-2xl border border-gray-200 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 group bg-white"
             >
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Zap size={24} />
                </div>
                <h4 className="font-bold text-gray-900 text-lg mb-2">Email Support</h4>
                <p className="text-sm text-gray-500 leading-relaxed">Get a response within 24 hours directly from our team.</p>
                <div className="mt-6 flex items-center text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    support@auroralms.io <Copy className="ml-2 w-4 h-4" />
                </div>
             </div>
             <div className="block p-8 rounded-2xl border border-gray-200 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 bg-white">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-6">
                    <Shield size={24} />
                </div>
                <h4 className="font-bold text-gray-900 text-lg mb-2">System Status</h4>
                <p className="text-sm text-gray-500 leading-relaxed">Real-time uptime monitoring for API and Database.</p>
                <div className="flex items-center gap-3 mt-6 bg-green-50 px-4 py-2 rounded-lg w-fit">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-green-700 uppercase tracking-wide">Operational</span>
                </div>
             </div>
          </div>
        )
      },
      guides: {
        title: "User Guides",
        icon: BookOpen,
        content: (
          <div className="space-y-6">
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
              <div key={guide.title} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="p-8">
                    <div className="flex items-start justify-between gap-4 mb-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-gray-50 text-gray-900 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <BookOpen size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">{guide.title}</h3>
                                <p className="text-sm text-gray-500 mt-1">{guide.summary}</p>
                            </div>
                        </div>
                        <ExternalLink size={18} className="text-gray-300 group-hover:text-indigo-600 transition-colors" />
                    </div>
                    
                    <div className="bg-slate-50/50 rounded-xl p-6 border border-slate-100">
                        <div className="space-y-3">
                        {guide.steps.map((step, idx) => (
                            <div key={idx} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                            <span className="text-xs text-indigo-600 font-bold bg-indigo-50 w-5 h-5 flex items-center justify-center rounded-full shrink-0 mt-0.5">{idx + 1}</span>
                            <span>{step}</span>
                            </div>
                        ))}
                        </div>
                    </div>

                    <Link to="/login" className="mt-8 flex items-center font-bold text-sm text-black group-hover:text-indigo-600 transition-colors cursor-pointer group-hover:translate-x-2 transition-transform duration-300">
                        {guide.cta} <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
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
          <div className="prose prose-gray max-w-none text-gray-600">
            <p className="text-lg leading-relaxed">At Aurora, we take your privacy seriously. We collect only the data necessary to provide our educational services.</p>
            <div className="my-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <h4 className="font-bold text-gray-900 mb-3">Data Collection</h4>
                <p>We store email addresses for authentication and study progress (quiz scores, flashcard history) to sync across devices.</p>
            </div>
            <div className="my-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <h4 className="font-bold text-gray-900 mb-3">Third Parties</h4>
                <p>We do not sell data to advertisers. Student data is encrypted at rest.</p>
            </div>
          </div>
        )
      },
      terms: {
        title: "Terms of Service",
        icon: FileText,
        content: (
          <div className="prose prose-gray max-w-none text-gray-600">
            <p className="text-lg leading-relaxed">By accessing Aurora, you agree to use the platform for educational purposes only.</p>
            <ul className="space-y-4 mt-6">
                {[
                    "Do not attempt to exploit quiz logic or leaderboard systems.",
                    "Respect intellectual property in shared decks and community resources.",
                    "Accounts found violating academic integrity will be suspended immediately."
                ].map((item, i) => (
                    <li key={i} className="flex gap-3 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                        <Shield className="w-5 h-5 text-indigo-600 shrink-0" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
          </div>
        )
      },
      security: {
        title: "Security",
        icon: Shield,
        content: (
          <div className="bg-black text-gray-300 p-8 rounded-3xl font-mono text-sm leading-relaxed shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
                <Lock size={100} />
            </div>
            <div className="relative z-10 space-y-4">
                <p className="text-green-400 font-bold flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> 
                    $ status --security
                </p>
                <div className="h-px bg-gray-800 w-full my-4"></div>
                <div className="grid grid-cols-[120px_1fr] gap-y-2">
                    <span className="text-gray-500">Protocol</span>
                    <span className="text-white">HTTPS (TLS 1.3)</span>
                    
                    <span className="text-gray-500">Auth</span>
                    <span className="text-white">JWT (RS256)</span>
                    
                    <span className="text-gray-500">Database</span>
                    <span className="text-white">MongoDB Atlas (Encrypted)</span>
                    
                    <span className="text-gray-500">Hashing</span>
                    <span className="text-white">Bcrypt (Salt 10)</span>
                </div>
                <div className="h-px bg-gray-800 w-full my-4"></div>
                <p className="text-gray-500 italic">// All sensitive endpoints require Bearer tokens.</p>
            </div>
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
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900 flex flex-col md:flex-row">
      
      {/* 2. Toaster Component */}
      <Toaster position="top-right" richColors closeButton />

      {/* --- MOBILE HEADER --- */}
      <div className="md:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-lg flex items-center gap-2 tracking-tight">
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">A</div>
            Aurora
        </Link>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 -mr-2 text-gray-600 hover:text-black transition-colors">
            {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* --- SIDEBAR NAVIGATION --- */}
      <aside className={`
        fixed md:sticky top-[73px] md:top-0 left-0 w-full md:w-80 h-[calc(100vh-73px)] md:h-screen 
        bg-white md:border-r border-gray-100 overflow-y-auto transition-transform duration-300 z-40
        ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="p-6 md:p-8 flex flex-col h-full">
          <Link to="/" className="hidden md:inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-black uppercase tracking-wider mb-8 transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back Home
          </Link>
          
          <div className="hidden md:flex font-bold text-2xl items-center gap-2 mb-10 tracking-tight text-gray-900">
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">A</div>
            Aurora Docs
          </div>

          <nav className="space-y-10 flex-1">
            {Object.entries(CONTENT).map(([catKey, catData]: any) => (
              <div key={catKey}>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-3">
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
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                          isActive 
                            ? "bg-indigo-50 text-indigo-900 shadow-sm translate-x-1" 
                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <PageIcon size={18} className={isActive ? "text-indigo-600" : "text-gray-400"} />
                        {pageData.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="mt-8 pt-8 border-t border-gray-100 hidden md:block">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs font-semibold text-gray-900 mb-1">Need live help?</p>
                <p className="text-xs text-gray-500 mb-3">Our support team is available 24/7.</p>
                <a href="mailto:support@aurora.io" className="text-xs font-bold text-indigo-600 hover:underline">Contact Support &rarr;</a>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 min-w-0 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-24">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-gray-400 font-medium mb-8">
             <span className="hover:text-black transition-colors cursor-pointer">{activeCategory.label}</span>
             <span className="text-gray-300">/</span>
             <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">{activePage.title}</span>
          </div>

          {/* Page Header */}
          <div className="mb-12 pb-8 border-b border-gray-100 flex items-start gap-6">
            <div className="p-4 bg-white border border-gray-100 shadow-lg shadow-gray-100 rounded-2xl hidden sm:flex items-center justify-center text-indigo-600">
                {(() => {
                    const Icon = activePage.icon;
                    return <Icon size={32} />;
                })()}
            </div>
            <div>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4 leading-tight">
                {activePage.title}
                </h1>
                <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
                    Everything you need to know about {activePage.title.toLowerCase()} and how to use it effectively.
                </p>
            </div>
          </div>
          
          {/* Content Body */}
          <div className="animate-fadeIn">
            {activePage.content}
          </div>

          {/* Footer Area */}
          <div className="mt-24 pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
             <p>© {new Date().getFullYear()} Aurora Education Inc.</p>
             <div className="flex gap-6 mt-4 md:mt-0">
                <span className="hover:text-gray-900 cursor-pointer transition-colors">Privacy</span>
                <span className="hover:text-gray-900 cursor-pointer transition-colors">Terms</span>
                <span className="hover:text-gray-900 cursor-pointer transition-colors">Status</span>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}