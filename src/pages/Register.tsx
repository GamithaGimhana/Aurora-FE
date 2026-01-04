import { useState } from "react";
import type { FormEvent } from "react";
import { register } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";
import type { Role } from "../store/auth/authTypes"; // adjust path

// --- Icons ---
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
  </svg>
);
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
    <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
  </svg>
);
const LockClosedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
  </svg>
);
const BadgeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.333c-.28-.354-.504-.746-.666-1.166H8.333a3.996 3.996 0 01-.667 1.166A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.333 1 1 0 01-.285-1.05l1.738-5.42-1.233-.616a1 1 0 01.894-1.79l1.599.8L9 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z" clipRule="evenodd" />
  </svg>
);

export default function Register() {
  // ================= KEEPING ORIGINAL LOGIC INTACT =================
  const navigate = useNavigate();

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

    try {
      const payload = {
        name,
        email,
        password,
        role: [role],
      };

      await register(payload);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error: any) {
      console.error(error?.response?.data);
      alert(error?.response?.data?.message || "Registration failed");
    }
  };
  // ================= END ORIGINAL LOGIC =================

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

          <form onSubmit={handleRegister} className="space-y-5">
            
            {/* Full Name */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative text-gray-400 focus-within:text-indigo-600 transition-colors">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <UserIcon />
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
                        <MailIcon />
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
                            <LockClosedIcon />
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
                            <LockClosedIcon />
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
                        <BadgeIcon />
                    </div>
                    {/* Custom chevron to replace default browser arrow */}
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
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
              className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-gray-200 mt-4"
            >
              Create Account
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