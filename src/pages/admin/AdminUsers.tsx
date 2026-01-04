import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchAdminUsersThunk,
  updateUserRoleThunk,
  deleteUserThunk,
} from "../../store/adminUsers/adminUsersThunks";
import type { Role } from "../../store/auth/authTypes";

// --- Icons ---
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-600">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
);

const ShieldCheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-600">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
    </svg>
);

const AcademicCapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.499 5.221 69.17 69.17 0 00-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5z" />
    </svg>
);

// --- Component ---

export default function AdminUsers() {
  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector((state) => state.adminUsers);
  
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState<"ALL" | "STUDENT" | "LECTURER" | "ADMIN">("ALL");

  useEffect(() => {
    dispatch(fetchAdminUsersThunk());
  }, [dispatch]);

  const changeRole = (id: string, role: Role) => {
    // Optimistic UI could be implemented here, but standard dispatch for now
    dispatch(updateUserRoleThunk({ userId: id, role: [role] }));
  };

  const deleteUser = (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this user?")) return;
    dispatch(deleteUserThunk(id));
  };

  // Stats Calculation
  const stats = useMemo(() => {
    return {
        total: users.length,
        admins: users.filter(u => u.role.includes("ADMIN")).length,
        lecturers: users.filter(u => u.role.includes("LECTURER")).length,
        students: users.filter(u => u.role.includes("STUDENT")).length,
    };
  }, [users]);

  // Filtering Logic
  const filteredUsers = users.filter(u => {
    const matchesSearch = u.email.toLowerCase().includes(search.toLowerCase()) ||
                          u.role.some(r => r.toLowerCase().includes(search.toLowerCase()));
    const matchesRole = filterRole === "ALL" || u.role.includes(filterRole);
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex items-center gap-4">
            <Link 
                to="/admin/dashboard"
                className="p-2 -ml-2 hover:bg-white bg-white/50 border border-transparent hover:border-gray-200 rounded-full transition-all text-gray-500 shadow-sm"
            >
                <ChevronLeft />
            </Link>
            <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">User Management</h1>
                <p className="text-gray-500 text-sm mt-1">Oversee platform users, manage permissions, and track engagement.</p>
            </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-indigo-50 rounded-xl"><UsersIcon /></div>
                <div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-xl"><AcademicCapIcon /></div>
                <div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Lecturers</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.lecturers}</p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-purple-50 rounded-xl"><ShieldCheckIcon /></div>
                <div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Admins</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.admins}</p>
                </div>
            </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            
            {/* Toolbar: Search & Filter Tabs */}
            <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/30">
                {/* Tabs */}
                <div className="flex p-1 bg-gray-100/80 rounded-xl gap-1 overflow-x-auto">
                    {(["ALL", "LECTURER", "STUDENT", "ADMIN"] as const).map((role) => (
                        <button
                            key={role}
                            onClick={() => setFilterRole(role)}
                            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all capitalize ${
                                filterRole === role 
                                ? "bg-white text-black shadow-sm" 
                                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                            }`}
                        >
                            {role.toLowerCase()}s
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative w-full md:w-72">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search by email..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm transition-shadow"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-400 font-semibold">
                            <th className="px-6 py-4">User Identity</th>
                            <th className="px-6 py-4">Access Level</th>
                            <th className="px-6 py-4">Created</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            [1, 2, 3, 4].map(i => (
                                <tr key={i}>
                                    <td className="px-6 py-4"><div className="flex gap-3"><div className="h-10 w-10 bg-gray-100 rounded-full animate-pulse"></div><div className="space-y-2"><div className="h-4 bg-gray-100 rounded w-32 animate-pulse"></div><div className="h-3 bg-gray-100 rounded w-20 animate-pulse"></div></div></div></td>
                                    <td className="px-6 py-4"><div className="h-6 bg-gray-100 rounded w-24 animate-pulse"></div></td>
                                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-24 animate-pulse"></div></td>
                                    <td className="px-6 py-4"></td>
                                </tr>
                            ))
                        ) : filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-16 text-center">
                                    <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3 text-2xl">
                                        🔍
                                    </div>
                                    <p className="text-gray-900 font-medium">No users found</p>
                                    <p className="text-gray-500 text-sm mt-1">Try adjusting your filters or search terms.</p>
                                </td>
                            </tr>
                        ) : (
                            filteredUsers.map((u) => {
                                const initial = u.email[0].toUpperCase();
                                const isAdmin = u.role.includes("ADMIN");
                                const isLecturer = u.role.includes("LECTURER");
                                
                                // Dynamic background for avatars based on email length (pseudo-random)
                                const colors = ["bg-red-100 text-red-600", "bg-blue-100 text-blue-600", "bg-green-100 text-green-600", "bg-yellow-100 text-yellow-600", "bg-purple-100 text-purple-600", "bg-pink-100 text-pink-600"];
                                const avatarColor = colors[u.email.length % colors.length];

                                return (
                                    <tr key={u._id} className="hover:bg-gray-50/80 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border border-black/5 shadow-sm ${avatarColor}`}>
                                                    {initial}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900 text-sm">{u.email}</p>
                                                    <p className="text-xs text-gray-400 font-mono mt-0.5">ID: {u._id.slice(-6).toUpperCase()}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="relative inline-block">
                                                <select
                                                    value={u.role[0]}
                                                    onChange={(e) => changeRole(u._id, e.target.value as Role)}
                                                    disabled={isAdmin}
                                                    className={`appearance-none pl-3 pr-8 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all border-0 shadow-sm ${
                                                        isAdmin 
                                                        ? 'bg-purple-100 text-purple-700 ring-1 ring-purple-200 cursor-not-allowed opacity-80' 
                                                        : isLecturer 
                                                        ? 'bg-blue-100 text-blue-700 ring-1 ring-blue-200 hover:bg-blue-200 focus:ring-blue-500' 
                                                        : 'bg-green-100 text-green-700 ring-1 ring-green-200 hover:bg-green-200 focus:ring-green-500'
                                                    }`}
                                                >
                                                    <option value="STUDENT">Student</option>
                                                    <option value="LECTURER">Lecturer</option>
                                                    {isAdmin && <option value="ADMIN">Admin</option>}
                                                </select>
                                                {/* Custom Arrow for select */}
                                                {!isAdmin && (
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                                        <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {/* Assuming createdAt exists, otherwise placeholder */}
                                            {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "Unknown"}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {!isAdmin && (
                                                <button
                                                    onClick={() => deleteUser(u._id)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                                                    title="Delete User"
                                                >
                                                    <TrashIcon />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center text-xs text-gray-500">
                <span>Showing {filteredUsers.length} results</span>
                <span>Total Database: {users.length} users</span>
            </div>
        </div>
      </div>
    </div>
  );
}