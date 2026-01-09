import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Role } from "../store/auth/authTypes"; // adjust path
import { registerThunk } from "../store/auth/authThunks";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { 
  User, 
  Mail, 
  Lock, 
  IdCard, 
  ChevronDown, 
  AlertCircle, 
  Loader2 
} from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState<Role>("STUDENT");

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirm) {
      alert("All fields are required");
      return;
    }

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    const result = await dispatch(
      registerThunk({
        name,
        email,
        password,
        role: [role],
      })
    );

    if (registerThunk.fulfilled.match(result)) {
      alert("Registration successful! Please login.");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans text-gray-900">
      
      {/* --- Left Side - Form --- */}
      <div className="flex-1 flex flex-col justify-center p-6 md:p-12 lg:p-20 overflow-y-auto">
        <div className="w-full max-w-md mx-auto space-y-8">
          
          {/* Header */}
          <div>
            <div className="font-bold text-xl tracking-tight flex items-center gap-2 mb-8 text-gray-400">
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                Aurora
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Create an account</h1>
            <p className="mt-3 text-gray-500">
              Start your journey with Aurora today.
            </p>
          </div>

          {/* Error Message */}
          {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700 shadow-sm flex items-center gap-2">
              <AlertCircle size={18} />
              <div>
                <strong className="font-semibold">Error:</strong> {error}
              </div>
          </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            
            {/* Full Name */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative text-gray-400 focus-within:text-indigo-600 transition-colors">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User size={20} />
                    </div>
                    <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
            </div>

            {/* Email */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative text-gray-400 focus-within:text-indigo-600 transition-colors">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail size={20} />
                    </div>
                    <input
                        type="email"
                        placeholder="name@example.com"
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>

            {/* Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <div className="relative text-gray-400 focus-within:text-indigo-600 transition-colors">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock size={20} />
                        </div>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm</label>
                    <div className="relative text-gray-400 focus-within:text-indigo-600 transition-colors">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock size={20} />
                        </div>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Role Select */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">I am a...</label>
                <div className="relative text-gray-400 focus-within:text-indigo-600 transition-colors">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <IdCard size={20} />
                    </div>
                    {/* Custom chevron to replace default browser arrow */}
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <ChevronDown size={16} className="text-gray-500" />
                    </div>
                    <select
                        className="w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none appearance-none cursor-pointer"
                        value={role}
                        onChange={(e) => setRole(e.target.value as Role)}
                    >
                        <option value="STUDENT">Student</option>
                        <option value="LECTURER">Lecturer</option>
                    </select>
                </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-black hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-gray-200 mt-4 flex justify-center items-center gap-2 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 text-white" />
                    Creating...
                  </>
              ) : "Create Account"}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
              Log in
            </Link>
          </p>
        </div>
      </div>

      {/* --- Right Side - Image Banner (Hidden on mobile) --- */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-indigo-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay"
          alt="Group Study"
        />
        <div className="relative z-20 flex flex-col justify-end p-16 h-full text-white">
          <h2 className="text-4xl font-bold mb-4">Join the community.</h2>
          <p className="text-lg text-indigo-100 max-w-md">
            Unlock the full potential of your learning journey with tools designed for retention and engagement.
          </p>
        </div>
      </div>

    </div>
  );
}