import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
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
      // Validate passwords match
      if (form.password !== form.confirm_password) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      const payload = {
        username: form.username,
        email: form.email,
        phone: form.phone,
        password: form.password,
        confirm_password: form.confirm_password,
        referral_code: form.referral_code || "",
      };

      const res = await api.post("/auth/register/", payload);
      
      if (res.status === 201 || res.data) {
        setSuccess("Registration successful! You can now log in.");
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setError("Registration failed: Invalid response from server");
      }
    } catch (err) {
      console.error("Registration error:", err);
      console.error("Error response:", err.response);
      
      if (err.response) {
        // Server responded with error
        const status = err.response.status;
        const data = err.response.data;
        
        if (status === 400) {
          // Validation errors
          if (typeof data === 'object') {
            const errors = [];
            Object.keys(data).forEach(key => {
              if (Array.isArray(data[key])) {
                errors.push(`${key}: ${data[key].join(', ')}`);
              } else {
                errors.push(`${key}: ${data[key]}`);
              }
            });
            setError(errors.join(' | ') || "Invalid input. Please check your information.");
          } else {
            setError(data.detail || data.message || "Invalid input. Please check your information.");
          }
        } else if (status === 404) {
          setError("Registration endpoint not found. Please check API configuration.");
        } else if (status >= 500) {
          setError("Server error. Please try again later.");
        } else {
          setError(data.detail || data.message || `Registration failed (${status})`);
        }
      } else if (err.request) {
        // Request made but no response
        setError("Cannot connect to server. Please check your internet connection.");
      } else {
        // Error setting up request
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card fade-in">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl mb-4 shadow-lg shadow-emerald-500/30">
            <span className="text-2xl">✨</span>
          </div>
          <h1 className="text-3xl font-bold mb-2 gradient-text">Create Account</h1>
          <p className="text-slate-400 text-sm">Join thousands earning rewards</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <p className="text-emerald-400 text-sm">{success}</p>
          </div>
        )}

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

          <button className="btn w-full py-3" disabled={loading}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="spinner"></span>
                Registering...
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
