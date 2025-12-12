import { useState } from "react";
import { useRouter } from "next/router";
import api, { setTokens } from "../lib/api";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/token/", {
        username: form.username,
        password: form.password,
      });

      // save tokens + set axios Authorization header
      setTokens(res.data.access, res.data.refresh);

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.non_field_errors?.[0] ||
        "Invalid credentials";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mt-10 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      {error && <p className="mb-3 text-red-400 text-sm">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">Username</label>
          <input
            className="input"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            autoComplete="username"
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
            required
            autoComplete="current-password"
          />
        </div>

        <button className="btn w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
