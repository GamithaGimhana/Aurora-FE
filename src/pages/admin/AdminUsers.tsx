import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchAdminUsersThunk,
  updateUserRoleThunk,
  deleteUserThunk,
} from "../../store/adminUsers/adminUsersThunks";
import type { Role } from "../../store/auth/authTypes";
import { 
  Trash2, 
  Search, 
  ChevronLeft, 
  Users, 
  ShieldCheck, 
  GraduationCap, 
  ChevronDown 
} from "lucide-react";

export default function AdminUsers() {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.adminUsers);
  
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
                <ChevronLeft size={20} />
            </Link>
            <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">User Management</h1>
                <p className="text-gray-500 text-sm mt-1">Oversee platform users, manage permissions, and track engagement.</p>
            </div>
        </div>

        {/* Error Message */}
        {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700 shadow-sm">
            <strong className="font-semibold">Error:</strong> {error}
        </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-indigo-50 rounded-xl">
                    <Users className="w-6 h-6 text-indigo-600" strokeWidth={1.5} />
                </div>
                <div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-xl">
                    <GraduationCap className="w-6 h-6 text-blue-600" strokeWidth={1.5} />
                </div>
                <div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Lecturers</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.lecturers}</p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-purple-50 rounded-xl">
                    <ShieldCheck className="w-6 h-6 text-purple-600" strokeWidth={1.5} />
                </div>
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
                        <Search className="w-5 h-5 text-gray-400" />
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
                                        <Search className="w-8 h-8 text-gray-300" />
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
                                                    value={u.role.includes("ADMIN") ? "ADMIN" : u.role[0]}
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
                                                        <ChevronDown size={12} strokeWidth={3} />
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
                                                    <Trash2 className="w-5 h-5" />
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