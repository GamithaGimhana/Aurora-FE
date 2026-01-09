import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Role } from "../store/auth/authTypes"; // adjust path
import { registerThunk } from "../store/auth/authThunks";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Toaster, toast } from "sonner"; // 1. Import Sonner
import { 
  User, 
  Mail, 
  Lock, 
  IdCard, 
  ChevronDown, 
  Loader2,
  Eye,
  EyeOff 
} from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth); // Removed 'error' as Toast handles it

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState<Role>("STUDENT");

  // Toggle states for visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    // 2. Validation Toasts
    if (!name || !email || !password || !confirm) {
      toast.error("Incomplete Form", { 
          description: "Please fill in all fields to create your account." 
      });
      return;
    }

    if (password !== confirm) {
      toast.error("Password Mismatch", { 
          description: "The passwords you entered do not match." 
      });
      return;
    }

    // 3. Registration Promise Toast
    // Using .unwrap() allows us to catch the error locally for the toast
    const registerPromise = dispatch(
      registerThunk({
        name,
        email,
        password,
        role: [role],
      })
    ).unwrap();

    toast.promise(registerPromise, {
        loading: 'Creating your account...',
        success: () => {
            // Navigate to login after a short delay so user sees the success message
            setTimeout(() => navigate("/login"), 1500);
            return "Registration successful! Please login.";
        },
        error: (err) => {
            // Extract error message from Redux rejection
            return err.message || typeof err === 'string' ? err : "Registration failed. Please try again.";
        }
    });
  };

  return (
    <div className="min-h-screen flex bg-white font-sans text-gray-900">
      
      {/* 4. Toaster Component */}
      <Toaster position="top-center" richColors closeButton />

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

          {/* Removed static error block in favor of Toast notifications */}

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
                        disabled={loading}
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
                        disabled={loading}
                    />
                </div>
            </div>

            {/* Password & Confirm Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Password Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <div className="relative text-gray-400 focus-within:text-indigo-600 transition-colors">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock size={20} />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer hover:text-indigo-600 transition-colors"
                            tabIndex={-1}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Confirm Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm</label>
                    <div className="relative text-gray-400 focus-within:text-indigo-600 transition-colors">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock size={20} />
                        </div>
                        <input
                            type={showConfirm ? "text" : "password"}
                            placeholder="••••••••"
                            className="w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            disabled={loading}
                        />
                         <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer hover:text-indigo-600 transition-colors"
                            tabIndex={-1}
                        >
                            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
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
                        disabled={loading}
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