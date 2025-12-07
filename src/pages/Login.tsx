import { useState } from "react";
import type { FormEvent } from "react";
import { login, getMe } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("Admin@123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const res = await login(email, password);

      if (!res?.accessToken) {
        setError("Login failed: No token received");
        return;
      }

      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);

      const profile = await getMe();
      if (!profile?.user) {
        setError("Failed to fetch user profile");
        return;
      }

      setUser(profile.user);
      localStorage.setItem("user", JSON.stringify(profile.user));

      const roles = profile.user.role || [];
      if (roles.includes("ADMIN") || roles.includes("LECTURER")) {
        navigate("/lecturer/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (err: any) {
      // If your backend sends proper status & message
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Login failed due to server error");
      }
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        {error && (
          <div className="text-red-600 text-sm mb-4 text-center">{error}</div>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-2 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 px-4 py-2 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          <button
            type="submit"
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
