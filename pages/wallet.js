import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api, { getAccessToken } from "../lib/api";
import SocialShare from "../components/SocialShare";

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
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="card fade-in">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 gradient-text">Wallet</h1>
            <p className="text-slate-400 text-sm">Your earnings and transactions</p>
          </div>
          <button className="btn" onClick={load} disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="spinner"></span>
                Loading...
              </span>
            ) : (
              "🔄 Refresh"
            )}
          </button>
        </div>

        {err && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-red-400 text-sm">{err}</p>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <span className="spinner mx-auto mb-4"></span>
              <p className="text-slate-400">Loading wallet...</p>
            </div>
          </div>
        ) : data ? (
          <>
            {/* Balance Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-300 mb-1">Total Coins</p>
                  <p className="text-4xl font-bold text-emerald-400">
                    {data.coins_balance.toLocaleString()}
                  </p>
                </div>
                <div className="text-5xl opacity-20">💰</div>
              </div>
              <div className="pt-4 border-t border-emerald-500/20">
                <p className="text-sm text-slate-300 mb-1">Approximate Value</p>
                <p className="text-2xl font-semibold text-white">
                  Rs {data.approx_balance_rs}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Rate: {data.coin_to_rs_rate} coins per Rs
                </p>
              </div>
              {data.coins_balance > 0 && (
                <div className="pt-4 border-t border-emerald-500/20 mt-4">
                  <p className="text-sm text-slate-300 mb-2">Share Your Earnings!</p>
                  <SocialShare type="earnings" coins={data.coins_balance} />
                </div>
              )}
            </div>

            {/* Transactions */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span>📋</span> Recent Transactions
              </h2>

              {(data.transactions || []).length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4 opacity-30">📭</div>
                  <p className="text-slate-400">No transactions yet</p>
                  <p className="text-sm text-slate-500 mt-2">Complete tasks to see your earnings here</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {(data.transactions || []).map((t) => (
                    <div 
                      key={t.id} 
                      className="p-4 rounded-xl border border-slate-800/50 bg-slate-800/30 hover:bg-slate-800/50 transition-colors card-hover"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">
                              {t.type === "earn" ? "➕" : t.type === "withdraw" ? "➖" : t.type === "referral" ? "👥" : "🎁"}
                            </span>
                            <b className="capitalize text-white">{t.type}</b>
                          </div>
                          {t.note && (
                            <p className="text-sm text-slate-400 ml-7">{t.note}</p>
                          )}
                          <p className="text-xs text-slate-500 ml-7 mt-1">{formatDate(t.created_at)}</p>
                        </div>
                        <div className={`text-lg font-bold ${t.coins < 0 ? "text-red-400" : "text-emerald-400"}`}>
                          {t.coins > 0 ? "+" : ""}{t.coins} coins
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400">No wallet data available</p>
          </div>
        )}
      </div>
    </div>
  );
}
