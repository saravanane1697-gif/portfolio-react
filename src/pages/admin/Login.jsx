import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    setStatus("loading");
    setErrorMsg("");
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/admin/manageall"); // ← redirect immediately after login
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err.response?.data?.message || "Invalid username or password.",
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") login();
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-indigo-500/60 focus:bg-white/10 transition-all duration-200";

  return (
    <section className="min-h-screen bg-gray-950 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8 text-center">
          <p className="text-indigo-400 text-xs font-medium tracking-widest uppercase mb-3">
            Admin Panel
          </p>
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-500 text-sm mt-2">
            Sign in to manage your portfolio
          </p>
        </div>

        {/* Card */}
        <div className="relative rounded-2xl border border-white/10 bg-white/5 p-8">
          <div className="absolute -top-px left-12 right-12 h-px bg-linear-to-r from-transparent via-indigo-500/50 to-transparent" />

          <div className="space-y-4">
            <input
              className={inputClass}
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="username"
            />

            <input
              type="password"
              className={inputClass}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="current-password"
            />

            {status === "error" && (
              <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                {errorMsg}
              </p>
            )}

            <button
              onClick={login}
              disabled={status === "loading"}
              className="w-full py-3 rounded-xl font-semibold text-sm bg-linear-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-100 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
            >
              {status === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
