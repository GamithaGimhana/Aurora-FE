import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

// --- Icons ---
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>
);

const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-600">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const CubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-600">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
  </svg>
);

const PresentationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-orange-600">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-600">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
  </svg>
);

// --- Components ---

const AdminStatCard = ({ label, value, icon: Icon, colorClass }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-start justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-sm font-bold text-gray-400 uppercase tracking-wide">{label}</p>
      <h3 className="text-3xl font-extrabold text-gray-900 mt-2">{value}</h3>
    </div>
    <div className={`p-3 rounded-xl bg-opacity-10 ${colorClass}`}>
      <Icon />
    </div>
  </div>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await api.get("/admin/stats");
        setStats(res.data);
      } catch (error) {
        console.error("Failed to load admin stats");
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-gray-900">
      
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 px-8 py-5 flex justify-between items-center sticky top-0 z-30">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Platform Overview</h1>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
            <ShieldCheckIcon />
            <span className="text-sm font-medium text-green-700">System Operational</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-10">
        
        {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-32 bg-gray-200 rounded-2xl animate-pulse"></div>
                ))}
            </div>
        ) : stats ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <AdminStatCard 
                    label="Total Users" 
                    value={stats.users} 
                    icon={UsersIcon} 
                    colorClass="bg-blue-500" 
                />
                <AdminStatCard 
                    label="Study Notes" 
                    value={stats.notes} 
                    icon={DocumentIcon} 
                    colorClass="bg-indigo-500" 
                />
                <AdminStatCard 
                    label="Quizzes Created" 
                    value={stats.quizzes} 
                    icon={CubeIcon} 
                    colorClass="bg-purple-500" 
                />
                <AdminStatCard 
                    label="Active Rooms" 
                    value={stats.rooms} 
                    icon={PresentationIcon} 
                    colorClass="bg-orange-500" 
                />
            </div>
        ) : (
            <div className="text-center py-10 text-gray-500">Failed to load statistics.</div>
        )}

        {/* Quick Actions Section */}
        <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Administration</h2>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex gap-4">
                    <Link to="/admin/users" className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition">
                        Manage Users
                    </Link>
                </div>
            </div>
        </section>

      </main>
    </div>
  );
}