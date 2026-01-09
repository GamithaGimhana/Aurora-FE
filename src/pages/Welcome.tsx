import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Sparkles, 
  Layers, 
  LayoutTemplate, 
  TrendingUp, 
  Twitter, 
  Linkedin, 
  Instagram 
} from "lucide-react";

// ------------------- SUB-COMPONENTS -------------------

function FeatureCard({
  title,
  description,
  imgSrc,
}: {
  title: string;
  description: string;
  imgSrc: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="h-48 overflow-hidden bg-gray-100 relative">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
      </div>
      <div className="p-6">
        <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

function RoleCard({
  title,
  description,
  to,
  imgSrc,
}: {
  title: string;
  description: string;
  to: string;
  imgSrc: string;
}) {
  return (
    <Link
      to={to}
      className="group relative flex flex-col md:flex-row bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-indigo-100"
    >
      <div className="md:w-2/5 h-64 md:h-auto overflow-hidden relative">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors" />
      </div>
      <div className="p-8 md:w-3/5 flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-500 mt-3">{description}</p>
        <div className="mt-6 flex items-center text-sm font-bold text-black group-hover:text-indigo-600 transition-colors group-hover:translate-x-2 transition-transform">
          Get started <ArrowRight className="ml-2 w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}

function BenefitItem({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
}) {
  return (
    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:bg-white hover:shadow-md transition-all">
      <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center mb-4 text-indigo-600 shadow-sm">
        <Icon size={20} />
      </div>
      <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-xl font-bold tracking-tight mb-4">Aurora</h4>
            <p className="text-sm text-gray-500 mb-4">
              Making learning smarter, simpler, and more connected for everyone.
            </p>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">Product</h5>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link to="/info/product/features" className="hover:text-black transition-colors">Features</Link></li>
              <li><Link to="/info/product/pricing" className="hover:text-black transition-colors">Pricing</Link></li>
              <li><Link to="/info/product/updates" className="hover:text-black transition-colors">Updates</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Resources</h5>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link to="/info/resources/community" className="hover:text-black transition-colors">Community</Link></li>
              <li><Link to="/info/resources/help" className="hover:text-black transition-colors">Help Center</Link></li>
              <li><Link to="/info/resources/guides" className="hover:text-black transition-colors">Guides</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Legal</h5>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link to="/info/legal/privacy" className="hover:text-black transition-colors">Privacy</Link></li>
              <li><Link to="/info/legal/terms" className="hover:text-black transition-colors">Terms</Link></li>
              <li><Link to="/info/legal/security" className="hover:text-black transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Aurora Education Inc.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Twitter className="w-5 h-5 hover:text-gray-900 cursor-pointer transition-colors" />
            <Linkedin className="w-5 h-5 hover:text-gray-900 cursor-pointer transition-colors" />
            <Instagram className="w-5 h-5 hover:text-gray-900 cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  );
}

// ------------------- MAIN PAGE -------------------

export default function Welcome() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* ---------------- NAV HEADER ---------------- */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="font-bold text-xl tracking-tight flex items-center gap-2">
                {/* Simple Logo Placeholder */}
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm group-hover:bg-gray-800 transition-colors">
                  A
                </div>
                Aurora
            </div>
            <div className="flex gap-4 text-sm font-medium">
                <Link to="/login" className="hover:text-gray-600 px-3 py-2">Log in</Link>
                <Link to="/register" className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">Get Started</Link>
            </div>
        </div>
      </nav>

      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-slate-50 pt-16">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          
          {/* Text Content */}
          <div className="text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 rounded-full">
              <Sparkles className="w-3 h-3" /> New: Live Quiz Rooms
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]">
              Meet Aurora. <br/>
              <span className="text-gray-400">The Future of Learning.</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
              Aurora brings notes, flashcards, and quizzes into one beautiful workspace. 
              Track your progress and master any subject.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link
                to="/register"
                className="bg-black text-white px-8 py-4 rounded-xl font-medium hover:bg-gray-800 transition shadow-lg shadow-gray-200"
              >
                Join Aurora Free
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 rounded-xl font-medium border bg-white hover:bg-gray-50 transition"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mt-16 lg:mt-0 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              <img
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Aurora Workspace"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Floating Element Decoration */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 hidden md:block">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">A+</div>
                    <div>
                        <p className="text-sm font-bold">Quiz Complete</p>
                        <p className="text-xs text-gray-500">Score: 98%</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- WHAT WE DO ---------------- */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight">
            The Aurora Ecosystem
          </h2>
          <p className="text-gray-500 mt-4">
            Everything connects. Create a note, turn it into a flashcard, and test it with a quiz.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          <FeatureCard
            title="Smart Notes"
            description="Create organized, structured notes that are easy to revise later."
            imgSrc="https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=500&q=80"
          />
          <FeatureCard
            title="Flashcards"
            description="Active recall techniques proven to improve long-term memory."
            imgSrc="https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=500&q=80"
          />
          <FeatureCard
            title="Quizzes"
            description="Build comprehensive quizzes to test deep understanding."
            imgSrc="https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=500&q=80"
          />
          <FeatureCard
            title="Live Rooms"
            description="Run real-time interactive sessions for remote learning."
            imgSrc="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=500&q=80"
          />
        </div>
      </section>

      {/* ---------------- WHO IT’S FOR ---------------- */}
      <section className="bg-slate-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <h2 className="text-3xl font-bold text-center mb-16">
            Built for Everyone
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            <RoleCard
              title="Aurora for Students"
              description="Stop passive reading. Start active learning with tools that adapt to your study habits."
              to="/register?role=student"
              imgSrc="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
            />

            <RoleCard
              title="Aurora for Lecturers"
              description="Manage your curriculum, track student progress, and host live sessions effortlessly."
              to="/register?role=lecturer"
              imgSrc="https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=800&q=80"
            />
          </div>
        </div>
      </section>

      {/* ---------------- WHY US ---------------- */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-2xl font-semibold text-center mb-12">
          Why Choose Aurora?
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <BenefitItem
            icon={Layers}
            title="All-in-One Ecosystem"
            description="No need for three separate apps. Your notes connect directly to your quizzes."
          />
          <BenefitItem
            icon={LayoutTemplate}
            title="Focus-First Design"
            description="A clean, minimalist interface designed to keep you in the flow state."
          />
          <BenefitItem
            icon={TrendingUp}
            title="Built to Scale"
            description="Perfect for solo study sessions or lecture halls with 500+ students."
          />
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="bg-black text-white relative overflow-hidden">
        {/* Abstract background element */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500 to-transparent"></div>

        <div className="max-w-4xl mx-auto px-6 py-24 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Start Learning with Aurora.
          </h2>
          <p className="text-gray-400 mt-6 text-lg max-w-xl mx-auto">
            Join thousands of students and educators using a modern platform
            designed for real retention.
          </p>

          <div className="mt-10">
            <Link
              to="/register"
              className="inline-block bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition transform hover:-translate-y-1"
            >
              Create Your Account
            </Link>
          </div>
          <p className="mt-4 text-xs text-gray-500">No credit card required.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}