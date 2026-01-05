import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchAdminStatsThunk } from "../../store/adminStats/adminStatsThunks";

/* ---------- Icons ---------- */

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>
);

const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const CubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
  </svg>
);

const PresentationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
  </svg>
);

const ActivityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

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
        <Icon />
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
            <ActivityIcon /> Platform Metrics
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
              <AdminStatCard label="Total Users" value={stats.users} icon={UsersIcon} colorTheme="blue" />
              <AdminStatCard label="Study Notes" value={stats.notes} icon={DocumentIcon} colorTheme="indigo" />
              <AdminStatCard label="Quizzes Created" value={stats.quizzes} icon={CubeIcon} colorTheme="purple" />
              <AdminStatCard label="Active Rooms" value={stats.rooms} icon={PresentationIcon} colorTheme="orange" />
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
                    <UsersIcon />
                  </div>
                  <ChevronRight />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">User Management</h3>
                <p className="text-sm text-gray-500">
                  View, edit, promote, or remove users and manage role-based access control.
                </p>
              </Link>

              <div className="group block bg-white border border-gray-200 rounded-2xl p-6 shadow-sm opacity-60 cursor-not-allowed">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-gray-100 rounded-xl text-gray-400">
                    <CubeIcon />
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
