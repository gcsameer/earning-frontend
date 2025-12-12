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
    <div className="card">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h1 className="text-2xl font-bold">Withdraw</h1>
        <button className="btn" onClick={loadList} disabled={loadingList}>
          {loadingList ? "Loading..." : "Refresh"}
        </button>
      </div>

      {msg && <p className="mb-3 text-emerald-400 text-sm">{msg}</p>}
      {err && <p className="mb-3 text-red-400 text-sm">{err}</p>}

      <form onSubmit={submit} className="space-y-4 max-w-md">
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

        <button className="btn w-full" disabled={submitting}>
          {submitting ? "Submitting..." : "Request Withdraw"}
        </button>
      </form>

      <h2 className="text-lg font-semibold mt-8 mb-2">My Withdraw Requests</h2>

      {loadingList ? (
        <p>Loading...</p>
      ) : list.length === 0 ? (
        <p className="opacity-70 text-sm">No requests yet.</p>
      ) : (
        <div className="space-y-2">
          {list.map((w) => (
            <div key={w.id} className="p-3 rounded-lg border border-white/10">
              <div className="flex justify-between items-center gap-3">
                <b>Rs {w.amount_rs}</b>
                <span className="opacity-80 capitalize">{w.status}</span>
              </div>

              <div className="text-xs opacity-70">
                {w.method} / {w.account_id}
              </div>

              {w.admin_note ? (
                <div className="text-xs text-yellow-200/80 mt-1">
                  Admin: {w.admin_note}
                </div>
              ) : null}

              <div className="text-xs opacity-50 mt-1">{formatDate(w.created_at)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
