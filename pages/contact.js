import { useState } from "react";
import Layout from "../components/Layout";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Simulate form submission (in production, connect to backend API)
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSuccess(false), 5000);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card fade-in">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl mb-4 shadow-lg shadow-emerald-500/30">
            <span className="text-2xl">📧</span>
          </div>
          <h1 className="text-3xl font-bold mb-2 gradient-text">Contact Us</h1>
          <p className="text-slate-400 text-sm">We'd love to hear from you</p>
        </div>

        {success && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <p className="text-emerald-400 text-sm">✓ Message sent successfully! We'll get back to you soon.</p>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Your Name</label>
            <input
              className="input"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="label">Email Address</label>
            <input
              className="input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div>
            <label className="label">Subject</label>
            <input
              className="input"
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="What is this regarding?"
              required
            />
          </div>

          <div>
            <label className="label">Message</label>
            <textarea
              className="input min-h-[150px] resize-y"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us how we can help..."
              required
            />
          </div>

          <button className="btn w-full py-3" disabled={loading}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="spinner"></span>
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </button>
        </form>

        <div className="mt-8 p-4 bg-slate-800/50 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-3">Other Ways to Reach Us</h3>
          <div className="space-y-2 text-slate-300">
            <p><strong>Email:</strong> support@nepearn.com</p>
            <p><strong>Response Time:</strong> We typically respond within 24-48 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}

