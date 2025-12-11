import { useState } from "react";
import api from "../lib/api";

export default function WithdrawPage() {
  const [form, setForm] = useState({
    amount_rs: "",
    method: "",
    account_id: "",
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);
    try {
      const res = await api.post("/withdraw/", form);
      setMessage(res.data.message || "Withdraw request created.");
    } catch (e) {
      console.error(e);
      if (e.response && e.response.data && e.response.data.detail) {
        setError(e.response.data.detail);
      } else {
        setError("Withdraw failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mt-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Withdraw</h1>
      {message && <p className="mb-3 text-emerald-300 text-sm">{message}</p>}
      {error && <p className="mb-3 text-red-400 text-sm">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">Amount (Rs)</label>
          <input
            className="input"
            name="amount_rs"
            type="number"
            min="0"
            value={form.amount_rs}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="label">Method (e.g. esewa, khalti)</label>
          <input
            className="input"
            name="method"
            value={form.method}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="label">Account / Phone</label>
          <input
            className="input"
            name="account_id"
            value={form.account_id}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn w-full" disabled={loading}>
          {loading ? "Submitting..." : "Request Withdraw"}
        </button>
      </form>
    </div>
  );
}
