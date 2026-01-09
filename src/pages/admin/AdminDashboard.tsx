import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchAdminStatsThunk } from "../../store/adminStats/adminStatsThunks";
import { 
  Users, 
  FileText, 
  Box, 
  Presentation, 
  Activity, 
  ChevronRight 
} from "lucide-react";

/* ---------- Components ---------- */

const AdminStatCard = ({ label, value, icon: Icon, colorTheme }: any) => {
  const themeClasses: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600 ring-blue-100",
    indigo: "bg-indigo-50 text-indigo-600 ring-indigo-100",
    purple: "bg-purple-50 text-purple-600 ring-purple-100",
    orange: "bg-orange-50 text-orange-600 ring-orange-100",
  };

  const style = themeClasses[colorTheme] || themeClasses.blue;

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow group">
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
        <h3 className="text-3xl font-extrabold text-gray-900">{value}</h3>
      </div>
      <div className={`p-4 rounded-xl ring-1 ${style} group-hover:scale-110 transition-transform`}>
        {/* Lucide icons default to 24px (w-6 h-6). We set strokeWidth to 1.5 to match your original thin style */}
        <Icon size={24} strokeWidth={1.5} />
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const dispatch = useAppDispatch();
  const { stats, loading, error } = useAppSelector(
    (state) => state.adminStats
  );

  useEffect(() => {
    dispatch(fetchAdminStatsThunk());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 pb-20">

      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-5 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Admin Command Center
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Real-time overview of the Aurora platform.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full animate-pulse">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-xs font-bold text-green-700 uppercase tracking-wide">
              System Operational
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">

        {/* Stats Grid */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="w-6 h-6 text-gray-500" /> Platform Metrics
          </h2>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-32 bg-white border border-gray-100 rounded-2xl animate-pulse shadow-sm"
                />
              ))}
            </div>
          ) : stats ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AdminStatCard label="Total Users" value={stats.users} icon={Users} colorTheme="blue" />
              <AdminStatCard label="Study Notes" value={stats.notes} icon={FileText} colorTheme="indigo" />
              <AdminStatCard label="Quizzes Created" value={stats.quizzes} icon={Box} colorTheme="purple" />
              <AdminStatCard label="Active Rooms" value={stats.rooms} icon={Presentation} colorTheme="orange" />
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-gray-300 text-gray-500">
              {error || "Failed to load statistics."}
            </div>
          )}
        </section>

        {/* Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Administration</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                to="/admin/users"
                className="group block bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-slate-100 rounded-xl group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <Users size={24} strokeWidth={1.5} />
                  </div>
                  <ChevronRight size={16} />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">User Management</h3>
                <p className="text-sm text-gray-500">
                  View, edit, promote, or remove users and manage role-based access control.
                </p>
              </Link>

              <div className="group block bg-white border border-gray-200 rounded-2xl p-6 shadow-sm opacity-60 cursor-not-allowed">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-gray-100 rounded-xl text-gray-400">
                    <Box size={24} strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Content Moderation</h3>
                <p className="text-sm text-gray-500">
                  Manage reported quizzes and flagged study notes. (Coming Soon)
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}