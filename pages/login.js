import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import api, { setTokens, getAccessToken } from "../lib/api";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If already logged in, go dashboard
    if (getAccessToken()) router.replace("/dashboard");
  }, [router]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.post("/auth/token/", {
        username: form.username,
        password: form.password,
      });

      setTokens(res.data.access, res.data.refresh);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card fade-in">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl mb-4 shadow-lg shadow-emerald-500/30">
            <span className="text-2xl">🔐</span>
          </div>
          <h1 className="text-3xl font-bold mb-2 gradient-text">Welcome Back</h1>
          <p className="text-slate-400 text-sm">Login to continue earning</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label">Username</label>
            <input
              className="input"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your username"
              autoComplete="username"
              required
            />
          </div>

          <div>
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>

          <button className="btn w-full py-3" disabled={loading}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="spinner"></span>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-6">
          Don't have an account?{" "}
          <Link href="/register" className="text-emerald-400 hover:text-emerald-300 font-medium">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
