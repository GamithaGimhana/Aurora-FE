import { useState } from "react";
import type { FormEvent } from "react";
import { register } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState("STUDENT");

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full mb-4 px-4 py-2 border rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            className="w-full mb-4 px-4 py-2 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full mb-4 px-4 py-2 border rounded-lg"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          <select
            className="w-full mb-6 px-4 py-2 border rounded-lg"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="STUDENT">Student</option>
            <option value="LECTURER">Lecturer</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
