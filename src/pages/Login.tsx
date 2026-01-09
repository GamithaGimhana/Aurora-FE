import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginThunk } from "../store/auth/authThunks";
import { Toaster, toast } from "sonner"; // 1. Import Sonner
import { Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth); // Removed 'error' from selector

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // New state to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    // 2. Validation Toast
    if (!email || !password) {
      toast.error("Missing Credentials", { 
          description: "Please enter both your email and password." 
      });
      return;
    }

    try {
        // 3. Dispatch Thunk
        const result = await dispatch(
            loginThunk({ email, password })
        ).unwrap();

        const roles = result.role;

        // 4. Success Toast (Optional, as redirection is usually enough)
        toast.success(`Welcome back, ${result.name}!`);

        if (roles.includes("ADMIN")) {
            navigate("/admin/dashboard");
        } else if (roles.includes("LECTURER")) {
            navigate("/lecturer/dashboard");
        } else {
            navigate("/student/dashboard");
        }
    } catch (err: any) {
        // 5. Error Toast
        // Redux Toolkit often puts the error message in err.message or just err string if rejected manually
        const errorMessage = typeof err === 'string' ? err : (err.message || "Invalid email or password.");
        toast.error("Login Failed", { 
            description: errorMessage 
        });
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans text-gray-900">
      
      {/* 6. Toaster Component */}
      <Toaster position="top-center" richColors />

      {/* --- Left Side - Image Banner (Hidden on mobile) --- */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
          alt="Students collaborating"
        />
        <div className="relative z-20 flex flex-col justify-between p-16 h-full text-white">
          <Link
            to="/"
            className="font-bold text-2xl tracking-tight flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold text-sm group-hover:bg-gray-800 transition-colors">
              A
            </div>
            <span className="w-8 h-8">
              Aurora
            </span>
          </Link>
          <div>
            <blockquote className="text-2xl font-medium max-w-lg leading-snug">
              "The best way to predict the future is to create it. Start learning smarter today."
            </blockquote>
          </div>
        </div>
      </div>

      {/* --- Right Side - Login Form --- */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-24">
        <div className="w-full max-w-md space-y-10">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight">Welcome back</h1>
            <p className="mt-3 text-gray-500 text-lg">
              Please enter your details to sign in.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input with Icon */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email address
              </label>
              <div className="relative text-gray-400 focus-within:text-indigo-600 transition-colors">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* Password Input with Icon */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative text-gray-400 focus-within:text-indigo-600 transition-colors">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5" />
                </div>
                
                <input
                  id="password"
                  // Dynamic type based on state
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  // Changed pr-4 to pr-12 to make room for the eye icon
                  className="w-full pl-11 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />

                {/* Eye Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer hover:text-indigo-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="flex justify-end mt-2">
                {/* <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link> */}
              </div>
            </div>

            <button
              type="submit"
              className={`w-full bg-black hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-gray-200 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin h-5 w-5 text-white" />
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Create an account for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}