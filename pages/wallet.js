import { useEffect, useState } from "react";
import api, { getAccessToken } from "../lib/api";
import { useRouter } from "next/router";

export default function Wallet() {
  const router = useRouter();
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    if (!getAccessToken()) {
      router.replace("/login");
      return;
    }
    api
      .get("/wallet/")
      .then((res) => setWallet(res.data))
      .catch((err) => {
        console.error(err);
        router.replace("/login");
      });
  }, [router]);

  if (!wallet) return <p className="mt-10 text-center">Loading...</p>;

  return (
    <div className="mt-6">
      <div className="card mb-6">
        <h1 className="text-2xl font-bold mb-2">Wallet</h1>
        <p className="text-slate-300">
          Coins:{" "}
          <span className="font-bold text-emerald-400">
            {wallet.coins_balance}
          </span>
        </p>
        <p className="text-slate-300">
          Approx (Rs):{" "}
          <span className="font-bold">
            {wallet.approx_balance_rs.toFixed(2)}
          </span>
        </p>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-3">Recent Transactions</h2>
        {wallet.transactions.length === 0 && (
          <p className="text-slate-400 text-sm">No transactions yet.</p>
        )}
        <ul className="space-y-2">
          {wallet.transactions.map((tx) => (
            <li
              key={tx.id}
              className="flex justify-between text-sm border-b border-slate-800 pb-2 last:border-0"
            >
              <div>
                <p className="font-medium">{tx.type}</p>
                <p className="text-slate-400">{tx.note}</p>
              </div>
              <div className="text-right">
                <p className="font-mono">
                  {tx.coins > 0 ? "+" : ""}
                  {tx.coins} coins
                </p>
                <p className="text-slate-500 text-xs">
                  {new Date(tx.created_at).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
