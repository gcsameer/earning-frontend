import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api, { getAccessToken } from "../lib/api";

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export default function Withdraw() {
  const router = useRouter();

  const [form, setForm] = useState({
    amount_rs: "",
    method: "khalti",
    account_id: "",
  });

  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);

  const [list, setList] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const loadList = async () => {
    setLoadingList(true);
    try {
      const res = await api.get("/withdraws/");
      setList(res.data || []);
    } catch (e) {
      // keep silent but stop loader
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    if (!getAccessToken()) {
      router.replace("/login");
      return;
    }
    loadList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setErr(null);

    // basic client validation
    const amt = Number(form.amount_rs);
    if (!Number.isFinite(amt) || amt <= 0) {
      setErr("Enter a valid amount in Rs.");
      return;
    }

    setSubmitting(true);
    try {
      await api.post("/withdraw/", {
        amount_rs: form.amount_rs,
        method: form.method,
        account_id: form.account_id,
      });

      setMsg("Withdraw request submitted.");
      setForm({ amount_rs: "", method: "khalti", account_id: "" });
      await loadList();
    } catch (e2) {
      setErr(e2?.response?.data?.detail || "Withdraw failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="card fade-in">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 gradient-text">Withdraw</h1>
            <p className="text-slate-400 text-sm">Cash out your earnings</p>
          </div>
          <button className="btn" onClick={loadList} disabled={loadingList}>
            {loadingList ? (
              <span className="flex items-center gap-2">
                <span className="spinner"></span>
                Loading...
              </span>
            ) : (
              "🔄 Refresh"
            )}
          </button>
        </div>

        {msg && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <p className="text-emerald-400 text-sm">{msg}</p>
          </div>
        )}
        {err && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-red-400 text-sm">{err}</p>
          </div>
        )}

        <form onSubmit={submit} className="space-y-5 max-w-md">
        <div>
          <label className="label">Amount (Rs)</label>
          <input
            className="input"
            name="amount_rs"
            value={form.amount_rs}
            onChange={change}
            inputMode="decimal"
            placeholder="e.g. 100"
            required
          />
        </div>

        <div>
          <label className="label">Method</label>
          <select className="input" name="method" value={form.method} onChange={change}>
            <option value="khalti">Khalti</option>
            <option value="esewa">eSewa</option>
            <option value="bank">Bank</option>
          </select>
        </div>

        <div>
          <label className="label">Account ID (phone/account)</label>
          <input
            className="input"
            name="account_id"
            value={form.account_id}
            onChange={change}
            placeholder="e.g. 98xxxxxxxx or bank acct"
            required
          />
        </div>

          <button className="btn w-full py-3" disabled={submitting}>
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="spinner"></span>
                Submitting...
              </span>
            ) : (
              "💸 Request Withdraw"
            )}
          </button>
        </form>
      </div>

      {/* Withdraw Requests List */}
      <div className="card fade-in">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span>📋</span> My Withdraw Requests
        </h2>

        {loadingList ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <span className="spinner mx-auto mb-4"></span>
              <p className="text-slate-400">Loading requests...</p>
            </div>
          </div>
        ) : list.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4 opacity-30">📭</div>
            <p className="text-slate-400 mb-2">No withdraw requests yet</p>
            <p className="text-sm text-slate-500">Submit a request above to get started</p>
          </div>
        ) : (
          <div className="space-y-3">
            {list.map((w) => (
              <div 
                key={w.id} 
                className="p-4 rounded-xl border border-slate-800/50 bg-slate-800/30 hover:bg-slate-800/50 transition-colors card-hover"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">
                        {w.status === "pending" ? "⏳" : w.status === "approved" ? "✅" : "❌"}
                      </span>
                      <div>
                        <b className="text-xl text-white">Rs {w.amount_rs}</b>
                        <span className={`ml-3 px-2 py-1 rounded text-xs font-medium capitalize ${
                          w.status === "pending" ? "bg-yellow-500/20 text-yellow-400" :
                          w.status === "approved" ? "bg-emerald-500/20 text-emerald-400" :
                          "bg-red-500/20 text-red-400"
                        }`}>
                          {w.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-slate-400 ml-11">
                      {w.method} / {w.account_id}
                    </div>
                    {w.admin_note && (
                      <div className="text-sm text-yellow-300/80 mt-2 ml-11 p-2 rounded bg-yellow-500/10 border border-yellow-500/20">
                        Admin: {w.admin_note}
                      </div>
                    )}
                    <div className="text-xs text-slate-500 mt-2 ml-11">{formatDate(w.created_at)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
