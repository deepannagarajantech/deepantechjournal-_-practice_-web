import { useState } from "react";
import api from "../api/apiClient";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@testcrafthub.com");
  const [password, setPassword] = useState("Admin@123");
  const [message, setMessage] = useState("");
  const { setUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      setMessage(res.data.message);
      if (res.data.token) {
        localStorage.setItem("authToken", res.data.token);
        const me = await api.get("/auth/me");
        setUser(me.data);
      }
    } catch (err) {
      setMessage("Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          className="w-full border rounded px-3 py-2"
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="w-full border rounded px-3 py-2"
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="w-full bg-slate-900 text-white rounded py-2">
          Login
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-slate-700">{message}</p>}
    </div>
  );
}
