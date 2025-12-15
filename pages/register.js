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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailValidating, setEmailValidating] = useState(false);
  const [emailError, setEmailError] = useState(null);

  // Auto-fill referral code from ?ref=XXXX
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      setForm((prev) => ({ ...prev, referral_code: ref }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Validate email in real-time
    if (name === "email" && value) {
      validateEmail(value);
    } else if (name === "email") {
      setEmailError(null);
    }
  };

  const validateEmail = async (email) => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      setEmailValidating(false);
      return;
    }

    setEmailValidating(true);
    setEmailError(null);

    try {
      // Call backend API to verify email exists
      const res = await api.post("/auth/verify-email/", { email });
      if (res.data && !res.data.valid) {
        setEmailError(res.data.error || "This email address does not exist. Please use a valid email.");
      } else {
        setEmailError(null);
      }
    } catch (err) {
      // If API fails, just do basic validation (format is already checked)
      // Don't show error if format is valid
      if (emailRegex.test(email)) {
        setEmailError(null);
      } else {
        setEmailError("Please enter a valid email address");
      }
    } finally {
      setEmailValidating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      // Validate email if not already validated
      if (emailError) {
        setError("Please fix email validation errors before submitting");
        setLoading(false);
        return;
      }

      // Validate passwords match
      if (form.password !== form.confirm_password) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      // Validate password strength
      if (form.password.length < 8) {
        setError("Password must be at least 8 characters long");
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
          <div className="relative">
            <input
              className={`input ${emailError ? 'border-red-500' : ''} ${emailValidating ? 'pr-20' : ''}`}
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onBlur={() => form.email && validateEmail(form.email)}
              placeholder="Enter your email address"
              required
            />
            {emailValidating && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <span className="spinner-small"></span>
              </div>
            )}
          </div>
          {emailError && (
            <p className="text-red-400 text-xs mt-1">{emailError}</p>
          )}
          {!emailError && form.email && !emailValidating && (
            <p className="text-emerald-400 text-xs mt-1">✓ Valid email address</p>
          )}
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
          <div className="relative">
            <input
              className="input pr-10"
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="label">Re-enter Password</label>
          <div className="relative">
            <input
              className="input pr-10"
              type={showConfirmPassword ? "text" : "password"}
              name="confirm_password"
              value={form.confirm_password}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          {form.confirm_password && form.password !== form.confirm_password && (
            <p className="text-red-400 text-xs mt-1">Passwords do not match</p>
          )}
          {form.confirm_password && form.password === form.confirm_password && form.password && (
            <p className="text-emerald-400 text-xs mt-1">✓ Passwords match</p>
          )}
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
