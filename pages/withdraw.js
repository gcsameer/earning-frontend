import { useEffect, useState } from "react";
import api, { getAccessToken } from "../lib/api";
import { useRouter } from "next/router";

export default function Withdraw() {
  const router = useRouter();
  const [wallet, setWallet] = useState(null);
  const [withdraws, setWithdraws] = useState([]);
  const [form, setForm] = useState({
    amount_rs: "",
    method: "esewa",
    account_id: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!getAccessToken()) {
      router.replace("/login");
      return;
    }
    const fetchData = async () => {
      const [walletRes, withdrawsRes] = await Promise.all([
        api.get("/wallet/"),
        api.get("/withdraws/"),
      ]);
      setWallet(walletRes.data);
      setWithdraws(withdrawsRes.data);
    };
    fetchData().catch((err) => {
      console.error(err);
      router.replace("/login");
    });
  }, [router]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);
    try {
      await api.post("/withdraw/", {
        amount_rs: form.amount_rs,
        method: form.method,
        account_id: form.account_id,
      });
      setMessage("Withdraw request created successfully.");
      const [walletRes, withdrawsRes] = await Promise.all([
        api.get("/wallet/"),
        api.get("/withdraws/"),
      ]);
      setWallet(walletRes.data);
      setWithdraws(withdrawsRes.data);
      setForm({ ...form, amount_rs: "" });
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to create withdraw request.");
    } finally {
      setLoading(false);
    }
  };

  if (!wallet) return <p className="mt-10 text-center">Loading...</p>;

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="card">
        <h1 className="text-2xl font-bold mb-4">Request Withdraw</h1>
        <p className="text-slate-300 mb-2">
          Coins:{" "}
          <span className="font-bold text-emerald-400">
            {wallet.coins_balance}
          </span>{" "}
          (~Rs {wallet.approx_balance_rs.toFixed(2)})
        </p>
        {message && <p className="mb-2 text-emerald-400 text-sm">{message}</p>}
        {error && <p className="mb-2 text-red-400 text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-3 mt-2">
          <div>
            <label className="label">Amount (Rs)</label>
            <input
              className="input"
              name="amount_rs"
              type="number"
              value={form.amount_rs}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="label">Method</label>
            <select
              className="input"
              name="method"
              value={form.method}
              onChange={handleChange}
            >
              <option value="esewa">eSewa</option>
              <option value="khalti">Khalti</option>
              <option value="imepay">IME Pay</option>
            </select>
          </div>
          <div>
            <label className="label">Account / Number</label>
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

      <div className="card">
        <h2 className="text-xl font-semibold mb-3">Your Requests</h2>
        {withdraws.length === 0 && (
          <p className="text-slate-400 text-sm">No withdraw requests yet.</p>
        )}
        <ul className="space-y-2">
          {withdraws.map((w) => (
            <li
              key={w.id}
              className="flex justify-between text-sm border-b border-slate-800 pb-2 last:border-0"
            >
              <div>
                <p className="font-medium">
                  Rs {parseFloat(w.amount_rs).toFixed(2)} via {w.method}
                </p>
                <p className="text-slate-400 text-xs">
                  {new Date(w.created_at).toLocaleString()}
                </p>
              </div>
              <div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    w.status === "approved"
                      ? "bg-emerald-500 text-slate-900"
                      : w.status === "rejected"
                      ? "bg-red-500 text-slate-900"
                      : "bg-slate-700 text-slate-100"
                  }`}
                >
                  {w.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
