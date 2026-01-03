import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

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

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data.users);
    } catch (err) {
      console.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const changeRole = async (id: string, role: string) => {
    try {
        setUsers(users.map(u => u._id === id ? { ...u, role: [role] } : u));
        await api.patch(`/admin/users/${id}/role`, { role }); // send string
    } catch {
        alert("Failed to update role");
        loadUsers(); // revert on fail
    }
  }; 

  const deleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this user?")) return;
    try {
        await api.delete(`/admin/users/${id}`);
        setUsers(users.filter(u => u._id !== id));
    } catch {
        alert("Failed to delete user");
    }
  };

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(search.toLowerCase()) || 
    u.role.some((r: string) => r.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <Link 
                    to="/admin/dashboard"
                    className="p-2 -ml-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
                >
                    <ChevronLeft />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                    <p className="text-gray-500 text-sm">Manage access and roles for the platform.</p>
                </div>
            </div>
            
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon />
                </div>
                <input 
                    type="text" 
                    placeholder="Search users..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none w-full md:w-64"
                />
            </div>
        </div>

        {/* Table Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            [1, 2, 3].map(i => (
                                <tr key={i}>
                                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-48 animate-pulse"></div></td>
                                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-24 animate-pulse"></div></td>
                                    <td className="px-6 py-4"></td>
                                </tr>
                            ))
                        ) : filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                                    No users found matching "{search}"
                                </td>
                            </tr>
                        ) : (
                            filteredUsers.map((u) => {
                                // Initials for Avatar
                                const initial = u.email[0].toUpperCase();
                                
                                return (
                                    <tr key={u._id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold border border-slate-200">
                                                    {initial}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{u.email}</p>
                                                    <p className="text-xs text-gray-400">ID: {u._id.slice(-6)}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={u.role[0]}
                                                onChange={(e) => changeRole(u._id, e.target.value)}
                                                className={`text-xs font-bold uppercase tracking-wide py-1.5 pl-2 pr-8 rounded-lg border-0 ring-1 ring-inset focus:ring-2 focus:ring-indigo-600 bg-transparent cursor-pointer ${
                                                    u.role.includes("ADMIN") ? 'bg-purple-50 text-purple-700 ring-purple-600/20' :
                                                    u.role.includes("LECTURER") ? 'bg-blue-50 text-blue-700 ring-blue-600/20' :
                                                    'bg-green-50 text-green-700 ring-green-600/20'
                                                }`}
                                            >
                                                <option value="STUDENT">STUDENT</option>
                                                <option value="LECTURER">LECTURER</option>
                                                <option value="ADMIN">ADMIN</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => deleteUser(u._id)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                                                title="Delete User"
                                            >
                                                <TrashIcon />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
            
            {/* Footer Count */}
            {!loading && (
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 text-xs text-gray-500">
                    Showing {filteredUsers.length} of {users.length} users
                </div>
            )}
        </div>
      </div>
    </div>
  );
}