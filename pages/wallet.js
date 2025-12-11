import { useEffect, useState } from "react";
import api from "../lib/api";

export default function WalletPage() {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/wallet/");
        setWallet(res.data);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  if (!wallet) return <div className="card mt-8">Loading wallet...</div>;

  return (
    <div className="card mt-8">
      <h1 className="text-2xl font-bold mb-4">Wallet</h1>

      <p className="mb-2">
        Coins:{" "}
        <span className="font-semibold text-emerald-400">
          {wallet.coins_balance}
        </span>
      </p>
      <p className="mb-4 text-slate-300">
        Approx balance: Rs {wallet.approx_balance_rs} (rate:{" "}
        {wallet.coin_to_rs_rate} per coin)
      </p>

      <h2 className="font-semibold mb-2">Recent transactions</h2>
      {wallet.transactions.length === 0 && (
        <p className="text-sm text-slate-400">No transactions yet.</p>
      )}

      <div className="space-y-2 max-h-80 overflow-y-auto mt-2">
        {wallet.transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex justify-between text-sm border-b border-slate-800 py-1"
          >
            <span>{tx.type}</span>
            <span>{tx.coins} coins</span>
            <span className="text-slate-400 text-xs">
              {new Date(tx.created_at).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
