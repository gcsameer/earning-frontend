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

export default function Wallet() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setErr(null);
    setLoading(true);
    try {
      const res = await api.get("/wallet/");
      setData(res.data);
    } catch (e) {
      setErr(e?.response?.data?.detail || "Failed to load wallet.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!getAccessToken()) {
      router.replace("/login");
      return;
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="card">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h1 className="text-2xl font-bold">Wallet</h1>
        <button className="btn" onClick={load} disabled={loading}>
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {err && <p className="mb-3 text-red-400 text-sm">{err}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : data ? (
        <>
          <div className="p-4 rounded-xl border border-white/10">
            <p className="text-lg">
              Coins: <b>{data.coins_balance}</b>
            </p>
            <p className="opacity-80">
              Approx Rs: <b>{data.approx_balance_rs}</b>{" "}
              <span className="text-xs opacity-60">
                (rate: {data.coin_to_rs_rate})
              </span>
            </p>
          </div>

          <h2 className="text-lg font-semibold mt-6 mb-2">Transactions</h2>

          {(data.transactions || []).length === 0 ? (
            <p className="opacity-70">No transactions yet.</p>
          ) : (
            <div className="space-y-2">
              {(data.transactions || []).map((t) => (
                <div key={t.id} className="p-3 rounded-lg border border-white/10">
                  <div className="flex justify-between items-center gap-3">
                    <b className="capitalize">{t.type}</b>
                    <span className={t.coins < 0 ? "text-red-400" : "text-emerald-400"}>
                      {t.coins} coins
                    </span>
                  </div>
                  {t.note && <div className="text-xs opacity-70 mt-1">{t.note}</div>}
                  <div className="text-xs opacity-50 mt-1">{formatDate(t.created_at)}</div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <p>No wallet data.</p>
      )}
    </div>
  );
}
