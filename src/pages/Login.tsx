import { useState } from "react";
import type { FormEvent } from "react";
import { login, getMe } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("123456");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await login(email, password);

      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);

      const profile = await getMe();
      setUser(profile.data);
      localStorage.setItem("user", JSON.stringify(profile.data));

      const roles = profile.data.role || [];

      if (roles.includes("ADMIN")) navigate("/dashboard/admin");
      else if (roles.includes("LECTURER")) navigate("/dashboard/lecturer");
      else navigate("/dashboard/student");

    } catch (err) {
      alert("Login failed");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-2 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 px-4 py-2 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            Login
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
