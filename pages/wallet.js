import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api, { getAccessToken } from "../lib/api";

export default function Wallet() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (!getAccessToken()) router.replace("/login");
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const load = async () => {
    setErr(null);
    try {
      const res = await api.get("/wallet/");
      setData(res.data);
    } catch (e) {
      setErr("Failed to load wallet.");
    }
  };

  return (
    <div className="card">
      <h1 className="text-2xl font-bold mb-4">Wallet</h1>
      {err && <p className="mb-3 text-red-400 text-sm">{err}</p>}

      {data ? (
        <>
          <p>
            Coins: <b>{data.coins_balance}</b>
          </p>
          <p>
            Approx Rs: <b>{data.approx_balance_rs}</b>
          </p>

          <h2 className="text-lg font-semibold mt-6 mb-2">Transactions</h2>
          <div className="space-y-2">
            {(data.transactions || []).map((t) => (
              <div key={t.id} className="p-3 rounded-lg border border-white/10">
                <div className="flex justify-between">
                  <b>{t.type}</b>
                  <span>{t.coins} coins</span>
                </div>
                <div className="text-xs opacity-70">{t.note}</div>
                <div className="text-xs opacity-50">{t.created_at}</div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
