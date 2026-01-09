import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import {
  fetchProfileThunk,
  updateProfileThunk,
  changePasswordThunk,
} from "../store/profile/profileThunks";

import { clearProfile } from "../store/profile/profileSlice";
import { logout } from "../store/auth/authSlice";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Lock, 
  Key, 
  BadgeCheck, 
  Loader2 
} from "lucide-react";

export default function Profile() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // AUTH
  const authUser = useAppSelector((state) => state.auth.user);

  // PROFILE
  const { user: profileUser, loading } = useAppSelector(
    (state) => state.profile
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChangingPwd, setIsChangingPwd] = useState(false);

  // PROTECT ROUTE
  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  // Fetch profile
  useEffect(() => {
    dispatch(fetchProfileThunk());
  }, [dispatch]);

  // Populate form
  useEffect(() => {
    if (profileUser) {
      setName(profileUser.name);
      setEmail(profileUser.email);
    }
  }, [profileUser]);

  const handleUpdate = async () => {
    setIsUpdating(true);
    await dispatch(updateProfileThunk({ name, email }));
    setIsUpdating(false);
  };

  const handleChangePassword = async () => {
    if(!currentPassword || !newPassword) return;

    setIsChangingPwd(true);
    const result = await dispatch(
      changePasswordThunk({ currentPassword, newPassword })
    );
    setIsChangingPwd(false);

    if (changePasswordThunk.fulfilled.match(result)) {
      alert("Success! Your password has been changed. Please log in again.");

      dispatch(clearProfile());
      dispatch(logout());
      localStorage.clear();

      navigate("/login");
    }
  };

  if (loading || !profileUser) {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="flex flex-col items-center animate-pulse">
                <div className="h-20 w-20 bg-gray-200 rounded-full mb-4"></div>
                <div className="h-4 w-48 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>
        </div>
    );
  }

  // Visuals helpers
  const initials = profileUser.name 
    ? profileUser.name.split(' ').map((n: string) => n[0]).join('').substring(0,2).toUpperCase()
    : "ME";
  
  const role = profileUser.role?.[0] || "USER";

  // Logic to determine where to go based on Role
  const handleBack = () => {
    const roleRoutes: Record<string, string> = {
        ADMIN: "/admin/dashboard",
        LECTURER: "/lecturer/dashboard",
        STUDENT: "/student/dashboard",
        USER: "/" // Fallback for basic users
    };

    const targetRoute = roleRoutes[role] || "/";
    navigate(targetRoute);
  };

  const roleColors = {
      ADMIN: "bg-purple-100 text-purple-700",
      LECTURER: "bg-blue-100 text-blue-700",
      STUDENT: "bg-green-100 text-green-700",
      USER: "bg-gray-100 text-gray-700"
  };
  const roleClass = roleColors[role as keyof typeof roleColors] || roleColors.USER;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Back Button UI */}
        <button 
            onClick={handleBack}
            className="group flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-6 font-medium"
        >
            <div className="p-1.5 rounded-lg bg-white border border-gray-200 group-hover:border-gray-300 shadow-sm transition-all">
                <ArrowLeft size={20} />
            </div>
            <span>Back to Dashboard</span>
        </button>

        {/* Header */}
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
            <p className="text-gray-500 mt-1">Manage your profile details and security settings.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Identity Card */}
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-slate-900 text-white flex items-center justify-center text-2xl font-bold mb-4 shadow-lg border-4 border-white">
                            {initials}
                        </div>
                        <div className="absolute bottom-4 right-0 bg-white rounded-full p-1 shadow-sm">
                            <BadgeCheck className="w-5 h-5 text-blue-500" fill="currentColor" color="white" />
                        </div>
                    </div>
                    
                    <h2 className="text-xl font-bold text-gray-900">{profileUser.name}</h2>
                    <p className="text-gray-500 text-sm mb-4">{profileUser.email}</p>
                    
                    <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${roleClass}`}>
                        {role}
                    </div>

                    <div className="w-full border-t border-gray-100 my-6"></div>
                    
                    <div className="w-full space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Member since</span>
                            <span className="font-medium text-gray-900">
                                {new Date(profileUser.createdAt || Date.now()).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Status</span>
                            <span className="font-medium text-green-600">Active</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Settings Forms */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* Profile Information Form */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                            <User size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
                    </div>

                    <div className="space-y-5">
                        <div className="grid md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <User size={20} />
                                    </div>
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent outline-none transition-all"
                                        placeholder="Your Name"
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <Mail size={20} />
                                    </div>
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent outline-none transition-all"
                                        placeholder="name@example.com"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-2">
                            <button
                                onClick={handleUpdate}
                                disabled={isUpdating}
                                className="bg-black text-white px-6 py-2.5 rounded-xl font-medium hover:bg-gray-800 focus:ring-4 focus:ring-gray-200 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isUpdating ? (
                                    <>
                                        <Loader2 className="animate-spin h-4 w-4 text-white" />
                                        Saving...
                                    </>
                                ) : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Security Form */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    <div className="flex items-center gap-3 mb-6">
                         <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                            <Lock size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Security</h3>
                    </div>

                    <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-6 text-sm text-orange-800 flex items-start gap-2">
                         <span className="mt-0.5">⚠️</span>
                         <span>Updating your password will automatically log you out of all sessions for security purposes.</span>
                    </div>

                    <div className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Current Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Key size={20} />
                                </div>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:bg-white focus:border-transparent outline-none transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">New Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:bg-white focus:border-transparent outline-none transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-2">
                            <button
                                onClick={handleChangePassword}
                                disabled={isChangingPwd || !currentPassword || !newPassword}
                                className="bg-white border-2 border-red-100 text-red-600 px-6 py-2.5 rounded-xl font-medium hover:bg-red-50 hover:border-red-200 focus:ring-4 focus:ring-red-50 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                 {isChangingPwd ? (
                                    <>
                                        <Loader2 className="animate-spin h-4 w-4 text-red-600" />
                                        Updating...
                                    </>
                                ) : "Update Password"}
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
}