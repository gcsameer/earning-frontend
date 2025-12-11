import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "../lib/api";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
    referral_code: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  // Auto-fill referral code from ?ref=XXXX
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      setForm((prev) => ({ ...prev, referral_code: ref }));
    }
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const payload = {
        username: form.username,
        email: form.email,
        phone: form.phone,
        password: form.password,
        confirm_password: form.confirm_password,
        referral_code: form.referral_code || "",
      };

      await api.post("/auth/register/", payload);
      setSuccess("Registration successful! You can now log in.");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err) {
      console.error(err);
      // Simple error handling
      if (err.response && err.response.data) {
        setError(JSON.stringify(err.response.data));
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mt-10 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create an account</h1>
      {error && <p className="mb-3 text-red-400 text-sm">{error}</p>}
      {success && <p className="mb-3 text-emerald-400 text-sm">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">Username</label>
          <input
            className="input"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="label">Email</label>
          <input
            className="input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="label">Phone</label>
          <input
            className="input"
            name="phone"
            value={form.phone}
            onChange={handleChange}
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
            required
          />
        </div>

        <div>
          <label className="label">Re-enter Password</label>
          <input
            className="input"
            type="password"
            name="confirm_password"
            value={form.confirm_password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="label">Referral Code (optional)</label>
          <input
            className="input"
            name="referral_code"
            value={form.referral_code}
            onChange={handleChange}
          />
        </div>

        <button className="btn w-full" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
