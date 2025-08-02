import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminLogin = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://backend-l5js.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );
      const token = res.data.token;
      login(token);
      navigate("/admin/dashboard");
    } catch (err) {
      const msg = err.response?.data?.error || "Login failed";
      setError(msg);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 max-w-sm mx-auto bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-2 w-full border p-2 rounded"
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={!email || !password}
          className={`${
            !email || !password
              ? "bg-pink-300 cursor-not-allowed"
              : "bg-[#ff69b4] hover:bg-pink-600"
          } transition text-white w-full py-2 rounded`}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
