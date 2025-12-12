import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api, { getAccessToken } from "../lib/api";

export default function Withdraw() {
  const router = useRouter();
  const [form, setForm] = useState({ amount_rs: "", method: "khalti", account_id: "" });
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (!getAccessToken()) router.replace("/login");
    loadList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadList = async () => {
    try {
      const res = await api.get("/withdraws/");
      setList(res.data || []);
    } catch {}
  };

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    try {
      await api.post("/withdraw/", form);
      setMsg("Withdraw request submitted.");
      setForm({ amount_rs: "", method: "khalti", account_id: "" });
      await loadList();
    } catch (e2) {
      setErr(e2?.response?.data?.detail || "Withdraw failed.");
    }
  };

  return (
    <div className="card">
      <h1 className="text-2xl font-bold mb-4">Withdraw</h1>

      {msg && <p className="mb-3 text-emerald-400 text-sm">{msg}</p>}
      {err && <p className="mb-3 text-red-400 text-sm">{err}</p>}

      <form onSubmit={submit} className="space-y-4 max-w-md">
        <div>
          <label className="label">Amount (Rs)</label>
          <input className="input" name="amount_rs" value={form.amount_rs} onChange={change} required />
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
          <input className="input" name="account_id" value={form.account_id} onChange={change} required />
        </div>

        <button className="btn">Request Withdraw</button>
      </form>

      <h2 className="text-lg font-semibold mt-8 mb-2">My Withdraw Requests</h2>
      <div className="space-y-2">
        {list.map((w) => (
          <div key={w.id} className="p-3 rounded-lg border border-white/10">
            <div className="flex justify-between">
              <b>Rs {w.amount_rs}</b>
              <span className="opacity-80">{w.status}</span>
            </div>
            <div className="text-xs opacity-70">{w.method} / {w.account_id}</div>
            <div className="text-xs opacity-50">{w.created_at}</div>
          </div>
        ))}
        {list.length === 0 && <p className="opacity-70 text-sm">No requests yet.</p>}
      </div>
    </div>
  );
}
